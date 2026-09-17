import ListingsArchive from "@/app/components/listings/ListingsArchive";

import {
  getListings,
} from "@/app/lib/listings/listings";

export const metadata = {
  title:
    "Properties | Jennifer Espinosa",
  description:
    "Explore active and sold properties represented by Jennifer Espinosa and The Hometown Team.",
};

export default async function PropertiesPage() {
  const listings = await getListings();

  return (
    <main className="bg-[#101619]">

      {/* HERO */}
      <section
        className="
          px-6
          pb-16
          pt-[180px]
          text-center
          text-white
          md:px-8
          lg:pb-20
          lg:pt-[210px]
        "
      >
        <div className="mx-auto max-w-[850px]">

          <p
            className="
              mb-3
              text-[11px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-white/65
            "
          >
            Jennifer Espinosa
          </p>

          <h1
            className="
              font-heading
              text-[clamp(70px,8vw,115px)]
              font-normal
              leading-[0.9]
              text-white
            "
          >
            Properties
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-[650px]
              text-[14px]
              leading-[1.8]
              text-white/70
              md:text-[15px]
            "
          >
            Explore current listings and recently
            sold properties represented by Jennifer
            Espinosa and The Hometown Team.
          </p>

        </div>
      </section>

      {/* PROPERTIES */}
      <section
        className="
          px-6
          pb-[100px]
          md:px-8
          lg:px-12
          lg:pb-[130px]
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <ListingsArchive
            listings={listings}
          />
        </div>
      </section>

    </main>
  );
}