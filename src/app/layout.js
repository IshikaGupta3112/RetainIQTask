import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/redux/storeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ height: '100%', overflow: 'auto' }}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}