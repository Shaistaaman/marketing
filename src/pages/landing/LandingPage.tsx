import PageHero from "../../components/common/PageHero";
import { VIDEO } from "../../lib/constants";
import CTA from "./sections/CTA";
import DedicatedTeam from "./sections/DedicatedTeam";
import Experience from "./sections/Experience";
import GuestsPO from "./sections/GuestsPO";
import InstagramSection from "./sections/InstagramSection";
import Package from "./sections/Package";
import PORules from "./sections/PORules";
import Property from "./sections/Property";
import ProvenSuccess from "./sections/ProvenSuccess";
import SoMuch from "./sections/SoMuch";
import Testimonial from "./sections/Testimonial";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black font-sans text-white selection:bg-white selection:text-black">
      <PageHero
        background={{ kind: "video", src: VIDEO.homepageHero }}
        initialTab="STAY"
      />

      {/* WHITE CONTENT SECTIONS */}
      <div className="relative z-0 w-full bg-white text-black">
        <Property />
        <Package />
        <Experience />
        <GuestsPO />
        <PORules />
        <ProvenSuccess />
        <InstagramSection />
        <Testimonial />
        <CTA />
        <SoMuch />
        <DedicatedTeam />
      </div>
    </div>
  );
}
