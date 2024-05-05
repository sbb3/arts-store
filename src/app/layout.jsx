import { Toaster } from "@/components/ui/toaster";
import DefaultLayout from "@/layouts/default-layout";
import { ApolloWrapper } from "@/lib/apollo/apollo-wrapper";
import { auth } from "auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Art Store",
  description: "Art Store by Anas Douib, made with Next.js, GraphQL and Hasura",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <style>{inter.styles}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ApolloWrapper>
          <SessionProvider session={await auth()}>
            <DefaultLayout suppressHydrationWarning={true}>
              {children}
            </DefaultLayout>
          </SessionProvider>
        </ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
