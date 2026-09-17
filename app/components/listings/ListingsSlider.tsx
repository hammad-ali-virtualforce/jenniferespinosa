"use client";

import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import ListingCard from "./ListingCard";

import type { Listing } from "@/app/lib/listings/types";

interface ListingsSliderProps {
  listings: Listing[];
}

export default function ListingsSlider({
  listings,
}: ListingsSliderProps) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const isSingle =
    listings.length === 1;

  function scroll(
    direction: "left" | "right"
  ) {
    const slider =
      sliderRef.current;

    if (!slider) return;

    const firstCard =
      slider.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    const styles =
      window.getComputedStyle(
        slider
      );

    const gap =
      parseFloat(
        styles.columnGap ||
          styles.gap ||
          "24"
      ) || 24;

    const amount =
      firstCard.offsetWidth + gap;

    slider.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  }

  if (!listings.length) {
    return null;
  }

  return (
    <div className="relative">

      {/* =========================
          ARROWS
      ========================= */}

      {listings.length > 1 && (
        <div
          className="
            mb-7
            flex
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            aria-label="Previous listings"
            onClick={() =>
              scroll("left")
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-[#303030]
              text-[#303030]
              transition-all
              duration-300

              hover:border-[#000e35]
              hover:bg-[#000e35]
              hover:text-white
            "
          >
            <ArrowLeft
              size={18}
            />
          </button>

          <button
            type="button"
            aria-label="Next listings"
            onClick={() =>
              scroll("right")
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-[#303030]
              text-[#303030]
              transition-all
              duration-300

              hover:border-[#000e35]
              hover:bg-[#000e35]
              hover:text-white
            "
          >
            <ArrowRight
              size={18}
            />
          </button>
        </div>
      )}

      {/* =========================
          SLIDER
      ========================= */}

      <div
        ref={sliderRef}
        className={`
          listing-slider
          flex
          snap-x
          snap-mandatory
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-4

          ${
            isSingle
              ? "justify-start"
              : ""
          }
        `}
      >
        {listings.map(
          (listing) => (
            <div
              key={listing.id}
              className={`
                shrink-0
                snap-start

                ${
                  isSingle
                    ? `
                      w-full
                      sm:w-[calc(50%-12px)]
                      lg:w-[calc(25%-18px)]
                    `
                    : `
                      w-[88%]
                      sm:w-[48%]
                      lg:w-[calc(33.333%-16px)]
                    `
                }
              `}
            >
              <ListingCard
                listing={listing}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}