export const runtime = "edge";

import "./globals.css";

import { Metadata, ResolvingMetadata } from "next";
import { gql } from "urql/core";

import { GetRootLayoutQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

const rootLayoutQuery = gql`
    query GetRootLayout {
      generalSettings {
        title
        description
      }
      # primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      #   nodes {
      #     id
      #     label
      #     uri
      #   }
      # }
      # footerMenuItems: menuItems(where: { location: FOOTER }) {
      #   nodes {
      #     id
      #     label
      #     uri
      #   }
      # }
    }
  `;

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  // const id = params.id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const { data, error } = await getClient().query<GetRootLayoutQuery>(
    rootLayoutQuery,
    {},
  );

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: data?.generalSettings.title,
    description: data?.generalSettings.description,
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
