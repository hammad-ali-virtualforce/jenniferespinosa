import Link from "next/link";
import {
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";

import type { Listing } from "@/app/lib/listings/types";

interface ListingCardProps {
  listing: Listing;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function ListingCard({
  listing,
}: ListingCardProps) {
  const image = listing.images?.[0];

  return (
    <Link
      href={listing.url}
      className="
        group
        block
        min-w-0
        bg-white
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[1.42/1]
          overflow-hidden
          bg-[#e9e9e9]
        "
      >
        {image?.url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.url}
            alt={
              image.alt ||
              listing.address.street
            }
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.04]
            "
          />
        )}

        {/* STATUS */}
        <div
          className="
            absolute
            left-4
            top-4
            flex
            gap-2
          "
        >
          {listing.badge && (
            <span
              className="
                bg-[#000e35]
                px-3
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white
              "
            >
              {listing.badge}
            </span>
          )}

          {listing.status && (
            <span
              className="
                bg-white
                px-3
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#303030]
              "
            >
              {listing.status}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-5">

        {/* PRICE */}
        <h3
          className="
            text-[25px]
            font-medium
            leading-none
            tracking-[-0.02em]
            text-[#303030]
            lg:text-[28px]
          "
        >
          {formatPrice(listing.price)}
        </h3>

        {/* TYPE */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-4
            text-[10px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#777]
          "
        >
          <span>
            {listing.propertyType}
          </span>

          <span>
            {listing.status}
          </span>
        </div>

        {/* PROPERTY INFO */}
        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-2
            border-y
            border-[#dedede]
            py-4
            text-[11px]
            font-medium
            uppercase
            tracking-[0.06em]
            text-[#444]
          "
        >
          {listing.bedrooms !== null && (
            <div className="flex items-center gap-2">
              <BedDouble size={15} strokeWidth={1.5} />

              <span>
                {listing.bedrooms} Beds
              </span>
            </div>
          )}

          {listing.bathrooms !== null && (
            <div className="flex items-center gap-2">
              <Bath size={15} strokeWidth={1.5} />

              <span>
                {listing.bathrooms} Baths
              </span>
            </div>
          )}

          {listing.sqft !== null && (
            <div className="flex items-center gap-2">
              <Maximize2 size={14} strokeWidth={1.5} />

              <span>
                {formatNumber(listing.sqft)} SqFt
              </span>
            </div>
          )}
        </div>

        {/* ADDRESS */}
        <div className="pt-4">
          <p
            className="
              text-[14px]
              font-semibold
              leading-[1.5]
              text-[#303030]
            "
          >
            {listing.address.street}
          </p>

          <p
            className="
              mt-1
              text-[12px]
              leading-[1.6]
              text-[#777]
            "
          >
            {listing.address.city},{" "}
            {listing.address.state}{" "}
            {listing.address.zip}
          </p>
        </div>

        {/* BROKERAGE */}
        {listing.brokerage && (
          <p
            className="
              mt-4
              border-t
              border-[#ededed]
              pt-3
              text-[9px]
              leading-[1.5]
              text-[#999]
            "
          >
            Listing courtesy of{" "}
            {listing.brokerage}
          </p>
        )}
      </div>
    </Link>
  );
}