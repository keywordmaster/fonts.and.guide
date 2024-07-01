import "./globals.css";

import { Metadata } from "next";
import localFont from "next/font/local";
import { gql } from "urql/core";

import AnalyticsScripts from "@/components/analytics-script";
import Header from "@/components/layout/header";
import SideNav from "@/components/layout/side-nav";
import { ClientProvider } from "@/components/provider";
import { GetRootLayoutQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

const suite = localFont({
  src: "./SUITE-Variable.woff2",
  display: "swap",
  variable: "--font-suite",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  title: {
    default: "폰트 & 가이드",
    template: "%s | 폰트 & 가이드",
  },
  description:
    "폰트 & 가이드는 웹 폰트, 폰트 디자인, 폰트 개발 등 폰트와 관련된 정보를 제공합니다.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: {
      default: "폰트 & 가이드",
      template: "%s | 폰트 & 가이드",
    },
    description:
      "폰트 & 가이드는 웹 폰트, 폰트 디자인, 폰트 개발 등 폰트와 관련된 정보를 제공합니다.",
    locale: "ko_KR",
    siteName: "폰트 & 가이드",
    images: [],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const RootLayoutQuery = gql`
    query GetRootLayout {
      generalSettings {
        id: __typename
        title
        description
      }
      primaryMenus: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          label
          uri
          title # for Lucide Icon name
        }
      }
      footerMenus: menuItems(where: { location: FOOTER }) {
        nodes {
          id
          label
          uri
        }
      }
    }
  `;

  const { data, error } = await getClient().query<GetRootLayoutQuery>(
    RootLayoutQuery,
    {},
  );

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${suite.variable} font-suite`}
    >
      <head></head>
      <body className="">
        <ClientProvider>
          <div className="grid h-screen w-full pl-[56px]">
            <SideNav menus={data?.primaryMenus?.nodes} />
            <div className="flex flex-col">
              <Header title={data?.generalSettings?.title} />
              <main className="max-w-[calc(100vw-56px)] p-4 flex-1">
                {children}
              </main>
              <footer className="flex border-t min-h-[56px] p-4">
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${data?.generalSettings?.title} © ${new Date().getFullYear()}`,
                  }}
                ></p>
              </footer>
            </div>
          </div>
        </ClientProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
