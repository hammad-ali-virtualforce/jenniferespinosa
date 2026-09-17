"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  BuyingOrSellingSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface BuyingOrSellingSectionProps {
  data: BuyingOrSellingSectionData;
  wordpressUrl?: string;
}

function resolveLink(
  url: string | null,
  wordpressUrl?: string
) {
  if (!url) return "#";

  try {
    const parsedUrl = new URL(url);

    if (wordpressUrl) {
      const wpUrl = new URL(wordpressUrl);

      if (parsedUrl.origin === wpUrl.origin) {
        return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}

export default function BuyingOrSellingSection({
  data,
  wordpressUrl,
}: BuyingOrSellingSectionProps) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const scrollTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const [activeIndex, setActiveIndex] =
    useState(0);

  const items =
    data.sliderItems?.filter(
      (item) =>
        item.heading ||
        item.backgroundImage?.node?.sourceUrl
    ) ?? [];

  const sectionImage =
    data.backgroundImage?.node;

  const hasSlider = items.length > 1;

  function scrollToSlide(index: number) {
    const slider = sliderRef.current;

    if (!slider || !items.length) return;

    const normalizedIndex =
      (index + items.length) %
      items.length;

    const slide =
      slider.children[
        normalizedIndex
      ] as HTMLElement | undefined;

    if (!slide) return;

    const left =
      slide.offsetLeft -
      (slider.clientWidth -
        slide.clientWidth) /
        2;

    slider.scrollTo({
      left,
      behavior: "smooth",
    });

    setActiveIndex(normalizedIndex);
  }

  function handleScroll() {
    if (!hasSlider) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(
        scrollTimeoutRef.current
      );
    }

    scrollTimeoutRef.current =
      setTimeout(() => {
        const slider =
          sliderRef.current;

        if (!slider) return;

        const sliderCenter =
          slider.scrollLeft +
          slider.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        Array.from(
          slider.children
        ).forEach((child, index) => {
          const element =
            child as HTMLElement;

          const childCenter =
            element.offsetLeft +
            element.clientWidth / 2;

          const distance = Math.abs(
            sliderCenter - childCenter
          );

          if (
            distance < closestDistance
          ) {
            closestDistance =
              distance;
            closestIndex = index;
          }
        });

        setActiveIndex(
          closestIndex
        );
      }, 80);
  }

  useEffect(() => {
    return () => {
      if (
        scrollTimeoutRef.current
      ) {
        clearTimeout(
          scrollTimeoutRef.current
        );
      }
    };
  }, []);

  if (!items.length) {
    return null;
  }

  return (
    <section
      className="
         buying-selling-section
    relative
    overflow-hidden
    bg-[#101619]
    bg-cover
    bg-center
    bg-fixed
    bg-no-repeat
    py-16
    text-white
    lg:py-[100px]
      " style={{
    backgroundImage: sectionImage?.sourceUrl
      ? `url("${sectionImage.sourceUrl}")`
      : undefined,
  }}
    >
      <div
      className="
        absolute
        inset-0
        bg-black/65
      "
    />

      <div className="relative z-10">
        {/* SECTION HEADING */}
        {data.heading && (
          <div
            className="
              mx-auto
              mb-12
              max-w-[900px]
              px-6
              text-center
              lg:mb-14
            "
          >
            <h2
              className="
                font-heading
                text-[clamp(60px,7vw,100px)]
                font-normal
                leading-[0.9]
                text-white
              "
            >
              {data.heading}
            </h2>
          </div>
        )}

        {/* SLIDER */}
        <div className="relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className={`
              buying-selling-slider
              flex
              snap-x
              snap-mandatory
              gap-5
              overflow-x-auto
              scroll-smooth
              px-[6vw]
              md:gap-32
              md:px-[12vw]
              lg:px-[18vw]

              ${
                hasSlider
                  ? ""
                  : "justify-center"
              }
            `}
          >
            {items.map(
              (item, index) => {
                const image =
                  item
                    .backgroundImage
                    ?.node;

                const position =
                  item.contentPosition ===
                  "right"
                    ? "right"
                    : "left";

                const href =
                  resolveLink(
                    item.buttonLink,
                    wordpressUrl
                  );

                const internalLink =
                  href.startsWith("/");

                return (
                  <article
                    key={index}
                    className="
                      relative
                      min-h-[500px]
                      w-[88vw]
                      max-w-[980px]
                      shrink-0
                      snap-center
                      overflow-visible
                      bg-[#333]
                      md:w-[74vw]
                      lg:min-h-[560px]
                      lg:w-[64vw]
                      xl:w-[58vw]
                    "
                  >
                    {/* SLIDE IMAGE */}
                    {image?.sourceUrl && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={
                          image.sourceUrl
                        }
                        alt={
                          image.altText ||
                          item.heading ||
                          ""
                        }
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          ease-out
                        "
                      />
                    )}

                    {/* SLIDE OVERLAY */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/20
                      "
                    />

                    {/* WHITE CONTENT CARD */}
                    <div
                      className={`
                        absolute
                        bottom-5
                        left-[-100px]
                        right-5
                        z-10
                        bg-white
                        px-7
                        py-8
                        text-[#303030]
                        shadow-[0_15px_45px_rgba(0,0,0,0.18)]

                        md:bottom-auto
                        md:right-auto
                        md:top-1/2
                        md:w-[600px]
                        md:max-w-[calc(100%-5rem)]
                        md:-translate-y-1/2
                        md:px-12
                        md:py-10

                        ${
                          position ===
                          "right"
                            ? `
                              md:left-auto
                              md:right-10
                              lg:right-12
                            `
                            : `
                              md:left-[-100px]
                              lg:left-[-100px]
                            `
                        }
                      `}
                    >
                      {item.eyebrow && (
                        <p
                          className="
                            mb-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-[#000e35]
                          "
                        >
                          {
                            item.eyebrow
                          }
                        </p>
                      )}

                      {item.heading && (
                        <h3
                          className="
                            font-heading
                            text-[clamp(45px,4vw,64px)]
                            font-normal
                            leading-[0.9]
                            text-[#303030]
                          "
                        >
                          {
                            item.heading
                          }
                        </h3>
                      )}

                      {item.description && (
                        <p
                          className="
                            mt-5
                            text-[13px]
                            leading-[1.8]
                            text-[#555]
                            md:text-[14px]
                          "
                        >
                          {
                            item.description
                          }
                        </p>
                      )}

                      {item.buttonText &&
                        item.buttonLink &&
                        (internalLink ? (
                          <Link
                            href={
                              href
                            }
                            className="
                              mt-6
                              inline-flex
                              items-center
                              justify-center
                              bg-[#000e35]
                              px-6
                              py-3.5
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]
                              text-white
                              transition-colors
                              duration-300
                              hover:bg-[#303030]
                            "
                          >
                            {
                              item.buttonText
                            }
                          </Link>
                        ) : (
                          <a
                            href={
                              href
                            }
                            className="
                              mt-6
                              inline-flex
                              items-center
                              justify-center
                              bg-[#000e35]
                              px-6
                              py-3.5
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]
                              text-white
                              transition-colors
                              duration-300
                              hover:bg-[#303030]
                            "
                          >
                            {
                              item.buttonText
                            }
                          </a>
                        ))}
                    </div>
                  </article>
                );
              }
            )}
          </div>

          {/* ARROWS */}
          {hasSlider && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() =>
                  scrollToSlide(
                    activeIndex - 1
                  )
                }
                className="
                  absolute
                  left-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-[#000e35]
                  text-white
                  shadow-lg
                  transition-transform
                  duration-300
                  hover:scale-110
                  md:left-7
                "
              >
                <ChevronLeft
                  size={20}
                />
              </button>

              <button
                type="button"
                aria-label="Next slide"
                onClick={() =>
                  scrollToSlide(
                    activeIndex + 1
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-[#000e35]
                  text-white
                  shadow-lg
                  transition-transform
                  duration-300
                  hover:scale-110
                  md:right-7
                "
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}

          {/* INDICATORS */}
          {hasSlider && (
            <div
              className="
                mt-7
                flex
                justify-center
                gap-2
              "
            >
              {items.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    onClick={() =>
                      scrollToSlide(
                        index
                      )
                    }
                    className={`
                      h-[3px]
                      transition-all
                      duration-300

                      ${
                        activeIndex ===
                        index
                          ? "w-8 bg-white"
                          : "w-4 bg-white/35"
                      }
                    `}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}