import Link from "next/link";

import ListingsSlider from "@/app/components/listings/ListingsSlider";

import {
  getFeaturedListings,
} from "@/app/lib/listings/listings";

import type {
  FeaturedListingsSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface FeaturedListingsSectionProps {
  data: FeaturedListingsSectionData;
}

export default async function FeaturedListingsSection({
  data,
}: FeaturedListingsSectionProps) {
  const count =
    data.numberOfListings && data.numberOfListings > 0
      ? data.numberOfListings
      : 6;

  const listings =
    await getFeaturedListings(count);

  if (!listings.length) {
    return null;
  }

  return (
    <section
      className="
        px-6
        py-16
        md:px-8
        lg:px-12
        lg:py-[100px]
      "
      style={{
        backgroundColor:
          data.backgroundColor || "#f8f5ef",
      }}
    >
      <div className="mx-auto max-w-[1500px]">

        {/* TOP */}
        <div
          className="
            mb-10
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-[800px]">
            {data.eyebrow && (
              <p
                className="
                  mb-3
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
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
                  text-[clamp(58px,7vw,92px)]
                  font-normal
                  leading-[0.9]
                  text-[#303030]
                "
              >
                {data.heading}
              </h2>
            )}

            {data.description && (
              <p
                className="
                  mt-5
                  max-w-[650px]
                  text-[14px]
                  leading-[1.8]
                  text-[#555]
                  md:text-[15px]
                "
              >
                {data.description}
              </p>
            )}
          </div>

          {data.buttonText &&
            data.buttonLink && (
              <Link
                href={data.buttonLink}
                className="
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  bg-[#000e35]
                  px-7
                  py-4
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition-colors
                  duration-300
                  hover:bg-[#fff]
                  border
                  border-[#000e35]
                  hover:text-[#000e35]
                "
              >
                {data.buttonText}
              </Link>
            )}
        </div>

        <ListingsSlider
          listings={listings}
        />
      </div>
    </section>
  );
}