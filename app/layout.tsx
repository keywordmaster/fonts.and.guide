export const runtime = "edge";

import "./globals.css";

import Link from "next/link";
import { gql } from "urql/core";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
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
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          label
          uri
        }
      }
      footerMenuItems: menuItems(where: { location: FOOTER }) {
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-between">
            <div>
              <h1>
                <Link href="/">{data?.generalSettings?.title}</Link>
              </h1>

              <h5>{data?.generalSettings?.description}</h5>
            </div>
            <ul className="flex items-center">
              {data?.primaryMenuItems?.nodes.map((node) => (
                <li key={node.id}>
                  <Link href={node.uri}>{node.label}</Link>
                </li>
              ))}
              <ModeToggle />
            </ul>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
