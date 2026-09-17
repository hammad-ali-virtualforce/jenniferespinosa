import type {
  LucideIcon,
} from "lucide-react";

import {
  Home,
  House,
  KeyRound,
  MapPin,
  Search,
  BadgeDollarSign,
  DollarSign,
  TrendingUp,
  BarChart3,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  Star,
  Heart,
  Users,
  UserCheck,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  Camera,
  Megaphone,
  Building2,
  Landmark,
  Sparkles,
  Target,
  Award,
  Compass,
  Map,
  Eye,
  Lightbulb,
  MessageCircle,
  Phone,
  Mail,
  CircleCheck,
  Scale,
  Briefcase,
} from "lucide-react";

import type {
  SeamlessExperienceSectionData,
} from "@/app/lib/wordpress/graphql/pages";

/* =========================================
   PROPS
========================================= */

interface SeamlessExperienceSectionProps {
  data: SeamlessExperienceSectionData;
}

/* =========================================
   ICON MAP
========================================= */

const iconMap: Record<
  string,
  LucideIcon
> = {
  Home,
  House,
  KeyRound,
  MapPin,
  Search,
  BadgeDollarSign,
  DollarSign,
  TrendingUp,
  BarChart3,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  Star,
  Heart,
  Users,
  UserCheck,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  Camera,
  Megaphone,
  Building2,
  Landmark,
  Sparkles,
  Target,
  Award,
  Compass,
  Map,
  Eye,
  Lightbulb,
  MessageCircle,
  Phone,
  Mail,
  CircleCheck,
  Scale,
  Briefcase,
};

/* =========================================
   COMPONENT
========================================= */

export default function SeamlessExperienceSection({
  data,
}: SeamlessExperienceSectionProps) {
  const backgroundImage =
    data.backgroundImage?.node;

  const items =
    data.items ?? [];

  /*
   * Dynamic colors controlled by ACF.
   */
  const backgroundColor =
    data.backgroundColor ||
    "#101619";

  const textColor =
    data.textColor ||
    "#ffffff";

  /*
   * ACF gives us 0 - 100.
   * CSS rgba needs 0 - 1.
   */
  const rawOverlayOpacity =
    Number(
      data.overlayOpacity ?? 40
    );

  const overlayOpacity =
    Number.isFinite(
      rawOverlayOpacity
    )
      ? Math.min(
          100,
          Math.max(
            0,
            rawOverlayOpacity
          )
        ) / 100
      : 0.4;

  /*
   * Responsive desktop columns.
   */
  const gridColumns =
    items.length === 1
      ? "lg:grid-cols-1"
      : items.length === 2
        ? "lg:grid-cols-2"
        : items.length === 3
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";

  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        py-16

        md:px-8
        md:py-20

        lg:px-12
        lg:py-[120px]
      "
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* =====================================
          BACKGROUND IMAGE
      ===================================== */}

      {backgroundImage?.sourceUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              backgroundImage.sourceUrl
            }
            alt={
              backgroundImage.altText ||
              data.heading ||
              ""
            }
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
            "
            style={{
              backgroundColor:
                `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
        </>
      )}

      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
        "
      >
        {/* ===================================
            SECTION INTRO
        =================================== */}

        <div
          className="
            mx-auto
            mb-14
            max-w-[900px]
            text-center

            lg:mb-[75px]
          "
        >
          {data.eyebrow && (
            <p
              className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                opacity-75

                md:text-[11px]
              "
            >
              {data.eyebrow}
            </p>
          )}

          {data.heading && (
            <h2
              className="
                font-heading
                text-[clamp(54px,6vw,90px)]
                font-normal
                leading-[0.88]
              "
            >
              {data.heading}
            </h2>
          )}

          {data.description && (
            <div
              className="
                mx-auto
                mt-6
                max-w-[720px]
                text-[14px]
                leading-[1.9]
                opacity-80

                md:text-[15px]
              "
              dangerouslySetInnerHTML={{
                __html:
                  data.description,
              }}
            />
          )}
        </div>

        {/* ===================================
            ITEMS
        =================================== */}

        {items.length > 0 && (
          <div
            className={`
              grid
              grid-cols-1
              gap-y-12

              md:grid-cols-2
              md:gap-x-10
              md:gap-y-14

              ${gridColumns}
            `}
          >
            {items.map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon
                    ? iconMap[
                        item.icon
                      ]
                    : null;

                return (
                  <div
                    key={
                      `${item.title}-${index}`
                    }
                    className="
                      group
                      relative
                      text-center
                    "
                  >
                    {/* ICON */}
                    {Icon && (
                      <div
                        className="
                          mx-auto
                          mb-7
                          flex
                          h-[78px]
                          w-[78px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-current/40
                          transition-all
                          duration-300

                          group-hover:scale-105
                        "
                      >
                        <Icon
                          size={32}
                          strokeWidth={
                            1.4
                          }
                        />
                      </div>
                    )}

                    {/* TITLE */}
                    {item.title && (
                      <h3
                        className="
                          mb-4
                          text-[16px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]

                          md:text-[17px]
                        "
                      >
                        {item.title}
                      </h3>
                    )}

                    {/* DESCRIPTION */}
                    {item.description && (
                      <p
                        className="
                          mx-auto
                          max-w-[330px]
                          text-[13px]
                          leading-[1.85]
                          opacity-75

                          md:text-[14px]
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
}