import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

import AreaHero from "@/app/components/areas/AreaHero";
import AreaCard from "@/app/components/areas/AreaCard";

import ListingsSlider from "@/app/components/listings/ListingsSlider";

import {
  getArea,
  getAreas,
} from "@/app/lib/wordpress/graphql/areas";

import {
  getListings,
  getFeaturedListings,
} from "@/app/lib/listings/listings";

function cleanContent(html?: string | null) {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "strong",
      "b",
      "em",
      "i",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
    ],

    allowedAttributes: {
      a: [
        "href",
        "target",
        "rel",
      ],
    },
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  /* ==========================
      AREA DATA
  ========================== */

  const [area, allAreas] =
    await Promise.all([
      getArea(slug),
      getAreas(),
    ]);

  if (!area) {
    notFound();
  }

  /* ==========================
      CONTENT
  ========================== */

  const content = cleanContent(
    area.content
  );

  /* ==========================
      OTHER AREAS
  ========================== */

  const otherAreas = allAreas
    .filter(
      (item) =>
        item.id !== area.id
    )
    .slice(0, 4);

  /* ==========================
      LISTINGS

      For now:
      1. Try current area listings
      2. If none exist, use general
         active demo listings.

      Later iHomefinder will replace
      this data source.
  ========================== */

 const listings = await getListings({
  status: "Active",
});

  return (
    <main>
      {/* ==========================
          HERO
      ========================== */}

      <AreaHero area={area} />

      {/* ==========================
          CONTENT
      ========================== */}

      {content && (
        <section
          className="
            bg-white
            px-6
            py-16
            md:px-8
            lg:px-12
            lg:py-[90px]
          "
        >
          <div
            className="
              area-content
              mx-auto
              max-w-[950px]
              text-[16px]
              leading-[1.9]
              text-[#333]
            "
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </section>
      )}

      {/* ==========================
          AREA LISTINGS
      ========================== */}

      {listings.length > 0 && (
        <section
          className="
            bg-[#f7f5f1]
            px-6
            py-16
            md:px-8
            lg:px-12
            lg:py-[100px]
          "
        >
          <div className="mx-auto max-w-[1500px]">

            {/* SECTION HEADER */}
            <div
              className="
                mb-10
                flex
                flex-col
                gap-5

                lg:mb-12
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div>
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
                  Real Estate
                </p>

                <h2
                  className="
                    font-heading
                    text-[clamp(52px,6vw,82px)]
                    font-normal
                    leading-[0.9]
                    text-[#303030]
                  "
                >
                  Homes in {area.title}
                </h2>
              </div>

              <p
                className="
                  max-w-[480px]
                  text-[14px]
                  leading-[1.8]
                  text-[#666]
                "
              >
                Explore available properties
                and real estate opportunities
                throughout {area.title}.
              </p>
            </div>

            {/* SAME SLIDER AS HOMEPAGE */}
            <ListingsSlider
              listings={listings}
            />

          </div>
        </section>
      )}

      {/* ==========================
          CTA CAN GO HERE LATER
      ========================== */}

      {/* ==========================
          OTHER AREAS
      ========================== */}

      {otherAreas.length > 0 && (
        <section
          className="
            bg-white
            px-6
            py-16
            md:px-8
            lg:px-12
            lg:py-[90px]
          "
        >
          <div className="mx-auto max-w-[1500px]">
            <div
              className="
                mb-10
                flex
                flex-col
                gap-4

                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div>
                <p
                  className="
                    mb-2
                    text-[11px]
                    uppercase
                    tracking-[0.16em]
                    text-[#000e35]
                  "
                >
                  Explore
                </p>

                <h2
                  className="
                    font-heading
                    text-[clamp(52px,6vw,76px)]
                    font-normal
                    leading-[0.95]
                    text-[#303030]
                  "
                >
                  Other Areas
                </h2>
              </div>

              <p
                className="
                  max-w-[460px]
                  text-[14px]
                  leading-[1.7]
                  text-[#666]
                "
              >
                Discover more communities
                throughout the Greater Houston
                area.
              </p>
            </div>

            <div
              className="
                grid
                gap-7
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {otherAreas.map(
                (otherArea) => (
                  <AreaCard
                    key={otherArea.id}
                    area={otherArea}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}