export interface FAQItem {
  id: string;
  question: string;
  badge: string;
  spokenAnswer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "apply",
    question: "When can I apply?",
    badge: "Applications",
    spokenAnswer:
      "Applications open soon! Keep your eyes on our Discord and Instagram for the official drop date. We review applications on a rolling basis, so jumping in early gives you the best shot at securing your seat on the route.",
  },
  {
    id: "what-is-hackathon",
    question: "What is a hackathon anyway?",
    badge: "The Basics",
    spokenAnswer:
      "Think of it as a 14-hour creative sprint! You team up with friends, brainstorm an idea, build a working tech project from scratch, and demo it at the finish line. No pressure—just great food, supportive mentors, and tons of building.",
  },
  {
    id: "teams",
    question: "Can I compete in a team?",
    badge: "Teams & Crews",
    spokenAnswer:
      "You bet! You can ride solo or roll with a crew of up to 4 hackers. Don't have a team yet? Don't stress—we host team-matching mixers right before hacking kicks off so nobody has to road trip alone.",
  },
  {
    id: "cost",
    question: "How much does it cost to attend?",
    badge: "Free Event",
    spokenAnswer:
      "Zero dollars, zero cents! HackCC is 100% free for all admitted community college students. That covers all your meals, snacks, caffeine, exclusive swag bags, workshops, and eligibility for all prize tracks.",
  },
  {
    id: "experience",
    question: "Do I need prior coding experience?",
    badge: "All Levels Welcome",
    spokenAnswer:
      "Not at all! HackCC is crafted specifically for community college students of all experience levels. We host beginner-friendly starter workshops in Git and web building, with hands-on mentors walking the floor the entire time.",
  },
  {
    id: "eligibility",
    question: "Who is eligible to participate?",
    badge: "Eligibility",
    spokenAnswer:
      "Any student currently enrolled in a California community college! High school seniors planning to attend CC and recent CC transfer students are also warmly welcomed to apply and join the route.",
  },
];
