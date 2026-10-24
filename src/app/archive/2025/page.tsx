import Home from "@2025/features/home-page/home";
import AttendeeContainer from "@2025/features/attendee/AttendeeContainer";
import Footer from "@2025/features/footer/apply-page/Footer";
import VolunteerJudgeContainer from "@2025/features/volunteer-judge/VolunteerJudgeContainer";
import { Navbar } from "@2025/components/navbar";
import About from "@2025/features/about/about";
import Collage from "@2025/features/collage/Collage";
import Faq from "@2025/features/faq/Faq";
import Carousel from "@2025/features/events/carosoul";
import VenueMap from "@2025/features/home-page/components/venue-map";
import ArchiveHeaderBanner from "@/components/archive/ArchiveHeaderBanner";

export default function Archive2025Page() {
  return (
    <div className="flex flex-col w-screen min-h-screen relative overflow-x-hidden">
      {/* Universal Archive Header Banner */}
      <ArchiveHeaderBanner currentYear="2025" />

      {/* 2025 Archived Site Content */}
      <div className="flex flex-wrap w-full relative">
        <Navbar />
        <Home />
        <VenueMap />
        <VolunteerJudgeContainer />
        <About />
        <Collage />
        <Faq />
        <Carousel />
        <AttendeeContainer />
        <Footer />
      </div>
    </div>
  );
}
