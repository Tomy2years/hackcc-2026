import Home from "@2026/features/home-page/home";
import AttendeeContainer from "@2026/features/attendee/AttendeeContainer";
import Footer from "@2026/features/footer/apply-page/Footer";
import VolunteerJudgeContainer from "@2026/features/volunteer-judge/VolunteerJudgeContainer";
import { Navbar } from "@2026/components/navbar";
import About from "@2026/features/about/about";
import Collage from "@2026/features/collage/Collage";
import Faq from "@2026/features/faq/Faq";
import VenueMap from "@2026/features/home-page/components/venue-map";
import Link from "next/link";

export default function Archive2026Page() {
  return (
    <div className="flex flex-wrap w-screen min-h-screen relative">
      <Navbar />
      <Home />
      <VenueMap />
      <VolunteerJudgeContainer />
      <About />
      <Collage />
      <Faq />
      <AttendeeContainer />
      <Footer />
    </div>
  );
}
