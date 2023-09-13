import { Navbar, Provider } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Case Scheduler",
  description: "Case Scheduler for Police Departments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden h-screen">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
