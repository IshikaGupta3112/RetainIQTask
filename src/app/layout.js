import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/redux/storeProvider";

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`antialiased`}>{children}</body>
      </html>
    </StoreProvider>
  );
}
