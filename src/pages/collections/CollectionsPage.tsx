import PageHero from "../../components/common/PageHero";
import CollectionsSection from "./sections/CollectionsSection";
import HowItWorks from "./sections/HowItWorks";
import WhereNextSection from "./sections/WhereNextSection";

export default function CollectionsPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black font-sans text-white selection:bg-white selection:text-black">
      <PageHero
        background={{ kind: "image", src: "/images/skyloft.jpg" }}
        initialTab="STAY"
        titleKey="collectionsPage.heroTitle"
        subtitleKey="collectionsPage.heroSubtitle"
      />

      <div className="relative z-0 w-full bg-white text-black">
        <CollectionsSection />
        <HowItWorks />
        <WhereNextSection />
      </div>
    </div>
  );
}
