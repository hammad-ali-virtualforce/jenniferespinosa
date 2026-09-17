import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import type { Area } from "@/app/lib/wordpress/graphql/areas";

interface AreaCardProps {
  area: Area;
  featured?: boolean;
}

function getShortDescription(
  html: string | null,
  limit = 190
) {
  if (!html) return "";

  const text = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trim()}...`;
}

export default function AreaCard({
  area,
  featured = false,
}: AreaCardProps) {
  const image = area.featuredImage?.node;
  const description = getShortDescription(area.content);

  /*
   * FEATURED AREAS VERSION
   * Used on homepage
   */
  if (featured) {
    return (
      <Link
        href={`/area/${area.slug}/`}
        className="
          group
          relative
          block
          aspect-[1.35/1]
          overflow-hidden
          border-[4px]
          border-white
          bg-[#222]
        "
      >
        {image?.sourceUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.sourceUrl}
            alt={image.altText || area.title}
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.06]
            "
          />
        )}

        {/* DARK OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/35
            transition-colors
            duration-500
            group-hover:bg-black/60
          "
        />

        {/* CONTENT */}
        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-7
            text-center
            text-white
          "
        >
          <div
            className="
              w-full
              max-w-[340px]
              transition-transform
              duration-500
              ease-out
              group-hover:-translate-y-1
            "
          >
            <h3
              className="
                text-[20px]
                font-medium
                leading-[1.2]
                tracking-[-0.01em]
                text-white
                transition-transform
                duration-500
                md:text-[22px]
                lg:text-[24px]
                group-hover:-translate-y-3
              "
            >
              {area.title}
            </h3>

            {description && (
              <div
                className="
                  max-h-0
                  translate-y-4
                  overflow-hidden
                  opacity-0
                  transition-all
                  duration-500
                  ease-out
                  group-hover:max-h-[180px]
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                <p
                  className="
                    mt-4
                    text-[13px]
                    font-medium
                    leading-[1.65]
                    text-white
                    md:text-[14px]
                  "
                >
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  /*
   * NORMAL AREA CARD
   * Can be used on Area detail pages
   */
  return (
    <Link
      href={`/area/${area.slug}/`}
      className="group block overflow-hidden bg-white"
    >
      <div className="relative aspect-[1.2/1] overflow-hidden">
        {image?.sourceUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.sourceUrl}
            alt={image.altText || area.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.06]
            "
          />
        )}

        <div className="absolute inset-0 bg-black/30" />

        <h3
          className="
            absolute
            bottom-6
            left-6
            right-6
            text-[21px]
            font-medium
            text-white
          "
        >
          {area.title}
        </h3>
      </div>

      {description && (
        <div className="py-5">
          <p className="text-[14px] leading-[1.7] text-[#555]">
            {description}
          </p>
        </div>
      )}
    </Link>
  );
}