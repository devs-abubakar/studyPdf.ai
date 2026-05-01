import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyPdf.ai",
  description: "Study and summarize faster",
};

export default function DashboardLayout({children}){
    return(
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
        <body className="landing-theme">
        <div className="h-[100vh] w-[100vw]">
        <section className="landing-page-content">
            {children}
        </section>
        </div>
        </body>
    </html>
    )
}