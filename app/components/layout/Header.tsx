"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import type {
  Menu,
  MenuItem,
} from "@/app/lib/wordpress/graphql/menus";

import type {
  SiteSettings,
} from "@/app/lib/wordpress/graphql/sites";

/* =========================================
   TYPES
========================================= */

interface HeaderProps {
  settings: SiteSettings | null;
  primaryMenu: Menu | null;
  secondaryMenu: Menu | null;
}

interface MenuItemWithChildren extends MenuItem {
  children: MenuItemWithChildren[];
}

/* =========================================
   BUILD WORDPRESS MENU TREE
========================================= */

function buildMenuTree(
  items: MenuItem[]
): MenuItemWithChildren[] {
  const itemMap = new Map<
    string,
    MenuItemWithChildren
  >();

  const roots: MenuItemWithChildren[] = [];

  /*
   * First create every item.
   */
  items.forEach((item) => {
    itemMap.set(item.id, {
      ...item,
      children: [],
    });
  });

  /*
   * Then attach child items
   * to their parent.
   */
  itemMap.forEach((item) => {
    if (
      item.parentId &&
      itemMap.has(item.parentId)
    ) {
      itemMap
        .get(item.parentId)!
        .children.push(item);
    } else {
      roots.push(item);
    }
  });

  /*
   * Preserve WordPress menu order.
   */
  function sortMenu(
    menuItems: MenuItemWithChildren[]
  ) {
    menuItems.sort(
      (a, b) =>
        (a.order ?? 0) -
        (b.order ?? 0)
    );

    menuItems.forEach((item) => {
      if (item.children.length) {
        sortMenu(item.children);
      }
    });
  }

  sortMenu(roots);

  return roots;
}

/* =========================================
   MENU URL
========================================= */

function getMenuHref(
  item: MenuItem
) {
  return (
    item.path ||
    item.url ||
    "#"
  );
}

function isExternalUrl(
  href: string
) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

/* =========================================
   DESKTOP MENU LINK
========================================= */

