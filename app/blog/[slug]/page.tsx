import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import sanitizeHtml from "sanitize-html";

import {
  getPost,
} from "@/app/lib/wordpress/graphql/posts";

interface SingleBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(
  date?: string | null
) {
  if (!date) return "";

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(new Date(date));
}

function cleanPostHtml(
  html?: string | null
) {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "figure",
      "figcaption",
      "iframe",
      "video",
      "source",
    ]),

    allowedAttributes: {
      ...sanitizeHtml.defaults
        .allowedAttributes,

      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
        "loading",
      ],

      a: [
        "href",
        "target",
        "rel",
      ],

      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "loading",
        "title",
      ],

      video: [
        "src",
        "controls",
        "poster",
      ],

      source: [
        "src",
        "type",
      ],
    },

    allowedSchemes: [
      "http",
      "https",
      "mailto",
      "tel",
    ],
  });
}

/* =========================================
   SEO
========================================= */

export async function generateMetadata({
  params,
}: SingleBlogPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const post =
    await getPost(slug);

  if (!post) {
    return {};
  }

  const image =
    post.featuredImage?.node
      ?.sourceUrl;

  return {
    title: post.title,

    openGraph: {
      title: post.title,
      type: "article",

      images: image
        ? [
            {
              url: image,
            },
          ]
        : undefined,
    },
  };
}

/* =========================================
   PAGE
========================================= */

export default async function SingleBlogPage({
  params,
}: SingleBlogPageProps) {
  const { slug } =
    await params;

  const post =
    await getPost(slug);

  if (!post) {
    notFound();
  }

  const image =
    post.featuredImage?.node;

  const category =
    post.categories
      ?.nodes?.[0];

  const cleanContent =
    cleanPostHtml(
      post.content
    );

  return (
    <main>
      {/* =================================
          POST HERO
      ================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#101619]
          px-6
          pb-16
          pt-[180px]
          text-white

          md:px-8

          lg:px-12
          lg:pb-[90px]
          lg:pt-[210px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1150px]
          "
        >
          {/* CATEGORY */}
          {category?.name && (
            <p
              className="
                mb-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/60
              "
            >
              {category.name}
            </p>
          )}

          {/* TITLE */}
          <h1
            className="
              max-w-[1050px]
              text-[clamp(38px,5vw,70px)]
              font-medium
              leading-[1.08]
              tracking-[-0.02em]
            "
          >
            {post.title}
          </h1>

          {/* META */}
          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-white/60
            "
          >
            {post.date && (
              <span>
                {formatDate(
                  post.date
                )}
              </span>
            )}

            {post.author
              ?.node?.name && (
              <>
                <span>
                  /
                </span>

                <span>
                  By{" "}
                  {
                    post.author
                      .node.name
                  }
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =================================
          FEATURED IMAGE
      ================================= */}

      {image?.sourceUrl && (
        <section
          className="
            bg-[#101619]
            px-6
            pb-0

            md:px-8
            lg:px-12
          "
        >
          <div
            className="
              relative
              mx-auto
              aspect-[16/8]
              max-w-[1450px]
              overflow-hidden
              translate-y-[70px]
              bg-[#eee]
            "
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                image.sourceUrl
              }
              alt={
                image.altText ||
                post.title
              }
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </section>
      )}

      {/* =================================
          CONTENT
      ================================= */}

      <section
        className={`
          bg-white
          px-6
          pb-[100px]

          md:px-8

          lg:px-12
          lg:pb-[130px]

          ${
            image?.sourceUrl
              ? "pt-[130px]"
              : "pt-[80px]"
          }
        `}
      >
        <article
          className="
            blog-content
            mx-auto
            max-w-[850px]
          "
          dangerouslySetInnerHTML={{
            __html:
              cleanContent,
          }}
        />

        {/* BACK TO BLOG */}
        <div
          className="
            mx-auto
            mt-16
            max-w-[850px]
            border-t
            border-[#ddd]
            pt-8
          "
        >
          <Link
            href="/blog/"
            className="
              inline-flex
              border-b
              border-[#303030]
              pb-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#303030]
              transition-colors

              hover:border-[#FC1201]
              hover:text-[#FC1201]
            "
          >
            Back to News & Blog
          </Link>
        </div>
      </section>
    </main>
  );
}