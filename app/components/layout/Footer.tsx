import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import type {
  Menu,
  MenuItem,
} from "@/app/lib/wordpress/graphql/menus";

import type {
  SiteSettings,
} from "@/app/lib/wordpress/graphql/sites";

interface FooterProps {
  settings: SiteSettings | null;
  primaryMenu: Menu | null;
  secondaryMenu: Menu | null;
  tertiaryMenu: Menu | null;
}

/* =========================================
   HELPERS
========================================= */

function cleanHtml(html?: string | null) {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "a",
      "ul",
      "ol",
      "li",
      "span",
    ],
    allowedAttributes: {
      a: [
        "href",
        "target",
        "rel",
      ],
      span: ["class"],
    },
  });
}

function getMenuHref(item: MenuItem) {
  return item.path || item.url || "#";
}

function MenuLink({
  item,
}: {
  item: MenuItem;
}) {
  const href = getMenuHref(item);

  const classes = `
    inline-block
    text-[13px]
    uppercase
    tracking-[0.06em]
    transition-opacity
    duration-200
    hover:opacity-60
  `;

  const customClasses =
    item.cssClasses
      ?.filter(Boolean)
      .join(" ") || "";

  if (
    href === "#" ||
    href.startsWith("http://") ||
    href.startsWith("https://")
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
        className={`${classes} ${customClasses}`}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${classes} ${customClasses}`}
    >
      {item.label}
    </Link>
  );
}

/* =========================================
   SOCIAL LINK
========================================= */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        border
        border-white/25
        text-white
        transition-all
        duration-300
        hover:border-[#000e35]
        hover:bg-[#000e35]
        hover:text-white
      "
    >
      {children}
    </a>
  );
}

/* =========================================
   FOOTER
========================================= */

export default function Footer({
  settings,
  primaryMenu,
  secondaryMenu,
  tertiaryMenu,
}: FooterProps) {
  const footer =
    settings?.footer;

  const contact =
    settings?.contact;

  const social =
    settings?.social;

  const footerLogo =
    footer?.footerLogo?.node ||
    settings?.branding
      ?.primaryLogo?.node;

  const brokerageLogo =
    footer?.brokerageLogo?.node;

  const hasSocial =
    social?.facebookUrl ||
    social?.instagramUrl ||
    social?.linkedinUrl ||
    social?.youtubeUrl ||
    social?.xTwitterUrl;

  return (
    <footer
      className="
        bg-[#303030]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
          px-6
          md:px-8
          lg:px-12
        "
      >
        {/* =====================================
            MAIN FOOTER
        ===================================== */}
        <div
          className="
            grid
            gap-12
            border-b
            border-white/25
            py-16
            md:grid-cols-2
            lg:grid-cols-[1.35fr_0.75fr_0.75fr_1fr]
            lg:gap-16
            lg:py-20
          "
        >
          {/* ==============================
              BRAND
          ============================== */}
          <div>
            {footerLogo?.sourceUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={
                  footerLogo.sourceUrl
                }
                alt={
                  footerLogo.altText ||
                  settings?.branding
                    ?.siteName ||
                  "Jennifer Espinosa"
                }
                className="
                  h-auto
                  max-h-[110px]
                  w-auto
                  max-w-[270px]
                  object-contain
                "
              />
            )}

            {footer
              ?.footerDescription && (
              <div
                className="
                  footer-rich-text
                  mt-9
                  max-w-[380px]
                  text-[15px]
                  leading-[1.85]
                  text-white/80
                "
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(
                    footer.footerDescription
                  ),
                }}
              />
            )}

            {/* SOCIAL MEDIA */}
            {hasSocial && (
              <div
                className="
                  mt-9
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                {social?.facebookUrl && (
                  <SocialLink
                    href={
                      social.facebookUrl
                    }
                    label="Facebook"
                  >
                    <FaFacebookF
                      size={15}
                    />
                  </SocialLink>
                )}

                {social?.instagramUrl && (
                  <SocialLink
                    href={
                      social.instagramUrl
                    }
                    label="Instagram"
                  >
                    <FaInstagram
                      size={17}
                    />
                  </SocialLink>
                )}

                {social?.linkedinUrl && (
                  <SocialLink
                    href={
                      social.linkedinUrl
                    }
                    label="LinkedIn"
                  >
                    <FaLinkedinIn
                      size={16}
                    />
                  </SocialLink>
                )}

                {social?.youtubeUrl && (
                  <SocialLink
                    href={
                      social.youtubeUrl
                    }
                    label="YouTube"
                  >
                    <FaYoutube
                      size={17}
                    />
                  </SocialLink>
                )}

                {social?.xTwitterUrl && (
                  <SocialLink
                    href={
                      social.xTwitterUrl
                    }
                    label="X / Twitter"
                  >
                    <FaXTwitter
                      size={15}
                    />
                  </SocialLink>
                )}
              </div>
            )}
          </div>

          {/* ==============================
              ABOUT MENU
          ============================== */}
          <div>
            <h3
              className="
                mb-8
                text-[20px]
                font-semibold
              "
            >
              About
            </h3>

            <ul className="space-y-3">
              {primaryMenu
                ?.menuItems.nodes
                .map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.cssClasses
                        ?.filter(
                          Boolean
                        )
                        .join(
                          " "
                        ) ||
                      undefined
                    }
                  >
                    <MenuLink
                      item={item}
                    />
                  </li>
                ))}
            </ul>
          </div>

          {/* ==============================
              LET'S WORK MENU
          ============================== */}
          <div>
            <h3
              className="
                mb-8
                text-[20px]
                font-semibold
              "
            >
              Let&apos;s Work
            </h3>

            <ul className="space-y-3">
              {secondaryMenu
                ?.menuItems.nodes
                .map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.cssClasses
                        ?.filter(
                          Boolean
                        )
                        .join(
                          " "
                        ) ||
                      undefined
                    }
                  >
                    <MenuLink
                      item={item}
                    />
                  </li>
                ))}
            </ul>
          </div>

          {/* ==============================
              CONTACT
          ============================== */}
          <div>
            <h3
              className="
                mb-8
                text-[20px]
                font-semibold
              "
            >
              Contact
            </h3>

            <div
              className="
                space-y-6
                text-[14px]
                leading-[1.8]
                text-white/90
              "
            >
              {/* ADDRESS */}
              {contact?.address && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <MapPin
                    size={18}
                    strokeWidth={
                      1.7
                    }
                    className="
                      mt-[3px]
                      shrink-0
                      text-white/80
                    "
                  />

                  <div>
                    <p
                      className="
                        mb-1
                        text-[11px]
                        uppercase
                        tracking-[0.1em]
                        text-white/50
                      "
                    >
                      Address
                    </p>

                    {contact.googleMapsUrl ? (
                      <a
                        href={
                          contact.googleMapsUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          transition-opacity
                          hover:opacity-60
                        "
                      >
                        {
                          contact.address
                        }
                      </a>
                    ) : (
                      <p>
                        {
                          contact.address
                        }
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* PHONE */}
              {contact
                ?.phoneNumber && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <Phone
                    size={18}
                    strokeWidth={
                      1.7
                    }
                    className="
                      mt-[3px]
                      shrink-0
                      text-white/80
                    "
                  />

                  <div>
                    <p
                      className="
                        mb-1
                        text-[11px]
                        uppercase
                        tracking-[0.1em]
                        text-white/50
                      "
                    >
                      Phone
                    </p>

                    <a
                      href={`tel:${contact.phoneNumber.replace(
                        /[^\d+]/g,
                        ""
                      )}`}
                      className="
                        transition-opacity
                        hover:opacity-60
                      "
                    >
                      {
                        contact.phoneNumber
                      }
                    </a>
                  </div>
                </div>
              )}

              {/* EMAIL */}
              {contact
                ?.emailAddress && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <Mail
                    size={18}
                    strokeWidth={
                      1.7
                    }
                    className="
                      mt-[3px]
                      shrink-0
                      text-white/80
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        mb-1
                        text-[11px]
                        uppercase
                        tracking-[0.1em]
                        text-white/50
                      "
                    >
                      Email
                    </p>

                    <a
                      href={`mailto:${contact.emailAddress}`}
                      className="
                        break-all
                        transition-opacity
                        hover:opacity-60
                      "
                    >
                      {
                        contact.emailAddress
                      }
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================
            BROKERAGE + MLS DISCLAIMERS
        ===================================== */}
        {(
          brokerageLogo?.sourceUrl ||
          footer
            ?.brokerageDescription ||
          footer?.disclaimers
            ?.length
        ) && (
          <div
            className="
              grid
              gap-12
              border-b
              border-white/25
              py-12
              lg:grid-cols-[0.85fr_1.5fr]
              lg:gap-20
            "
          >
            {/* ==============================
                BROKERAGE
            ============================== */}
            <div>
              {brokerageLogo
                ?.sourceUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={
                    brokerageLogo.sourceUrl
                  }
                  alt={
                    brokerageLogo.altText ||
                    "RE/MAX Brokerage"
                  }
                  className="
                    h-auto
                    max-h-[110px]
                    w-auto
                    max-w-[230px]
                    object-contain
                  "
                />
              )}

              {footer
                ?.brokerageDescription && (
                <div
                  className="
                    footer-rich-text
                    mt-8
                    max-w-[460px]
                    text-[13px]
                    leading-[1.8]
                    text-white/75
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      cleanHtml(
                        footer.brokerageDescription
                      ),
                  }}
                />
              )}
            </div>

            {/* ==============================
                MLS DISCLAIMERS
            ============================== */}
            {footer
              ?.disclaimers
              ?.length ? (
              <div
                className="
                  lg:border-l
                  lg:border-white/20
                  lg:pl-14
                "
              >
                {footer.disclaimers.map(
                  (
                    item,
                    index
                  ) => {
                    const logo =
                      item.logo
                        ?.node;

                    return (
                      <div
                        key={`${
                          item.title ||
                          "disclaimer"
                        }-${index}`}
                        className={`
                          grid
                          gap-5
                          md:grid-cols-[130px_1fr]
                          md:items-start
                          md:gap-8

                          ${
                            index !==
                            0
                              ? `
                                mt-8
                                border-t
                                border-white/20
                                pt-8
                              `
                              : ""
                          }
                        `}
                      >
                        {/* LOGO */}
                        <div>
                          {logo
                            ?.sourceUrl && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={
                                logo.sourceUrl
                              }
                              alt={
                                logo.altText ||
                                item.title ||
                                ""
                              }
                              className="
                                h-auto
                                max-h-[80px]
                                w-auto
                                max-w-[125px]
                                object-contain
                              "
                            />
                          )}
                        </div>

                        {/* TEXT */}
                        <div>
                          {item.title && (
                            <h4
                              className="
                                mb-3
                                text-[13px]
                                font-semibold
                                uppercase
                                tracking-[0.05em]
                                text-white
                              "
                            >
                              {
                                item.title
                              }
                            </h4>
                          )}

                          {item.disclaimerText && (
                            <div
                              className="
                                footer-rich-text
                                max-w-[900px]
                                text-[11px]
                                leading-[1.8]
                                text-white/55
                              "
                              dangerouslySetInnerHTML={{
                                __html:
                                  cleanHtml(
                                    item.disclaimerText
                                  ),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* =====================================
            BOTTOM
        ===================================== */}
        <div
          className="
            flex
            flex-col
            gap-7
            py-9
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <ul
            className="
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-3
            "
          >
            {tertiaryMenu
              ?.menuItems.nodes
              .map((item) => (
                <li
                  key={item.id}
                  className={
                    item.cssClasses
                      ?.filter(
                        Boolean
                      )
                      .join(
                        " "
                      ) ||
                    undefined
                  }
                >
                  <MenuLink
                    item={item}
                  />
                </li>
              ))}
          </ul>

          {footer
            ?.copyrightText && (
            <p
              className="
                text-[13px]
                leading-[1.6]
                text-white/85
              "
            >
              {
                footer.copyrightText
              }
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}