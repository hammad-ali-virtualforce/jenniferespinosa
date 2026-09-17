import type { Metadata } from "next";
import { Montserrat, Alex_Brush } from "next/font/google";

import "./globals.css";

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { getSiteSettings } from "@/app/lib/wordpress/graphql/sites";
import { getMenus } from "@/app/lib/wordpress/graphql/menus";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const favicon =
    settings?.branding?.favicon?.node?.sourceUrl;

  const siteName =
    settings?.branding?.siteName ||
    "Jennifer Espinosa Real Estate";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },

    icons: favicon
      ? {
          icon: [
            {
              url: favicon,
            },
          ],
          shortcut: [
            {
              url: favicon,
            },
          ],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, menus] = await Promise.all([
    getSiteSettings(),
    getMenus(),
  ]);

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${alexBrush.variable}`}
    >
      <body>
        <Header
          settings={settings}
          primaryMenu={menus.headerPrimary}
          secondaryMenu={menus.headerSecondary}
        />

        {children}
        <Footer
        settings={settings}
        primaryMenu={menus.footerPrimary}
        secondaryMenu={menus.footerSecondary}
        tertiaryMenu={menus.footerTertiary}
      />
      </body>
    </html>
  );
}