import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavigationHeader from "./NavigationHeader";

/**
 * App shell — mirrors the Next.js layout.tsx:
 * NavigationHeader + page content + Footer.
 */
export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
