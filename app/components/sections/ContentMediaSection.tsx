import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import type {
  ContentMediaSectionData,
} from "@/app/lib/wordpress/graphql/pages";
import CountUpStat from "@/app/components/common/CountUpStat";


interface ContentMediaSectionProps {
  data: ContentMediaSectionData;
  wordpressUrl: string;
}

function resolveHref(
  href: string | null,
  wordpressUrl: string
) {
  if (!href) {
    return null;
  }

  if (
    href.startsWith("/") ||
    href.startsWith("#")
  ) {
    return href;
  }

  try {
    const url = new URL(href);

    if (wordpressUrl) {
      const wpUrl = new URL(wordpressUrl);

      if (url.origin === wpUrl.origin) {
        return `${url.pathname}${url.search}${url.hash}`;
      }
    }

    return href;
  } catch {
    return href;
  }
}

function cleanHtml(html?: string | null) {
  if (!html) {
    return "";
  }

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
    ],

    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
  });
}

export default function ContentMediaSection({
  data,
  wordpressUrl,
}: ContentMediaSectionProps) {
  const image = data.image?.node;

  const imageRight =
    data.imagePosition === "right";

  const stats =
    data.stats?.filter(
      (item) =>
        item &&
        (item.value?.trim() ||
          item.label?.trim())
    ) ?? [];

  const buttonHref =
    resolveHref(
      data.buttonUrl,
      wordpressUrl
    );

  const description =
    cleanHtml(data.description);

  return (
    <section
      className="
        bg-white
        px-6
        py-16
        text-[#171717]
        md:px-8
        lg:px-12
        lg:py-[90px]
      "
      style={{
    backgroundColor: data.backgroundColor || "#ffffff",
  }}
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1600px]
          items-center
          gap-12
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-[85px]
        "
      >
        {/* ==========================
            IMAGE
        ========================== */}
        {image?.sourceUrl && (
          <div
            className={`
              relative
              overflow-hidden
              ${
                imageRight
                  ? "lg:order-2"
                  : "lg:order-1"
              }
            `}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.sourceUrl}
              alt={image.altText || ""}
              loading="lazy"
              decoding="async"
              className="
                aspect-[0.9/1]
                h-full
                w-full
                object-cover
              "
            />
          </div>
        )}

        {/* ==========================
            CONTENT
        ========================== */}
        <div
          className={`
            ${
              imageRight
                ? "lg:order-1"
                : "lg:order-2"
            }
          `}
        >
          {/* HEADING */}
          {data.heading && (
            <h2
              className="
                font-heading
                text-[clamp(58px,6vw,92px)]
                font-normal
                leading-[0.9]
                text-[#292929]
              "
            >
              {data.heading}
            </h2>
          )}

          {/* DESCRIPTION */}
          {description && (
            <div
              className="
                content-media-description
                mt-8
                max-w-[700px]
                text-[15px]
                font-medium
                leading-[1.75]
                text-[#252525]
                lg:text-[16px]
              "
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}

          {/* ==========================
              STATS
          ========================== */}
          {stats.length > 0 && (
            <div
              className="
                mt-7
                grid
                grid-cols-1
                border-y
                border-[#d1d1d1]
                sm:grid-cols-3
                sm:border-y-0
              "
            >
              {stats.map(
                (stat, index) => (
                  <div
                    key={index}
                    className={`
                      relative
                      px-0
                      py-6
                      sm:px-7
                      sm:py-8
                      lg:px-8

                      ${
                        index > 0
                          ? `
                            border-t
                            border-[#d1d1d1]

                            sm:border-l
                            sm:border-t-0
                          `
                          : ""
                      }
                    `}
                  >
                    {/* RED DOT */}
                    {index > 0 && (
                      <span
                        className="
                          absolute
                          hidden
                          h-[10px]
                          w-[10px]
                          -translate-x-1/2
                          rounded-full
                          bg-[#000e35]
                          sm:left-0
                          sm:top-1/2
                          sm:block
                          sm:-translate-y-1/2
                        "
                      />
                    )}

                    {stat.value && (
                      <div
                        className="
                          text-[38px]
                          font-semibold
                          leading-none
                          tracking-[-0.03em]
                          text-black
                          lg:text-[42px]
                        "
                      >
                        <CountUpStat
      value={stat.value}
      duration={1600}
      delay={index * 120}
    />
                      </div>
                    )}

                    {stat.label && (
                      <div
                        className="
                          mt-4
                          text-[14px]
                          font-medium
                          leading-[1.4]
                          text-[#171717]
                        "
                      >
                        {stat.label}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {/* ==========================
              BUTTON
          ========================== */}
          {data.buttonText &&
            buttonHref && (
              <div className="mt-7">
                {buttonHref.startsWith(
                  "/"
                ) ||
                buttonHref.startsWith(
                  "#"
                ) ? (
                  <Link
                    href={buttonHref}
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      bg-[#000e35]
                      px-9
                      py-3
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.07em]
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#fff]
                      hover:text-[#000e35]
                      hover:border-[#000e35]
                      border
                    "
                  >
                    {data.buttonText}
                  </Link>
                ) : (
                  <a
                    href={buttonHref}
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      bg-[#000e35]
                      px-9
                      py-3
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.07em]
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#a92d30]
                    "
                  >
                    {data.buttonText}
                  </a>
                )}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}