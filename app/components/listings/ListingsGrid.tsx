import ListingCard from "./ListingCard";

import type { Listing } from "@/app/lib/listings/types";

interface ListingsGridProps {
  listings: Listing[];
}

export default function ListingsGrid({
  listings,
}: ListingsGridProps) {
  if (!listings.length) {
    return (
      <div
        className="
          border
          border-white/20
          px-6
          py-16
          text-center
        "
      >
        <p className="text-[14px] text-white/70">
          No properties found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-x-7
        gap-y-14
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
        />
      ))}
    </div>
  );
}