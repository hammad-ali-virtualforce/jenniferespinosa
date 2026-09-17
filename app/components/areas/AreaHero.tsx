import type { Area } from "@/app/lib/wordpress/graphql/areas";

export default function AreaHero({
  area,
}: {
  area: Area;
}) {
  const image = area.featuredImage?.node;

  return (
    <section
      className="
        relative
        flex
        min-h-[520px]
        items-end
        overflow-hidden
        bg-[#303030]
        text-white
        lg:min-h-[650px]
      "
    >
      {image?.sourceUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.sourceUrl}
            alt={image.altText || area.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/65
              via-black/20
              to-black/30
            "
          />
        </>
      )}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-6
          pb-14
          pt-[150px]
          md:px-8
          lg:px-12
          lg:pb-20
        "
      >
        <p
          className="
            mb-3
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-white/75
          "
        >
          Explore The Area
        </p>

        <h1
          className="
            font-heading
            text-[clamp(65px,8vw,120px)]
            font-normal
            leading-[0.9]
          "
        >
          {area.title}
        </h1>
      </div>
    </section>
  );
}