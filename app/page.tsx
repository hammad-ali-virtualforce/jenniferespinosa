import SectionRenderer from "@/app/components/sections/SectionRenderer";
import { getPage } from "@/app/lib/wordpress/graphql/pages";
import { getSiteSettings } from "@/app/lib/wordpress/graphql/sites";

export default async function Home() {
  const [page, siteSettings] = await Promise.all([
    getPage("/"),
    getSiteSettings(),
  ]);

  console.log("SITE SETTINGS:", siteSettings);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Homepage not found.</p>
      </main>
    );
  }

  return (
    <main>
      <SectionRenderer
        sections={page.pageSections?.pageSections}
        siteSettings={siteSettings}
      />
    </main>
  );
}