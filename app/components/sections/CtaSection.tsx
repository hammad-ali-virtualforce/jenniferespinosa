import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import type {
  CtaSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface CtaSectionProps {
  data: CtaSectionData;
  wordpressUrl: string;
}

function resolveHref(
  href: string | null,
  wordpressUrl: string
) {
  if (!href) return null;

  if (
    href.startsWith("/") ||
    href.startsWith("#")
  ) {
    return href;
  }

  try {
    const url = new URL(href);

    if (wordpressUrl) {
      const wp = new URL(wordpressUrl);

      if (url.origin === wp.origin) {
        return `${url.pathname}${url.search}${url.hash}`;
      }
    }

    return href;
  } catch {
    return href;
  }
}

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
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
  });
}

export default function CtaSection({
  data,
  wordpressUrl,
}: CtaSectionProps) {
  const image = data.image?.node;

  const href = resolveHref(
    data.buttonLink,
    wordpressUrl
  );

  const description = cleanHtml(
    data.description
  );

  const style = data.layoutStyle || "card";
  const imageRight =
    data.imagePosition !== "left";

  /*
   * CARD
   * Screenshot-style centered CTA.
   */
  const isCard = style === "card";

  /*
   * FULL WIDTH
   * Wider CTA for other pages.
   */
  const isFullWidth = style === "fullWidth";

  return (
    <section
      className={`
        px-6
        py-16
        md:px-8
        lg:px-12
        ${
          isFullWidth
            ? "lg:py-20"
            : "lg:py-16"
        }
      `}
      style={{
        backgroundColor:
          data.sectionBackground || "#ffffff",
      }}
    >
      <div
         className={`
            mx-auto

            ${
            isCard
                ? "max-w-[850px]"
                : isFullWidth
                ? "max-w-[1500px]"
                : "max-w-[1000px]"
            }

            ${
            isCard && data.cardShadow
                ? "shadow-[0_10px_35px_rgba(0,0,0,0.10)]"
                : ""
            }
        `}
        style={{
            backgroundColor:
            data.cardBackground || "#ffffff",
        }}
      >
        <div
          className={`
            grid
            items-center
            gap-8

            ${
              image?.sourceUrl
                ? "md:grid-cols-[1.5fr_0.7fr]"
                : "grid-cols-1"
            }

            ${
              isCard
                ? "px-7 py-8 md:px-12 md:py-10"
                : "px-0 py-8"
            }
          `}
        >
          {/* CONTENT */}
          <div
            className={
              imageRight
                ? "md:order-1"
                : "md:order-2"
            }
          >
            {data.eyebrow && (
              <p
                className="
                  mb-2
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-[#000e35]
                "
              >
                {data.eyebrow}
              </p>
            )}

            {data.heading && (
              <h2
                className="
                  font-heading
                  text-[clamp(48px,5vw,72px)]
                  font-normal
                  leading-[0.95]
                  text-[#303030]
                "
              >
                {data.heading}
              </h2>
            )}

            {description && (
              <div
                className="
                  cta-description
                  mt-6
                  max-w-[600px]
                  text-[15px]
                  leading-[1.65]
                  text-[#333]
                "
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}

            {data.buttonText && href && (
              <div className="mt-6">
                {href.startsWith("/") ||
                href.startsWith("#") ? (
                  <Link
                    href={href}
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
                      hover:-translate-y-1
                      hover:bg-[#fff]
                      hover:text-[#000e35]
                      border
                      border-[#000e35]
                    "
                  >
                    {data.buttonText}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      bg-[#c6383b]
                      px-9
                      py-3
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.07em]
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#a92d30]
                    "
                  >
                    {data.buttonText}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* IMAGE */}
          {image?.sourceUrl && (
            <div
              className={`
                flex
                items-center
                justify-center

                ${
                  imageRight
                    ? "md:order-2"
                    : "md:order-1"
                }
              `}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.sourceUrl}
                alt={image.altText || ""}
                loading="lazy"
                className="
                  h-auto
                  max-h-[210px]
                  w-auto
                  max-w-full
                  object-contain
                  transition-transform
                  duration-500
                  hover:scale-[1.04]
                "
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}