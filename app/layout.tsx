import "./globals.css";

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
      <head>
        <title
          dangerouslySetInnerHTML={{ __html: data?.generalSettings?.title }}
        ></title>
        <meta name="description" content={data?.generalSettings?.description} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
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
