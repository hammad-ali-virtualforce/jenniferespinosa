import type {
  PageHeroSectionData,
} from "@/app/lib/wordpress/graphql/pages";

interface PageHeroSectionProps {
  data: PageHeroSectionData;
}

export default function PageHeroSection({
  data,
}: PageHeroSectionProps) {
  const image =
    data.backgroundImage?.node;

  const rawOpacity =
    Number(data.overlayOpacity ?? 40);

  const overlayOpacity =
    Number.isFinite(rawOpacity)
      ? Math.min(
          100,
          Math.max(0, rawOpacity)
        ) / 100
      : 0.4;

  const isCenter =
    data.alignment === "center";

  return (
    <section
      className="
        relative
        flex
        min-h-[440px]
        items-end
        overflow-hidden
        bg-[#202020]
        text-white

        md:min-h-[500px]
        lg:min-h-[560px]
      "
    >
      {/* BACKGROUND IMAGE */}
      {image?.sourceUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image.sourceUrl}
          alt={
            image.altText ||
            data.heading ||
            ""
          }
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      )}

      {/* DYNAMIC OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* OPTIONAL BOTTOM GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/35
          via-transparent
          to-black/10
        "
      />

      {/* CONTENT */}
      <div
        className={`
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
          px-6
          pb-12
          pt-[150px]

          md:px-8
          md:pb-16

          lg:px-12
          lg:pb-20

          ${
            isCenter
              ? "text-center"
              : "text-left"
          }
        `}
      >
        <div
          className={`
            ${
              isCenter
                ? "mx-auto max-w-[900px]"
                : "max-w-[850px]"
            }
          `}
        >
          {/* EYEBROW */}
          {data.eyebrow && (
            <p
              className="
                mb-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/75

                md:text-[11px]
              "
            >
              {data.eyebrow}
            </p>
          )}

          {/* HEADING */}
          {data.heading && (
            <h1
              className="
                font-heading
                text-[clamp(62px,8vw,115px)]
                font-normal
                leading-[0.85]
                text-white
              "
            >
              {data.heading}
            </h1>
          )}

          {/* DESCRIPTION */}
          {data.description && (
            <p
              className={`
                mt-5
                text-[14px]
                leading-[1.8]
                text-white/85

                md:text-[15px]

                ${
                  isCenter
                    ? "mx-auto max-w-[680px]"
                    : "max-w-[680px]"
                }
              `}
            >
              {data.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}