import Home from "@2026/features/home-page/home";
import AttendeeContainer from "@2026/features/attendee/AttendeeContainer";
import Footer from "@2026/features/footer/apply-page/Footer";
import VolunteerJudgeContainer from "@2026/features/volunteer-judge/VolunteerJudgeContainer";
import { Navbar } from "@2026/components/navbar";
import About from "@2026/features/about/about";
import Collage from "@2026/features/collage/Collage";
import Faq from "@2026/features/faq/Faq";
import VenueMap from "@2026/features/home-page/components/venue-map";
import ArchiveHeaderBanner from "@/components/archive/ArchiveHeaderBanner";

export default function Archive2026Page() {
  return (
    <div className="flex flex-col w-screen min-h-screen relative overflow-x-hidden">
      {/* Universal Archive Header Banner */}
      <ArchiveHeaderBanner currentYear="2026" />

      {/* 2026 Archived Site Content */}
      <div className="flex flex-wrap w-full relative">
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
    </div>
  );
}
