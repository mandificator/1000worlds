import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Serif_4 } from "next/font/google";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import { SolanaWalletProvider } from "@/providers/WalletProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://1000worlds.xyz";
const DESCRIPTION =
  "1000 worlds. each one lives fully on Solana. no servers, no ipfs, no dead links. minting soon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "1000 worlds",
    template: "%s · 1000 worlds",
  },
  description: DESCRIPTION,
  applicationName: "1000 worlds",
  keywords: [
    "1000 worlds",
    "Solana NFT",
    "generative art",
    "pixel art NFT",
    "Solana mint",
  ],
  openGraph: {
    title: "1000 worlds",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "1000 worlds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1000 worlds",
    description: DESCRIPTION,
  },
  // favicon.ico, icon.png, apple-icon.png, opengraph-image.png and
  // twitter-image.png in this folder are picked up automatically by Next.js
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${sourceSerif.variable} grain antialiased`}>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
