export const runtime = "edge";

import "./globals.css";

import Script from "next/script";
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
        <title dangerouslySetInnerHTML={{ __html: data?.generalSettings?.title }}></title>
        <meta name="description" content={data?.generalSettings?.description} />
        <meta name="robots" content="noindex, nofollow" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K2NEKBNEHP"
        />
        <Script id="ga" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-K2NEKBNEHP');
            `}
        </Script>
        <Script
          id="msc"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mrco71ybro");
          `,
          }}
        />
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
