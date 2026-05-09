import "@/app/globals.css";

import ThemeProvider from "@/app/component/providers/ThemeProvider";
import QueryProvider from "@/app/component/providers/QueryProvider";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}