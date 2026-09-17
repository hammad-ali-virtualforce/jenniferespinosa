import type {
  Metadata,
} from "next";

import BlogCard from "@/app/components/blog/BlogCard";

import {
  getPosts,
} from "@/app/lib/wordpress/graphql/posts";

export const metadata: Metadata = {
  title: "Real Estate News & Insights",
  description:
    "Real estate news, market insights, buying tips, selling advice, and Greater Houston resources from Jennifer Espinosa.",
};

export default async function BlogPage() {
  const posts =
    await getPosts(50);

  return (
    <main>
      {/* =================================
          HERO
      ================================= */}

      <section
        className="
          relative
          flex
          min-h-[470px]
          items-end
          overflow-hidden
          bg-[#101619]
          px-6
          pb-16
          pt-[170px]
          text-white

          md:px-8

          lg:min-h-[540px]
          lg:px-12
          lg:pb-20
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#101619]
            via-[#1d2528]
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
          <p
            className="
              mb-3
              text-[10px]
              font-semibold
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
              text-[clamp(68px,9vw,120px)]
              font-normal
              leading-[0.82]
            "
          >
            News & Blog
          </h1>

          <p
            className="
              mt-6
              max-w-[650px]
              text-[14px]
              leading-[1.8]
              text-white/70

              md:text-[15px]
            "
          >
            Real estate insights,
            market updates, buying
            advice, selling tips,
            and helpful resources
            for Greater Houston.
          </p>
        </div>
      </section>

      {/* =================================
          BLOG GRID
      ================================= */}

      <section
        className="
          bg-[#F8F5EF]
          px-6
          py-16

          md:px-8

          lg:px-12
          lg:py-[110px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >
          <div
            className="
              mb-12
              flex
              flex-col
              gap-5

              lg:mb-16
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
                  tracking-[0.2em]
                  text-[#FC1201]
                "
              >
                Latest Insights
              </p>

              <h2
                className="
                  font-heading
                  text-[clamp(55px,6vw,85px)]
                  font-normal
                  leading-[0.88]
                  text-[#303030]
                "
              >
                From The Blog
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
              Stay informed with
              useful information
              about buying, selling,
              local communities, and
              the Greater Houston
              real estate market.
            </p>
          </div>

          {posts.length > 0 ? (
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
              {posts.map(
                (post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="
                border
                border-[#ddd]
                bg-white
                px-6
                py-16
                text-center
              "
            >
              <p className="text-[#666]">
                No blog posts are
                currently available.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}