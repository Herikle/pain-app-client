import "./globals.css";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { TopBar } from "@/components/TopBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PainTrack",
  description:
    "A scientific tool for the description and analysis of the pain experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
