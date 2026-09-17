"use client";

import { useState } from "react";

import ListingsGrid from "./ListingsGrid";

import type { Listing } from "@/app/lib/listings/types";

interface ListingsArchiveProps {
  listings: Listing[];
}

type PropertyStatus = "Active" | "Sold";

export default function ListingsArchive({
  listings,
}: ListingsArchiveProps) {
  const [status, setStatus] =
    useState<PropertyStatus>("Active");

  const filteredListings = listings.filter(
    (listing) =>
      listing.status.toLowerCase() ===
      status.toLowerCase()
  );

  const activeCount = listings.filter(
    (listing) =>
      listing.status.toLowerCase() === "active"
  ).length;

  const soldCount = listings.filter(
    (listing) =>
      listing.status.toLowerCase() === "sold"
  ).length;

  return (
    <div>
      {/* FILTER TABS */}
      <div
        className="
          mb-12
          flex
          items-center
          justify-center
          gap-8
          border-b
          border-white/20
        "
      >
        <button
          type="button"
          onClick={() => setStatus("Active")}
          className={`
            relative
            pb-5
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.15em]
            transition-colors
            duration-300

            ${
              status === "Active"
                ? "text-white"
                : "text-white/50 hover:text-white"
            }
          `}
        >
          Active Properties ({activeCount})

          {status === "Active" && (
            <span
              className="
                absolute
                bottom-[-1px]
                left-0
                h-[2px]
                w-full
                bg-[#fff]
              "
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setStatus("Sold")}
          className={`
            relative
            pb-5
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.15em]
            transition-colors
            duration-300

            ${
              status === "Sold"
                ? "text-white"
                : "text-white/50 hover:text-white"
            }
          `}
        >
          Sold Properties ({soldCount})

          {status === "Sold" && (
            <span
              className="
                absolute
                bottom-[-1px]
                left-0
                h-[2px]
                w-full
                bg-[#fff]
              "
            />
          )}
        </button>
      </div>

      <ListingsGrid
        listings={filteredListings}
      />
    </div>
  );
}