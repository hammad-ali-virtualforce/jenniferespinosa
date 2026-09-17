import type { Metadata } from "next";

import AreaCard from "@/app/components/areas/AreaCard";

import {
  getAreas,
} from "@/app/lib/wordpress/graphql/areas";

export const metadata: Metadata = {
  title: "Explore Our Areas",
  description:
    "Explore communities and real estate throughout Tomball, Northwest Houston, and the Greater Houston area.",
};

export default async function AreasPage() {
  const areas = await getAreas();

  return (
    <main>
      {/* ==========================
          HERO
      ========================== */}
      <section
        className="
          relative
          flex
          min-h-[430px]
          items-end
          overflow-hidden
          bg-[#101619]
          px-6
          pb-14
          pt-[160px]
          text-white

          md:px-8
          md:pb-16

          lg:min-h-[500px]
          lg:px-12
          lg:pb-20
        "
      >
        {/* BACKGROUND DECORATION */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#101619]
            via-[#20282c]
            to-[#101619]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1500px]
          "
        >
          <div className="max-w-[850px]">
            <p
              className="
                mb-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/65
              "
            >
              Greater Houston
            </p>

            <h1
              className="
                font-heading
                text-[clamp(65px,8vw,110px)]
                font-normal
                leading-[0.85]
                text-white
              "
            >
              Explore Our Areas
            </h1>

            <p
              className="
                mt-6
                max-w-[650px]
                text-[14px]
                leading-[1.8]
                text-white/75
                md:text-[15px]
              "
            >
              Discover communities throughout Tomball,
              Northwest Houston, and the Greater Houston
              area and find the location that feels right
              for your next move.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================
          ALL AREAS
      ========================== */}
      <section
        className="
          bg-white
          px-6
          py-16
          md:px-8
          lg:px-12
          lg:py-[100px]
        "
      >
        <div className="mx-auto max-w-[1500px]">
          {/* TOP */}
          <div
            className="
              mb-12
              flex
              flex-col
              gap-5

              lg:flex-row
              lg:items-end
              lg:justify-between
              lg:mb-14
            "
          >
            <div>
              <p
                className="
                  mb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#FC1201]
                "
              >
                Communities
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
                Find Your Community
              </h2>
            </div>

            <p
              className="
                max-w-[470px]
                text-[14px]
                leading-[1.8]
                text-[#666]
              "
            >
              Explore neighborhoods and communities
              across the Greater Houston area.
            </p>
          </div>

          {/* AREA GRID */}
          {areas.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-x-7
                gap-y-12

                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {areas.map((area) => (
                <AreaCard
                  key={area.id}
                  area={area}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                border
                border-[#ddd]
                px-6
                py-14
                text-center
              "
            >
              <p className="text-[14px] text-[#666]">
                No areas are currently available.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}