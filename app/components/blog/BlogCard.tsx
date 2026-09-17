import Link from "next/link";

import type {
  BlogPost,
} from "@/app/lib/wordpress/graphql/posts";

interface BlogCardProps {
  post: BlogPost;
}

function stripHtml(
  value?: string | null
) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
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

export default function BlogCard({
  post,
}: BlogCardProps) {
  const image =
    post.featuredImage?.node;

  const category =
    post.categories?.nodes?.[0];

  return (
    <article className="group">
      <Link
        href={`/blog/${post.slug}/`}
        className="block"
      >
        {/* IMAGE */}
        <div
          className="
            relative
            aspect-[1.35/1]
            overflow-hidden
            bg-[#ece9e3]
          "
        >
          {image?.sourceUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image.sourceUrl}
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
                transition-transform
                duration-700
                group-hover:scale-[1.04]
              "
            />
          )}

          {category?.name && (
            <span
              className="
                absolute
                left-5
                top-5
                bg-white
                px-4
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#000E3C]
              "
            >
              {category.name}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="pt-6">
          {post.date && (
            <p
              className="
                mb-3
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-[#777]
              "
            >
              {formatDate(
                post.date
              )}
            </p>
          )}

          <h2
            className="
              text-[22px]
              font-medium
              leading-[1.3]
              text-[#303030]
              transition-colors
              duration-300
              group-hover:text-[#FC1201]

              md:text-[24px]
            "
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              className="
                mt-4
                line-clamp-3
                text-[13px]
                leading-[1.8]
                text-[#666]

                md:text-[14px]
              "
            >
              {stripHtml(
                post.excerpt
              )}
            </p>
          )}

          <span
            className="
              mt-5
              inline-block
              border-b
              border-[#303030]
              pb-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#303030]
              transition-colors
              duration-300

              group-hover:border-[#FC1201]
              group-hover:text-[#FC1201]
            "
          >
            Read Article
          </span>
        </div>
      </Link>
    </article>
  );
}