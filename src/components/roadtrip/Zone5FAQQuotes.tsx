import { Scene, StopMarker, StopTitle } from "./Scene";
import ScheduleAndFaq from "./ScheduleAndFaq";

const SAN_ONOFRE = "/assets/roadtrip/zone5-faq/san-onofre.jpg";

export default function Zone5FAQQuotes() {
  return (
    <Scene id="zone-faq" image={SAN_ONOFRE} alt="Pacific Coast Highway at San Onofre before dawn: a surf van at a turnout, the two domes on the shore, surf below" focus="center" tone="day">
      <StopMarker number={5} place="San Onofre" />
      <StopTitle hook="Plan your day" title="Schedule and questions" />
      <ScheduleAndFaq />
    </Scene>
  );
}
