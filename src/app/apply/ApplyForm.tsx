"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Car, Check, CheckCircle, ChevronDown, Info, Search } from "lucide-react";
import { CALIFORNIA_COMMUNITY_COLLEGES } from "./colleges";
import { INTEREST_OPTIONS, OTHER_COLLEGE, TSHIRT_SIZES, registrationSchema, type RegistrationFormData } from "./schema";
import { submitRegistration } from "./actions";
import { RegistrationReceivedCard } from "./RegistrationReceivedCard";
import { TurnstileWidget } from "./TurnstileWidget";
import hackccIcon from "../../../public/images/hackcc-icon.png";

const SCENIC_BG = "/assets/roadtrip/zone6-cta-footer/San-Diego-Beach.jpg";

// Fields checked before moving past each step
const STEP_FIELDS: Record<number, (keyof RegistrationFormData)[]> = {
  1: ["name", "email", "phone", "college", "otherCollege", "ageCheck"],
  2: ["interests"],
  3: ["tshirtSize"],
};

const STEPS = [
  { id: 1, name: "Basic Info", title: "Driver Details", hook: "First, a little about who's behind the wheel" },
  { id: 2, name: "Experience", title: "Plot Your Route", hook: "Pick the roads you want to explore this trip" },
  { id: 3, name: "Logistics", title: "Pack the Car", hook: "Swag sizes and snacks for the journey" },
  { id: 4, name: "Consent", title: "Buckle Up", hook: "A few ground rules before we hit the highway" },
];

const SUBMIT_STAGES = [
  "Fueling up the engine...",
  "Checking tire pressure...",
  "Plotting route to Orange Coast College...",
  "Ready for departure!",
];

// Smooth deceleration shared by every transition on the page
const EASE = [0.22, 1, 0.36, 1] as const;

type ApplyView = "form" | "submitted";

const inputClass =
  "w-full bg-sky-950/45 border border-sky-100/30 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-white placeholder:text-sky-100/55 outline-none transition-all duration-200 hover:border-sky-100/60 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-sky-50 mb-2";
const errorClass = "text-xs sm:text-sm text-rose-300 font-semibold mt-1.5";

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE }}
          role="alert"
          className={errorClass}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// Themed checkbox: the real input stays (visually hidden) right before this as its `peer`
function CheckMark() {
  return (
    <span
      aria-hidden
      className="mt-0.5 w-6 h-6 shrink-0 rounded-lg border-2 border-sky-50/80 bg-sky-950/40 shadow-md shadow-black/40 flex items-center justify-center transition-all duration-200 group-hover:border-amber-300 peer-checked:bg-amber-400 peer-checked:border-amber-400 peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100 peer-focus-visible:ring-4 peer-focus-visible:ring-amber-400/30"
    >
      <Check className="w-4 h-4 stroke-[3.5] text-slate-950 opacity-0 scale-50 transition-all duration-200" />
    </span>
  );
}

