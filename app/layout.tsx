import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "KSN Drive",
  description: "Store your files online. Access them from anywhere, anytime.",
  appleWebApp: {
    title: "KSN Drive"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">{children}</body>
    </html>
  );
}