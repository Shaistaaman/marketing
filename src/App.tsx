import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSyncHtmlLang } from "./i18n/useSyncHtmlLang";
import RootLayout from "./layout/RootLayout";

// The landing page is the common entry point, so it stays in the main bundle.
import LandingPage from "./pages/landing/LandingPage";

// Every other route is split into its own chunk and fetched on demand.
const CollectionsPage = lazy(
  () => import("./pages/collections/CollectionsPage"),
);
const PropertyDetailPage = lazy(
  () => import("./pages/collections/PropertyDetailPage"),
);
const ExperiencesPage = lazy(
  () => import("./pages/experiences/ExperiencesPage"),
);
const ExperienceCollectionPage = lazy(
  () => import("./pages/experiences/ExperienceCollectionPage"),
);
const ExperienceDetailPage = lazy(
  () => import("./pages/experiences/ExperienceDetailPage"),
);
const PackagesPage = lazy(() => import("./pages/packages/PackagesPage"));
const PackageDetailPage = lazy(
  () => import("./pages/packages/PackageDetailPage"),
);
const OwnerPage = lazy(() => import("./pages/owner/OwnerPage"));
const PagePlaceholder = lazy(() => import("./pages/PagePlaceholder"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Minimal fallback shown while a route chunk loads. */
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-white">
      <span className="font-sans text-xs tracking-[0.3em] text-neutral-400 uppercase">
        Loading
      </span>
    </div>
  );
}

export default function App() {
  useSyncHtmlLang();

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<LandingPage />} />

            <Route path="/collections" element={<CollectionsPage />} />
            <Route
              path="/collections/:propertyId"
              element={<PropertyDetailPage />}
            />

            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route
              path="/experiences/collection"
              element={<ExperienceCollectionPage />}
            />
            <Route
              path="/experiences/:experienceId"
              element={<ExperienceDetailPage />}
            />

            <Route path="/packages" element={<PackagesPage />} />
            <Route
              path="/packages/:packageId"
              element={<PackageDetailPage />}
            />

            <Route path="/owner" element={<OwnerPage />} />

            {/* Footer / legal pages — placeholders so no link dead-ends */}
            <Route
              path="/company"
              element={<PagePlaceholder name="Company" />}
            />
            <Route path="/blog" element={<PagePlaceholder name="Blog" />} />
            <Route
              path="/terms"
              element={<PagePlaceholder name="Terms of Service" />}
            />
            <Route
              path="/privacy"
              element={<PagePlaceholder name="Privacy Policy" />}
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
