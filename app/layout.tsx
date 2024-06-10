export const runtime = "edge";

import "./globals.css";

import { gql } from "urql/core";

import Header from "@/components/layout/header";
import SideNav from "@/components/layout/side-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GetRootLayoutQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const RootLayoutQuery = gql`
    query GetRootLayout {
      generalSettings {
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>{data?.generalSettings?.title}</title>
        <meta name="description" content={data?.generalSettings?.description} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