export function ApplyForm() {
  const [view, setView] = useState<ApplyView>("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [collegeQuery, setCollegeQuery] = useState("");
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      interests: [],
      isFirstTimer: false,
      ageCheck: false,
      codeOfConduct: false,
      dietaryRestrictions: ""
    },
    mode: "onBlur"
  });

  const selectedCollege = watch("college");
  const selectedInterests = watch("interests");
  const selectedSize = watch("tshirtSize");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCollegeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bring the stepper back into view when the step changes on a scrolled page
  const goToStep = (step: number) => {
    setCurrentStep(step);
    const top = formTopRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = async () => {
    const isValid = await trigger(STEP_FIELDS[currentStep] ?? []);
    if (isValid) goToStep(currentStep + 1);
  };

  const handleStepClick = async (stepId: number) => {
    if (stepId < currentStep) {
      goToStep(stepId);
    } else if (stepId === currentStep + 1) {
      const isValid = await trigger(STEP_FIELDS[currentStep] ?? []);
      if (isValid) goToStep(stepId);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!turnstileToken) {
      setSubmitError("Please complete the security check above the submit button.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStage(0);
    setSubmitError(null);

    // Road trip loading phases play while the registration is saved
    const playStages = (async () => {
      for (let i = 0; i < SUBMIT_STAGES.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSubmitStage(i + 1);
      }
    })();

    try {
      const [result] = await Promise.all([submitRegistration(data, turnstileToken), playStages]);
      if (result.ok) {
        setSubmittedEmail(data.email);
        setView("submitted");
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("We couldn't reach the server. Please check your connection and try again. Your answers are still here.");
    } finally {
      setIsSubmitting(false);
      // Turnstile tokens work once, so every attempt gets a fresh check.
      setTurnstileToken(null);
      setTurnstileKey(key => key + 1);
    }
  };

  // College filtering with both name and acronym search
  const filteredColleges = [
    ...CALIFORNIA_COMMUNITY_COLLEGES.filter((college) => {
      const query = collegeQuery.toLowerCase().trim();
      if (!query) return true;

      const matchesName = college.toLowerCase().includes(query);
      const acronym = college
        .split(/\s+/)
        .map((word) => word.replace(/[^a-zA-Z]/g, ""))
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toLowerCase();

      return matchesName || acronym.startsWith(query);
    }),
    OTHER_COLLEGE
  ];

  const step = STEPS[currentStep - 1];

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Scenic Background with subtle luminous blend */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <Image
          src={SCENIC_BG}
          alt="San Diego beach at sunset"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/85 pointer-events-none" />
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/40 border-b border-sky-100/25 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="w-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
            <span>Back to main site</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Image src={hackccIcon} alt="HackCC Logo" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="font-heading text-base sm:text-lg tracking-wider text-amber-400 hidden sm:inline-block">
              HACKCC 2026
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24">
        <AnimatePresence mode="wait">
          {view === "submitted" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <RegistrationReceivedCard email={submittedEmail} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Hero: Unboxed Typography */}
              <div className="text-center mb-12 sm:mb-14">
                <p className="font-serif italic text-amber-200/95 text-lg sm:text-2xl font-light tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Your road trip starts here
                </p>
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  REGISTER FOR HACKCC
                </h1>

                {/* Borderless key facts */}
                <div className="grid grid-cols-3 max-w-md mx-auto mt-9 pt-7 border-t border-white/30">
                  <div>
                    <div className="font-heading text-2xl sm:text-4xl text-amber-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">FREE</div>
                    <div className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-white mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.8)]">To Attend</div>
                  </div>
                  <div className="border-x border-white/30">
                    <div className="font-heading text-2xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">5 MIN</div>
                    <div className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-white mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.8)]">To Apply</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl sm:text-4xl text-amber-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">4</div>
                    <div className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-white mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.8)]">Quick Stops</div>
                  </div>
                </div>
              </div>

              {/* Route Progress */}
              <div ref={formTopRef} className="scroll-mt-24 mb-8">
                <ol className="flex items-start">
                  {STEPS.map((s) => {
                    const isActive = s.id === currentStep;
                    const isCompleted = s.id < currentStep;
                    const isReachable = s.id <= currentStep + 1;

                    return (
                      <li key={s.id} className="relative flex-1 flex flex-col items-center">
                        {/* Road segment leading into this stop */}
                        {s.id > 1 && (
                          <div className="absolute top-[18px] right-1/2 w-full h-1 rounded-full bg-white/35 shadow-[0_1px_6px_rgba(0,0,0,0.6)] overflow-hidden" aria-hidden>
                            <motion.div
                              className="h-full bg-amber-400 origin-left"
                              initial={false}
                              animate={{ scaleX: s.id <= currentStep ? 1 : 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleStepClick(s.id)}
                          disabled={!isReachable || isSubmitting}
                          aria-current={isActive ? "step" : undefined}
                          aria-label={`Step ${s.id}: ${s.name}`}
                          className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer disabled:cursor-default"
                        >
                          <motion.span
                            initial={false}
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 shadow-lg shadow-black/50 transition-colors duration-300 ${
                              isActive
                                ? "bg-amber-400 border-white text-slate-950"
                                : isCompleted
                                  ? "bg-sky-950 border-amber-400 text-amber-400"
                                  : "bg-sky-950 border-sky-50/80 text-white"
                            }`}
                          >
                            {isActive ? <Car className="w-5 h-5" /> : isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.id}
                          </motion.span>
                          <span
                            className={`text-xs sm:text-base font-black tracking-wide transition-colors duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.8)] ${
                              isActive ? "text-amber-300" : isCompleted ? "text-white group-hover:text-amber-300" : "text-white/90"
                            }`}
                          >
                            {s.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Form Panel */}
              <div className="relative bg-gradient-to-b from-sky-400/35 via-sky-700/45 to-sky-900/60 backdrop-blur-xl backdrop-saturate-150 border border-sky-100/40 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-sky-950/50">
                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="min-h-[380px] flex flex-col items-center justify-center text-center gap-6"
                    >
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-sky-100/25 border-t-amber-400 animate-spin" />
                        <Car className="w-10 h-10 text-amber-400" />
                      </div>
                      <h2 className="font-heading text-2xl sm:text-3xl text-white">Saving Your Seat</h2>
                      <div className="h-7">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={submitStage}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="font-serif italic text-amber-200/95 text-lg"
                          >
                            {SUBMIT_STAGES[Math.min(submitStage, SUBMIT_STAGES.length - 1)]}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                      <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-400"
                          initial={false}
                          animate={{ width: `${(submitStage / SUBMIT_STAGES.length) * 100}%` }}
                          transition={{ duration: 0.6, ease: EASE }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form-body"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      noValidate
                    >
                      {/* Step Heading */}
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`heading-${currentStep}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="mb-7 pb-6 border-b border-sky-100/25"
                        >
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
                            Stop {currentStep} of {STEPS.length}
                          </div>
                          <h2 className="font-heading text-2xl sm:text-4xl text-white tracking-wide">{step.title}</h2>
                          <p className="font-serif italic text-amber-200/90 text-base sm:text-lg font-light mt-1.5">{step.hook}</p>
                        </motion.div>
                      </AnimatePresence>

                      <div className="min-h-[300px]">
                        <AnimatePresence mode="wait" initial={false}>
                          {/* STEP 1: Basic Info */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -24 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="space-y-5"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                  <label htmlFor="apply-name" className={labelClass}>Full Name</label>
                                  <input
                                    id="apply-name"
                                    {...register("name")}
                                    type="text"
                                    autoComplete="name"
                                    maxLength={100}
                                    placeholder="Sandy Cheeks"
                                    aria-invalid={!!errors.name}
                                    className={inputClass}
                                  />
                                  <FieldError message={errors.name?.message} />
                                </div>

                                <div>
                                  <label htmlFor="apply-email" className={labelClass}>Email Address</label>
                                  <input
                                    id="apply-email"
                                    {...register("email")}
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    maxLength={254}
                                    placeholder="sandy@beach.edu"
                                    aria-invalid={!!errors.email}
                                    className={inputClass}
                                  />
                                  <FieldError message={errors.email?.message} />
                                </div>

                                <div>
                                  <label htmlFor="apply-phone" className={labelClass}>Phone Number</label>
                                  <input
                                    id="apply-phone"
                                    {...register("phone")}
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="714-555-0199"
                                    aria-invalid={!!errors.phone}
                                    className={inputClass}
                                  />
                                  <FieldError message={errors.phone?.message} />
                                </div>
                              </div>

                              {/* Community College Autocomplete */}
                              <div className="relative" ref={dropdownRef}>
                                <label htmlFor="apply-college" className={labelClass}>California Community College</label>
                                <div className="relative">
                                  <Search className="w-4 h-4 text-sky-100/75 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                  <input
                                    id="apply-college"
                                    type="text"
                                    role="combobox"
                                    aria-expanded={collegeDropdownOpen}
                                    aria-controls="college-options"
                                    autoComplete="off"
                                    placeholder="Search by name or acronym (e.g. OCC)"
                                    value={collegeDropdownOpen ? collegeQuery : (selectedCollege || "")}
                                    onChange={(e) => {
                                      setCollegeQuery(e.target.value);
                                      setCollegeDropdownOpen(true);
                                    }}
                                    onFocus={() => {
                                      setCollegeQuery("");
                                      setCollegeDropdownOpen(true);
                                    }}
                                    className={`${inputClass} pl-11 pr-11`}
                                  />
                                  {selectedCollege && !collegeDropdownOpen ? (
                                    <CheckCircle className="w-4 h-4 text-amber-400 absolute right-4 top-1/2 -translate-y-1/2" />
                                  ) : (
                                    <ChevronDown
                                      className={`w-4 h-4 text-sky-100/75 absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200 ${collegeDropdownOpen ? "rotate-180 text-amber-400" : ""}`}
                                    />
                                  )}
                                </div>

                                <AnimatePresence>
                                  {collegeDropdownOpen && (
                                    <motion.ul
                                      id="college-options"
                                      role="listbox"
                                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                      style={{ transformOrigin: "top center" }}
                                      transition={{ duration: 0.18, ease: EASE }}
                                      className="absolute left-0 right-0 top-full mt-2 max-h-64 overflow-y-auto bg-sky-900/95 backdrop-blur-xl border border-sky-100/30 rounded-2xl z-50 shadow-2xl shadow-sky-950/70 p-1.5"
                                    >
                                      {filteredColleges.map((college) => (
                                        <li key={college} role="option" aria-selected={selectedCollege === college}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setValue("college", college);
                                              setCollegeDropdownOpen(false);
                                              setCollegeQuery("");
                                              trigger("college");
                                            }}
                                            className={`w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                                              selectedCollege === college
                                                ? "bg-amber-400 text-slate-950"
                                                : college === OTHER_COLLEGE
                                                  ? "text-amber-200 hover:bg-white/10 italic"
                                                  : "text-slate-100 hover:bg-white/10 hover:text-white"
                                            }`}
                                          >
                                            <span>{college}</span>
                                            {selectedCollege === college && <Check className="w-4 h-4 stroke-[3] shrink-0" />}
                                          </button>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                                <FieldError message={errors.college?.message} />
                              </div>

                              {/* Write-in for Other College */}
                              <AnimatePresence initial={false}>
                                {selectedCollege === OTHER_COLLEGE && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="overflow-hidden"
                                  >
                                    <label htmlFor="apply-other-college" className={labelClass}>School Name</label>
                                    <input
                                      id="apply-other-college"
                                      {...register("otherCollege")}
                                      type="text"
                                      maxLength={150}
                                      placeholder="Santa Monica College"
                                      className={inputClass}
                                    />
                                    <FieldError message={errors.otherCollege?.message} />
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Age Confirmation */}
                              <div className="pt-1">
                                <label className="relative flex items-start gap-3 cursor-pointer group">
                                  <input
                                    {...register("ageCheck")}
                                    type="checkbox"
                                    className="peer sr-only"
                                  />
                                  <CheckMark />
                                  <span>
                                    <span className="block text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                                      I&apos;ll be 18 or older by Fall 2026.
                                    </span>
                                    <span className="block text-xs text-sky-100/75 mt-0.5">
                                      HackCC is an 18+ event for insurance reasons.
                                    </span>
                                  </span>
                                </label>
                                <FieldError message={errors.ageCheck?.message} />
                              </div>
                            </motion.div>
                          )}

                          {/* STEP 2: Experience */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -24 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="space-y-8"
                            >
                              <fieldset>
                                <legend className={labelClass}>Your Interests (pick at least one)</legend>
                                <div className="flex flex-wrap gap-2.5">
                                  {INTEREST_OPTIONS.map((interest) => {
                                    const isChecked = selectedInterests?.includes(interest);
                                    return (
                                      <button
                                        key={interest}
                                        type="button"
                                        aria-pressed={isChecked}
                                        onClick={() => {
                                          setValue(
                                            "interests",
                                            isChecked
                                              ? selectedInterests.filter(i => i !== interest)
                                              : [...(selectedInterests || []), interest]
                                          );
                                          trigger("interests");
                                        }}
                                        className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                                          isChecked
                                            ? "bg-amber-400 text-slate-950 shadow-lg shadow-black/30"
                                            : "bg-sky-950/40 text-sky-50 hover:text-white hover:bg-sky-800/60 border border-sky-100/30"
                                        }`}
                                      >
                                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                        <span>{interest}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                                <FieldError message={errors.interests?.message} />
                              </fieldset>

                              <label className="relative flex items-start gap-3 cursor-pointer group pt-6 border-t border-sky-100/25">
                                <input
                                  {...register("isFirstTimer")}
                                  type="checkbox"
                                  className="peer sr-only"
                                />
                                <CheckMark />
                                <span>
                                  <span className="block text-sm sm:text-base font-bold text-amber-300">
                                    This is my first hackathon!
                                  </span>
                                  <span className="block text-sm text-sky-50/90 leading-relaxed mt-1">
                                    Beginners are welcome. Over half of HackCC hackers are first-timers, and we have mentors, workshops, and beginner prizes to help you ship your first project.
                                  </span>
                                </span>
                              </label>
                            </motion.div>
                          )}

                          {/* STEP 3: Logistics */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step3"
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -24 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="space-y-8"
                            >
                              <fieldset>
                                <legend className={labelClass}>T-Shirt Size</legend>
                                <div className="flex flex-wrap gap-2.5">
                                  {TSHIRT_SIZES.map((size) => {
                                    const isSelected = selectedSize === size;
                                    return (
                                      <button
                                        key={size}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => setValue("tshirtSize", size, { shouldValidate: true })}
                                        className={`min-w-14 px-4 py-2.5 rounded-full text-sm font-black transition-all duration-200 cursor-pointer active:scale-95 ${
                                          isSelected
                                            ? "bg-amber-400 text-slate-950 shadow-lg shadow-black/30"
                                            : "bg-sky-950/40 text-sky-50 hover:text-white hover:bg-sky-800/60 border border-sky-100/30"
                                        }`}
                                      >
                                        {size}
                                      </button>
                                    );
                                  })}
                                </div>
                                <FieldError message={errors.tshirtSize?.message} />
                              </fieldset>

                              <div>
                                <div className="flex items-baseline justify-between gap-3">
                                  <label htmlFor="apply-dietary" className={labelClass}>Dietary Restrictions & Allergies</label>
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100/60 mb-2">Optional</span>
                                </div>
                                <textarea
                                  id="apply-dietary"
                                  {...register("dietaryRestrictions")}
                                  rows={3}
                                  maxLength={300}
                                  placeholder="e.g. Vegetarian, gluten-free, peanut allergy. Leave blank if none."
                                  className={`${inputClass} resize-none`}
                                />
                                <FieldError message={errors.dietaryRestrictions?.message} />
                                <p className="flex items-start gap-2 text-xs text-sky-100/75 mt-2">
                                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400/80" />
                                  <span>We cater free breakfast, lunch, dinner, boba, and midnight snacks, with allergen-safe options.</span>
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {/* STEP 4: Consent */}
                          {currentStep === 4 && (
                            <motion.div
                              key="step4"
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -24 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="space-y-6"
                            >
                              <div>
                                <h3 className="font-heading text-lg sm:text-xl text-white tracking-wide mb-3">Community Norms</h3>
                                <ul className="space-y-3 text-sm sm:text-base text-sky-50 leading-relaxed">
                                  {[
                                    "Be respectful, welcoming, and collaborative. Harassment, discrimination, or abusive behavior means immediate removal.",
                                    "Write your project during the hackathon. Bringing in existing project code isn't allowed.",
                                    "Look out for each other and keep the road trip safe, inclusive, and fun.",
                                  ].map((rule) => (
                                    <li key={rule} className="flex items-start gap-3">
                                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                      <span>{rule}</span>
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-xs text-sky-100/75 mt-4 pt-4 border-t border-sky-100/25">
                                  We store only what&apos;s on this form. Only HackCC organizers can see it, and we delete it after the event.
                                </p>
                              </div>

                              <div>
                                <label className="relative flex items-start gap-3 cursor-pointer group">
                                  <input
                                    {...register("codeOfConduct")}
                                    type="checkbox"
                                    className="peer sr-only"
                                  />
                                  <CheckMark />
                                  <span className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                                    I agree to follow the <span className="text-amber-300 font-bold">HackCC Code of Conduct</span>.
                                  </span>
                                </label>
                                <FieldError message={errors.codeOfConduct?.message} />
                              </div>

                              {/* Bot check (Cloudflare Turnstile) */}
                              <TurnstileWidget key={turnstileKey} onToken={setTurnstileToken} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <FieldError message={submitError ?? undefined} />

                      {/* Step Navigation */}
                      <div className="flex items-center justify-between gap-4 border-t border-sky-100/25 pt-6 mt-8">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={() => goToStep(currentStep - 1)}
                            className="text-sm sm:text-base text-white hover:text-amber-300 font-bold underline underline-offset-8 decoration-white/30 hover:decoration-amber-400 transition-colors cursor-pointer"
                          >
                            ← Back
                          </button>
                        ) : (
                          <span />
                        )}

                        {currentStep < STEPS.length ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-7 py-3 rounded-full text-sm sm:text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <span>Next Stop</span>
                            <span className="text-lg leading-none">→</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-7 py-3 rounded-full text-sm sm:text-base shadow-xl shadow-black/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <span>Hit the Road</span>
                            <span className="text-lg leading-none">→</span>
                          </button>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
