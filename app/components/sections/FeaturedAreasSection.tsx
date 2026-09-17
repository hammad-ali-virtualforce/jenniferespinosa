import AreaCard from "@/app/components/areas/AreaCard";

import type {
  FeaturedAreasSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface FeaturedAreasSectionProps {
  data: FeaturedAreasSectionData;
}

export default function FeaturedAreasSection({
  data,
}: FeaturedAreasSectionProps) {
  const areas =
    data.areas?.nodes?.filter(
      (area) => area?.id
    ) ?? [];

  if (!areas.length) {
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
          data.backgroundColor || "#ffffff",
      }}
    >
      <div className="mx-auto max-w-[1500px]">

        {/* =========================
            SECTION HEADING
        ========================= */}
        <div
          className="
            mx-auto
            mb-12
            max-w-[850px]
            text-center
            lg:mb-16
          "
        >
          {data.eyebrow && (
            <p
              className="
                mb-3
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#fff]
              "
            >
              {data.eyebrow}
            </p>
          )}

          {data.heading && (
            <h2
              className="
                font-heading
                text-[clamp(58px,7vw,96px)]
                font-normal
                leading-[0.9]
                text-[#fff]
              "
            >
              {data.heading}
            </h2>
          )}

          {data.description && (
            <p
              className="
                mx-auto
                mt-6
                max-w-[720px]
                text-[15px]
                leading-[1.8]
                text-[#fff]
              "
            >
              {data.description}
            </p>
          )}
        </div>

        {/* =========================
            AREA GRID

            First 4:
            3 columns each out of 12

            Last 3:
            4 columns each out of 12
        ========================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-6
            gap-y-10
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-x-7
            lg:gap-y-14
          "
        >
          {areas.map((area, index) => {
            const secondRow = index >= 4;

            return (
              <div
                key={area.id}
                className={`
                  sm:col-span-1

                  ${
                    secondRow
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                  }
                `}
              >
                <AreaCard
                  area={area}
                  featured
                  large={secondRow}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}