import { notFound } from "next/navigation";

import SectionRenderer from "@/app/components/sections/SectionRenderer";

import {
  getPage,
} from "@/app/lib/wordpress/graphql/pages";

import {
  getSiteSettings,
} from "@/app/lib/wordpress/graphql/sites";

interface DynamicPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DynamicPage({
  params,
}: DynamicPageProps) {
  const { slug } = await params;

  /*
   * Example:
   *
   * ["about-jennifer"]
   * becomes:
   * /about-jennifer/
   *
   * ["services", "buyers"]
   * becomes:
   * /services/buyers/
   */
  const uri = `/${slug.join("/")}/`;

  const [page, siteSettings] =
    await Promise.all([
      getPage(uri),
      getSiteSettings(),
    ]);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <SectionRenderer
        sections={
          page.pageSections
            ?.pageSections
        }
        siteSettings={
          siteSettings
        }
      />
    </main>
  );
}