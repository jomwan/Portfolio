import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Jom | Portfolio — Full-Stack Developer & ICT Student",
  description:
    "Portfolio of Sai Swam Wan Hline (Jom) — ICT student at Rangsit University specializing in full-stack web development, data analytics, and simulation algorithms.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "web developer",
    "ICT student",
    "React",
    "Next.js",
    "Sai Swam Wan Hline",
    "Jom",
  ],
  authors: [{ name: "Sai Swam Wan Hline" }],
  openGraph: {
    type: "website",
    title: "Jom | Portfolio — Full-Stack Developer & ICT Student",
    description:
      "Full-stack web applications, data systems, and simulation algorithms — built by Jom.",
    siteName: "Jom Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jom | Portfolio",
    description:
      "Full-stack web applications, data systems, and simulation algorithms — built by Jom.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <AppProvider>
            <LanguageProvider>
              <NeuralBackground />
              <CustomCursor />
              <div className="noise" />
              {children}
            </LanguageProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
