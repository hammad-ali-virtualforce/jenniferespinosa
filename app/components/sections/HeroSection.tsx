"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  HeroSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface HeroSectionProps {
  data: HeroSectionData;
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

function HeroButton({
  href,
  label,
  wordpressUrl,
  secondary = false,
}: {
  href: string | null;
  label: string | null;
  wordpressUrl: string;
  secondary?: boolean;
}) {
  const resolvedHref = resolveHref(
    href,
    wordpressUrl
  );

  if (!label || !resolvedHref) {
    return null;
  }

  const classes = `
    inline-flex
    min-h-[48px]
    items-center
    justify-center
    border
    px-7
    py-3
    text-[12px]
    font-semibold
    uppercase
    tracking-[0.08em]
    transition-all
    duration-300
    ${
      secondary
        ? `
          border-white
          bg-transparent
          text-white
          hover:bg-white
          hover:text-[#000e35]
        `
        : `
          border-[#000e35]
          bg-[#000e35]
          text-white
          hover:border-[#000e35]
          hover:bg-white
          hover:text-[#303030]
        `
    }
  `;

  if (
    resolvedHref.startsWith("/") ||
    resolvedHref.startsWith("#")
  ) {
    return (
      <Link
        href={resolvedHref}
        className={classes}
      >
        {label}
      </Link>
    );
  }

  return (
    <a
      href={resolvedHref}
      className={classes}
    >
      {label}
    </a>
  );
}

export default function HeroSection({
  data,
  wordpressUrl,
}: HeroSectionProps) {
  const media =
    data.heroMedia?.filter((item) => {
      if (item.mediaType === "image") {
        return Boolean(
          item.image?.node?.sourceUrl
        );
      }

      if (item.mediaType === "video") {
        return Boolean(
          item.video?.node?.mediaItemUrl
        );
      }

      return false;
    }) ?? [];
console.log("data",data)

  const exploreLinks =
    data.exploreLinks?.filter(
      (item) => item?.title && item?.link
    ) ?? [];

  const [activeIndex, setActiveIndex] =
    useState(0);

  const videoRefs = useRef<
    Array<HTMLVideoElement | null>
  >([]);

  /*
   * Multiple media items:
   * automatically move to next slide.
   */
  useEffect(() => {
    if (media.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) % media.length
      );
    }, 6500);

    return () => {
      window.clearInterval(timer);
    };
  }, [media.length]);

  /*
   * Only play the video that is currently visible.
   */
  useEffect(() => {
    videoRefs.current.forEach(
      (video, index) => {
        if (!video) {
          return;
        }

        if (index === activeIndex) {
          video
            .play()
            .catch(() => {
              // Browser may delay autoplay.
            });
        } else {
          video.pause();
        }
      }
    );
  }, [activeIndex]);

  /*
   * If WordPress media changes while developing,
   * make sure the active slide still exists.
   */
  useEffect(() => {
    if (activeIndex >= media.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, media.length]);

  return (
    <section
      className="
        relative
        min-h-[760px]
        overflow-hidden
        bg-[#303030]
        text-white
        lg:min-h-screen
      "
    >
      {/* ==========================
          HERO MEDIA
      ========================== */}

      <div className="absolute inset-0">
        {media.map((item, index) => {
          const active =
            index === activeIndex;

          return (
            <div
              key={index}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-1000
                ${
                  active
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }
              `}
            >
              {item.mediaType ===
                "image" &&
                item.image?.node
                  ?.sourceUrl && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        item.image.node
                          .sourceUrl
                      }
                      alt={
                        item.image.node
                          .altText || ""
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </>
                )}

              {item.mediaType ===
                "video" &&
                item.video?.node
                  ?.mediaItemUrl && (
                  <video
                    ref={(element) => {
                      videoRefs.current[
                        index
                      ] = element;
                    }}
                    src={
                      item.video.node
                        .mediaItemUrl
                    }
                    poster={
                      item.videoPoster
                        ?.node?.sourceUrl ||
                      undefined
                    }
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                )}
            </div>
          );
        })}

        {/* DARK OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/40
          "
        />

        {/* subtle gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/50
          "
        />
      </div>

      {/* ==========================
          MAIN HERO CONTENT
      ========================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[760px]
          max-w-[1600px]
          items-center
          px-6
          pb-[190px]
          pt-[140px]
          md:px-8
          lg:min-h-screen
          lg:px-12
          lg:pb-[210px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1000px]
            text-center
          "
        >
          {data.heading && (
            <h1
              className="
                font-heading
                text-[clamp(58px,8vw,125px)]
                font-normal
                leading-[0.9]
                tracking-[-0.02em]
                text-white
              "
            >
              {data.heading}
            </h1>
          )}

          {data.description && (
            <p
              className="
                mx-auto
                mt-7
                max-w-[720px]
                text-[14px]
                leading-[1.8]
                text-white/90
                md:text-[16px]
              "
            >
              {data.description}
            </p>
          )}

          {(data.primaryButtonText ||
            data.secondaryButtonText) && (
            <div
              className="
                mt-9
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <HeroButton
                href={
                  data.primaryButtonLink
                }
                label={
                  data.primaryButtonText
                }
                wordpressUrl={
                  wordpressUrl
                }
              />

              <HeroButton
                href={
                  data.secondaryButtonLink
                }
                label={
                  data.secondaryButtonText
                }
                wordpressUrl={
                  wordpressUrl
                }
                secondary
              />
            </div>
          )}
        </div>
      </div>

      {/* ==========================
          EXPLORE LINKS
      ========================== */}

      {exploreLinks.length > 0 && (
        <div
          className="
            absolute
            bottom-0
            left-0
            z-20
            w-full
            border-t
            border-white/35
            bg-black/10
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              mx-auto
              grid
              w-full
              grid-cols-2
              px-6
              md:px-8
              lg:grid-cols-6
              lg:px-12
            "
          >
            {/* ==========================
    EXPLORE LINKS
========================== */}

{exploreLinks.length > 0 && (
  <div
    className="
      absolute
      bottom-0
      left-0
      z-20
      w-full
      border-t
      border-white
    "
  >
    <div
      className="
        mx-auto
        grid
        w-full
        grid-cols-2
        px-6
        md:grid-cols-3
        md:px-8
        lg:grid-cols-5
        lg:px-12
      "
    >
      {exploreLinks.map((item, index) => {
        const href =
          resolveHref(
            item.link,
            wordpressUrl
          ) || "#";

        const classes = `
          group
          relative
          flex
          min-h-[90px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-4
          py-5
          text-center
          transition-all
          duration-300
          hover:border-t-5
          hover:border-[#fff]
          lg:min-h-[105px]
          
        `;

        const content = (
          <div
            className="
            transition-all
            duration-300
            ease-out
            group-hover:-translate-y-1
            group-hover:scale-[1.04]
            ">
            {/* EYEBROW */}
            {item.eyebrow && (
              <span
                className="
                  mb-1
                block
                text-[9px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                transition-colors
                duration-300
                md:text-[10px]
                "
              >
                {item.eyebrow}
              </span>
            )}

            {/* TITLE */}
            <span
              className="
                 block
                text-[11px]
                font-medium
                uppercase
                tracking-[0.1em]
                md:text-[12px]
              "
            >
              {item.title}
            </span>
          </div>
        );

        if (
          href.startsWith("/") ||
          href.startsWith("#")
        ) {
          return (
            <Link
              key={index}
              href={href}
              className={classes}
            >
              {content}
            </Link>
          );
        }

        return (
          <a
            key={index}
            href={href}
            className={classes}
          >
            {content}
          </a>
        );
      })}
    </div>
  </div>
)}
          </div>
        </div>
      )}

      {/* ==========================
          SLIDER DOTS
          Only when 2+ media
      ========================== */}

      {media.length > 1 && (
        <div
          className="
            absolute
            bottom-[125px]
            left-1/2
            z-30
            flex
            -translate-x-1/2
            gap-2
            lg:bottom-[145px]
          "
        >
          {media.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to hero slide ${
                index + 1
              }`}
              onClick={() =>
                setActiveIndex(index)
              }
              className={`
                h-[7px]
                rounded-full
                transition-all
                duration-300
                ${
                  activeIndex ===
                  index
                    ? "w-7 bg-white"
                    : "w-[7px] bg-white/50 hover:bg-white"
                }
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}