function DesktopLink({
  item,
  children,
  className,
}: {
  item: MenuItem;
  children: React.ReactNode;
  className: string;
}) {
  const href =
    getMenuHref(item);

  if (
    href === "#" ||
    isExternalUrl(href)
  ) {
    return (
      <a
        href={href}
        target={
          item.target ||
          undefined
        }
        rel={
          item.target === "_blank"
            ? "noopener noreferrer"
            : undefined
        }
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={
        item.target ||
        undefined
      }
      className={className}
    >
      {children}
    </Link>
  );
}

/* =========================================
   DESKTOP MENU ITEM
========================================= */

function DesktopMenuItem({
  item,
  depth = 0,
}: {
  item: MenuItemWithChildren;
  depth?: number;
}) {
  const hasChildren =
    item.children.length > 0;

  const customClasses =
    item.cssClasses
      ?.filter(Boolean)
      .join(" ") || "";

  const isRoot =
    depth === 0;

  return (
    <li
      className={`
        group/menu
        relative
        ${customClasses}
      `}
    >
      <DesktopLink
        item={item}
        className={`
          flex
          items-center
          whitespace-nowrap
          transition-opacity
          duration-200
          hover:opacity-70

          ${
            isRoot
              ? `
                py-8
                text-[15px]
                font-normal
                uppercase
                tracking-[0.03em]
              `
              : `
                px-5
                py-3
                text-[12px]
                font-normal
                uppercase
                tracking-[0.05em]
                text-white/85
                hover:bg-white/5
                hover:text-white
              `
          }
        `}
      >
        <span>
          {item.label}
        </span>

        {hasChildren && (
          <>
            {isRoot ? (
              <ChevronDown
                size={13}
                strokeWidth={1.7}
                className="
                  ml-1.5
                  transition-transform
                  duration-300
                  group-hover/menu:rotate-180
                "
              />
            ) : (
              <ChevronRight
                size={13}
                strokeWidth={1.7}
                className="ml-auto"
              />
            )}
          </>
        )}
      </DesktopLink>

      {/* SUB MENU */}
      {hasChildren && (
        <ul
          className={`
            invisible
            absolute
            z-[1100]
            min-w-[240px]
            bg-[#303030]
            py-3
            text-white
            opacity-0
            shadow-[0_15px_40px_rgba(0,0,0,0.25)]
            transition-all
            duration-250

            group-hover/menu:visible
            group-hover/menu:opacity-100
            group-focus-within/menu:visible
            group-focus-within/menu:opacity-100

            ${
              isRoot
                ? `
                  left-0
                  top-full
                  translate-y-2

                  group-hover/menu:translate-y-0
                  group-focus-within/menu:translate-y-0
                `
                : `
                  left-full
                  top-[-12px]
                  translate-x-2

                  group-hover/menu:translate-x-0
                  group-focus-within/menu:translate-x-0
                `
            }
          `}
        >
          {item.children.map(
            (child) => (
              <DesktopMenuItem
                key={child.id}
                item={child}
                depth={depth + 1}
              />
            )
          )}
        </ul>
      )}
    </li>
  );
}

/* =========================================
   MOBILE MENU ITEM
========================================= */

function MobileMenuItem({
  item,
  expandedItems,
  toggleSubmenu,
  closeMenu,
  depth = 0,
}: {
  item: MenuItemWithChildren;
  expandedItems: Record<
    string,
    boolean
  >;
  toggleSubmenu: (
    id: string
  ) => void;
  closeMenu: () => void;
  depth?: number;
}) {
  const hasChildren =
    item.children.length > 0;

  const expanded =
    Boolean(
      expandedItems[item.id]
    );

  const href =
    getMenuHref(item);

  const customClasses =
    item.cssClasses
      ?.filter(Boolean)
      .join(" ") || "";

  const linkClasses =
    depth === 0
      ? `
        block
        flex-1
        text-[27px]
        font-medium
        leading-tight
        text-[#000E3C]
      `
      : `
        block
        flex-1
        text-[15px]
        font-medium
        uppercase
        tracking-[0.05em]
        text-[#000E3C]/80
      `;

  return (
    <li
      className={customClasses}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {href === "#" ? (
          <button
            type="button"
            onClick={() => {
              if (
                hasChildren
              ) {
                toggleSubmenu(
                  item.id
                );
              }
            }}
            className={`
              text-left
              ${linkClasses}
            `}
          >
            {item.label}
          </button>
        ) : isExternalUrl(
            href
          ) ? (
          <a
            href={href}
            target={
              item.target ||
              undefined
            }
            rel={
              item.target ===
              "_blank"
                ? "noopener noreferrer"
                : undefined
            }
            onClick={closeMenu}
            className={
              linkClasses
            }
          >
            {item.label}
          </a>
        ) : (
          <Link
            href={href}
            target={
              item.target ||
              undefined
            }
            onClick={closeMenu}
            className={
              linkClasses
            }
          >
            {item.label}
          </Link>
        )}

        {hasChildren && (
          <button
            type="button"
            aria-label={`Toggle ${item.label} submenu`}
            aria-expanded={
              expanded
            }
            onClick={() =>
              toggleSubmenu(
                item.id
              )
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
            "
          >
            <ChevronDown
              size={
                depth === 0
                  ? 21
                  : 17
              }
              strokeWidth={1.5}
              className={`
                transition-transform
                duration-300

                ${
                  expanded
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
        )}
      </div>

      {/* MOBILE CHILDREN */}
      {hasChildren && (
        <div
          className={`
            grid
            transition-all
            duration-300
            ease-in-out

            ${
              expanded
                ? `
                  grid-rows-[1fr]
                  opacity-100
                `
                : `
                  grid-rows-[0fr]
                  opacity-0
                `
            }
          `}
        >
          <div className="overflow-hidden">
            <ul
              className={`
                space-y-4
                border-l
                border-[#000E3C]/20

                ${
                  depth === 0
                    ? `
                      ml-2
                      mt-5
                      pl-5
                    `
                    : `
                      ml-3
                      mt-4
                      pl-4
                    `
                }
              `}
            >
              {item.children.map(
                (child) => (
                  <MobileMenuItem
                    key={child.id}
                    item={child}
                    expandedItems={
                      expandedItems
                    }
                    toggleSubmenu={
                      toggleSubmenu
                    }
                    closeMenu={
                      closeMenu
                    }
                    depth={
                      depth + 1
                    }
                  />
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

/* =========================================
   HEADER
========================================= */

export default function Header({
  settings,
  primaryMenu,
  secondaryMenu,
}: HeaderProps) {
  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    expandedItems,
    setExpandedItems,
  ] = useState<
    Record<string, boolean>
  >({});

  const logo =
    settings?.branding
      ?.primaryLogo?.node;

  /*
   * Convert flat WordPress menus
   * into proper menu trees.
   */
  const primaryItems =
    buildMenuTree(
      primaryMenu?.menuItems
        .nodes ?? []
    );

  const secondaryItems =
    buildMenuTree(
      secondaryMenu
        ?.menuItems.nodes ?? []
    );

  /* =====================================
     SCROLL HEADER
  ===================================== */

  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY > 40
        );
      };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =====================================
     DISABLE BODY SCROLL ON MOBILE MENU
  ===================================== */

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileMenuOpen]);

  /* =====================================
     MOBILE HELPERS
  ===================================== */

  function toggleSubmenu(
    id: string
  ) {
    setExpandedItems(
      (current) => ({
        ...current,
        [id]:
          !current[id],
      })
    );
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setExpandedItems({});
  }

  return (
    <>
      {/* =====================================
          HEADER
      ===================================== */}

      <header
        className={`
          fixed
          left-0
          top-0
          z-[1000]
          w-full
          pt-4
          transition-all
          duration-300

          ${
            scrolled
              ? `
                bg-[#303030]
                text-white
                shadow-[0_1px_0_rgba(0,0,0,0.08)]
              `
              : `
                bg-transparent
                text-white
              `
          }
        `}
      >
        <div
          className={`
            mx-auto
            flex
            h-[95px]
            w-full
            max-w-[1600px]
            items-center
            px-6
            pb-4

            md:px-8
            lg:px-10
            xl:px-12

            ${
              settings?.header
                ?.showHeaderBorder &&
              !scrolled
                ? "border-b border-white"
                : ""
            }
          `}
        >
          {/* =================================
              LOGO
          ================================= */}

          <div className="shrink-0">
            <Link
              href="/"
              aria-label="Jennifer Espinosa Home"
            >
              {logo?.sourceUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={
                    logo.sourceUrl
                  }
                  alt={
                    logo.altText ||
                    settings
                      ?.branding
                      ?.siteName ||
                    "Jennifer Espinosa"
                  }
                  className="
                    h-auto
                    max-h-[94px]
                    w-auto
                    max-w-[210px]
                    object-contain
                  "
                />
              )}
            </Link>
          </div>

          {/* =================================
              DESKTOP PRIMARY MENU
          ================================= */}

          <nav
            className="
              ml-auto
              hidden
              lg:block
            "
          >
            <ul
              className="
                flex
                items-center
                gap-5
                xl:gap-7
              "
            >
              {primaryItems.map(
                (item) => (
                  <DesktopMenuItem
                    key={item.id}
                    item={item}
                  />
                )
              )}
            </ul>
          </nav>

          {/* =================================
              DESKTOP SECONDARY MENU
          ================================= */}

          <nav
            className="
              ml-8
              hidden
              border-l
              border-current/30
              pl-8

              lg:block

              xl:ml-10
              xl:pl-10
            "
          >
            <ul
              className="
                flex
                items-center
                gap-5
                xl:gap-7
              "
            >
              {secondaryItems.map(
                (item) => (
                  <DesktopMenuItem
                    key={item.id}
                    item={item}
                  />
                )
              )}
            </ul>
          </nav>

          {/* =================================
              MOBILE HAMBURGER
          ================================= */}

          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={
              mobileMenuOpen
            }
            onClick={() =>
              setMobileMenuOpen(
                (current) =>
                  !current
              )
            }
            className="
              ml-auto
              flex
              h-10
              w-10
              items-center
              justify-center
              lg:hidden
            "
          >
            <span
              className="
                relative
                block
                h-[18px]
                w-[25px]
              "
            >
              <span
                className={`
                  absolute
                  left-0
                  top-[3px]
                  h-px
                  w-full
                  bg-current
                  transition-all
                  duration-300

                  ${
                    mobileMenuOpen
                      ? `
                        translate-y-[6px]
                        rotate-45
                      `
                      : ""
                  }
                `}
              />

              <span
                className={`
                  absolute
                  left-0
                  top-[9px]
                  h-px
                  w-full
                  bg-current
                  transition-all
                  duration-300

                  ${
                    mobileMenuOpen
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  left-0
                  top-[15px]
                  h-px
                  w-full
                  bg-current
                  transition-all
                  duration-300

                  ${
                    mobileMenuOpen
                      ? `
                        -translate-y-[6px]
                        -rotate-45
                      `
                      : ""
                  }
                `}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[999]
          overflow-y-auto
          bg-[#F8F5EF]
          px-6
          pb-12
          pt-[135px]
          text-[#000E3C]
          transition-all
          duration-500

          lg:hidden

          ${
            mobileMenuOpen
              ? `
                visible
                opacity-100
              `
              : `
                invisible
                opacity-0
              `
          }
        `}
      >
        {/* PRIMARY MOBILE MENU */}
        <nav>
          <ul className="space-y-6">
            {primaryItems.map(
              (item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  expandedItems={
                    expandedItems
                  }
                  toggleSubmenu={
                    toggleSubmenu
                  }
                  closeMenu={
                    closeMobileMenu
                  }
                />
              )
            )}
          </ul>
        </nav>

        {/* SECONDARY MOBILE MENU */}
        <nav
          className="
            mt-10
            border-t
            border-[#000E3C]/20
            pt-8
          "
        >
          <ul className="space-y-5">
            {secondaryItems.map(
              (item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  expandedItems={
                    expandedItems
                  }
                  toggleSubmenu={
                    toggleSubmenu
                  }
                  closeMenu={
                    closeMobileMenu
                  }
                />
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}