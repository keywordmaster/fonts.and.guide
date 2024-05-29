export const runtime = "edge";

import "./globals.css";

import Link from "next/link";
import { gql } from "urql/core";

import { GetRootLayoutQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootLayoutQuery = gql`
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
    rootLayoutQuery,
    {},
  );

  return (
    <html lang="ko">
      <head>
        <title>{data?.generalSettings?.title}</title>
        <meta name="description" content={data?.generalSettings?.description} />
      </head>
      <body>
        <header>
          <div>
            <h1>
              <Link href="/">{data?.generalSettings?.title}</Link>
            </h1>

            <h5>{data?.generalSettings?.description}</h5>
          </div>

          <ul>
            {data?.primaryMenuItems?.nodes.map((node) => (
              <li key={node.id}>
                <Link href={node.uri}>{node.label}</Link>
              </li>
            ))}
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
