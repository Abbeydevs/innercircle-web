import type { Metadata, Viewport } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://innercirclegospelclub.com"),
  title: {
    default: "The Inner Circle Gospel Club",
    template: "%s | Inner Circle",
  },
  description:
    "Inner Circle is a worship-driven gathering where music, presence and community meet. Join the waitlist for early access to March tickets.",
  keywords: [
    "Inner Circle",
    "worship gathering",
    "worship music",
    "christian community",
    "event waitlist",
  ],
  authors: [{ name: "Inner Circle" }],
  openGraph: {
    title: "The Inner Circle Gospel CLub",
    description:
      "Where music, presence, and community meet. Secure your spot.",
    url: "/",
    siteName: "Inner Circle",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inner Circle Gospel CLub",
    description:
      "Where music, presence, and community meet. Secure your spot.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${albert.className} antialiased bg-[#0B0B0F] text-white min-h-screen selection:bg-[#E5C158]/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}