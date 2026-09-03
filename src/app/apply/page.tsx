"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Car, 
  Check, 
  CheckCircle, 
  Info, 
  Search, 
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CALIFORNIA_COMMUNITY_COLLEGES } from "./colleges";

// Top-Level Cloud & Illustration Imports from Archive 2026
import cloudL from "@2026-public/Purple Cloud Cluster 2.webp";
import cloudR from "@2026-public/Pink Cloud Cluster 4.webp";
import cloudCat from "@2026-public/Cat Cloud.webp";
import moon from "@2026-public/Moon.webp";
import hotAirBalloon from "@2026-public/Hot Air Balloon.webp";
import balloonCat from "@2026-public/Balloon Cat.webp";
import shootingStar from "@2026-public/Shooting Star.webp";

// ---------------------------------------------------------
// Validation Schema with Zod
// ---------------------------------------------------------
const phoneRegex = /^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const registrationSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number format (e.g. 555-555-5555)"),
  college: z.string().min(1, "Please select a community college"),
  otherCollege: z.string().optional(),
  ageCheck: z.boolean().refine(val => val === true, "You must confirm you will be 18+ years old"),

  // Experience
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  isFirstTimer: z.boolean(),

  // Logistics
  tshirtSize: z.enum(["S", "M", "L", "XL", "XXL"], {
    message: "Please select a T-shirt size"
  }),
  dietaryRestrictions: z.string().max(300, "Dietary restrictions must be under 300 characters").optional(),

  // Consent
  codeOfConduct: z.boolean().refine(val => val === true, "You must agree to the Code of Conduct")
}).refine(data => {
  if (data.college === "Other / Not Listed" && (!data.otherCollege || data.otherCollege.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Please write in your college name",
  path: ["otherCollege"]
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

// Interest Options list
const INTEREST_OPTIONS = [
  "Software Engineering",
  "AI & Machine Learning",
  "Web Development",
  "Mobile Apps",
  "Game Development",
  "Design & UX/UI",
  "Hardware & IoT",
  "Cybersecurity",
  "Product Management",
];

// Steps enumeration
const STEPS = [
  { id: 1, name: "Basic Info", icon: "🚦" },
  { id: 2, name: "Experience", icon: "🗺️" },
  { id: 3, name: "Logistics", icon: "🎒" },
  { id: 4, name: "Consent", icon: "🛣️" }
];


// This generate an Acronym from the College Names listed in the lists
const getCollegeAcronym =(college: string) => {
  return college.split(/\s+/)
  .map((word) => word [0] )
  .join("")
  .toLowerCase();
};


export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [collegeQuery, setCollegeQuery] = useState("");
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize form
  const {
    register,
    handleSubmit,
    control,
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

  // Handle Next step validation
  const handleNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["name", "email", "phone", "college", "otherCollege", "ageCheck"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["interests"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["tshirtSize"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Form submission loading stages sequence
  const submitStagesTexts = [
    "Fueling up the engine... ⛽",
    "Checking tire pressure... 🛞",
    "Plotting route to Orange Coast College... 🗺️",
    "Ready for departure! 🏎️"
  ];

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStage(0);

    // Simulate submission phases for SoCal Road Trip Vibe
    for (let i = 0; i < submitStagesTexts.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitStage(i + 1);
    }

    console.log("Registration successfully submitted data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Autocomplete filtering logic
  // const filteredCollege = [
  //   ...CALIFORNIA_COMMUNITY_COLLEGES.filter(college =>
  //     college.toLowerCase().includes(collegeQuery.toLowerCase())
  //   ),
  //   "Other / Not Listed"
  // ];


  // College filtering with both Name and Acronym search
  const filteredColleges = [
    ...CALIFORNIA_COMMUNITY_COLLEGES.filter((college) => {
      const query = collegeQuery.toLowerCase().trim();

      if (!query) return true; 

      // Normal name search
      const matchesName = college.toLowerCase().includes(query);

      // Create Acronym form the college name 
      const acronym = college
        .split(/\s+/)
        .map((word) => word.replace(/[^a-zA-Z]/g, ""))
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toLowerCase(); 

        const matchesAcronym = acronym.startsWith(query);

        return matchesName || matchesAcronym;

    }),
    "Other / Not Listed"
  ];

  return (
    <main className="min-h-screen bg-[#2D18A8] text-white font-body p-4 sm:p-6 md:p-12 relative overflow-hidden flex items-center justify-center">
      {/* Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A649E2]/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FBFA74]/20 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Floating Cloud Assets for richer visual aesthetic */}
      <div className="absolute top-4 -left-10 sm:-left-20 w-48 sm:w-72 md:w-96 h-auto opacity-70 animate-swaying pointer-events-none z-0">
        <Image src={cloudL} alt="Purple Cloud Cluster" className="w-full h-auto" />
      </div>
      <div className="absolute top-24 -right-10 sm:-right-20 w-48 sm:w-72 md:w-96 h-auto opacity-70 animate-inverseswaying pointer-events-none z-0">
        <Image src={cloudR} alt="Pink Cloud Cluster" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-10 -left-10 w-40 sm:w-60 h-auto opacity-40 animate-bobbing pointer-events-none z-0">
        <Image src={cloudCat} alt="Cat Cloud" className="w-full h-auto" />
      </div>

      {/* Retro Sky & Whimsical Illustration Assets for the Road Trip theme */}
      <div className="absolute top-10 right-10 w-24 sm:w-36 h-auto opacity-80 pointer-events-none z-0">
        <Image src={moon} alt="Cozy Cartoon Moon" className="w-full h-auto" />
      </div>
      <div className="absolute top-[18%] left-[2%] sm:left-[5%] w-20 sm:w-32 h-auto opacity-70 animate-bobbing pointer-events-none z-0">
        <Image src={hotAirBalloon} alt="Whimsical Hot Air Balloon" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-[20%] right-[2%] sm:right-[5%] w-24 sm:w-36 h-auto opacity-75 animate-swaying pointer-events-none z-0">
        <Image src={balloonCat} alt="Playful Balloon Cat" className="w-full h-auto" />
      </div>
      <div className="absolute top-12 left-1/3 w-16 sm:w-28 h-auto opacity-40 pointer-events-none z-0">
        <Image src={shootingStar} alt="Shooting Star" className="w-full h-auto" />
      </div>

      <div className="max-w-3xl w-full relative z-10 space-y-8 my-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" href="/" size="sm" className="inline-flex items-center gap-2 border-white/20">
            <ArrowLeft className="w-4 h-4 text-[#FBFA74]" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="vibrant">Registration Portal</Badge>
          </div>
        </div>

        {/* Success Postcard Animation */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <Card variant="sunset" className="relative p-6 sm:p-10 text-center overflow-hidden border-2 border-[#FBFA74]/30 shadow-2xl" hoverEffect={false}>
                {/* Visual Stamp */}
                <div className="absolute top-6 right-6 w-20 h-24 border-2 border-dashed border-white/40 rounded bg-white/10 flex flex-col items-center justify-center text-xs p-1 font-mono tracking-tight select-none">
                  <div className="text-[10px] uppercase text-[#FBFA74] font-bold">Fall 2026</div>
                  <Sparkles className="w-5 h-5 text-[#FBFA74] my-1 animate-spin" />
                  <div className="text-[8px] text-white/60">SO-CAL</div>
                </div>

                <div className="max-w-md mx-auto space-y-6 pt-6">
                  <div className="w-20 h-20 rounded-full bg-[#FBFA74] text-[#021442] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl cartoony-title mt-4">
                    Passenger Ticket Confirmed!
                  </h1>
                  <p className="text-lg text-slate-100 leading-relaxed font-medium">
                    Congratulations! Your registration for <span className="text-[#FBFA74] font-semibold">HackCC 2026</span> is complete. Welcome to the passenger seat of this road trip!
                  </p>
                  
                  <div className="bg-[#2D18A8]/60 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-left space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[#FBFA74] font-bold">
                      <Calendar className="w-4 h-4" />
                      <span>Fall 2026 • Orange Coast College</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                      <MapPin className="w-4 h-4 text-rose-400" />
                      <span>2701 Fairview Rd, Costa Mesa, CA 92626</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                      We have secured your registration details safely. Since HackCC respects hacker security, we did not collect any highly sensitive PII. Please check your email for a confirmation receipt containing Discord invitation links!
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button variant="primary" href="/" className="inline-flex items-center gap-2">
                      <span>Return to Map</span>
                      <Car className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : isSubmitting ? (
            // Full Form Loader State
            <motion.div
              key="loading-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-3xl p-8"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-[#FBFA74] animate-spin" />
                <Car className="w-12 h-12 text-[#FBFA74] animate-pulse" />
              </div>
              <h2 className="text-2xl font-heading text-[#FBFA74]">Securing Your Application</h2>
              
              <div className="h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={submitStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-slate-300 font-semibold"
                  >
                    {submitStagesTexts[submitStage] || submitStagesTexts[0]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Highway progress */}
              <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FBFA74] to-[#A649E2] transition-all duration-300"
                  style={{ width: `${(submitStage / submitStagesTexts.length) * 100}%` }}
                />
              </div>
            </motion.div>
          ) : (
            // Standard Form Container
            <motion.div
              key="form-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="space-y-6">
                
                {/* Form Title Heading */}
                <div className="text-center md:text-left space-y-2">
                  <h1 className="text-4xl sm:text-5xl cartoony-title">
                    HackCC 2026 Registration
                  </h1>
                  <p className="text-slate-200 text-sm font-medium">
                    Fast, low-barrier, and highly secure. Secure your spot on the coastal road trip!
                  </p>
                </div>

                {/* Road Trip Dotted Highway Progress Bar */}
                <div className="bg-[#2a179c]/80 border border-white/10 backdrop-blur-md rounded-2xl p-5 relative overflow-hidden">
                  
                  {/* Road Asphalt Path Background */}
                  <div className="h-1 bg-slate-700 w-full absolute top-[34px] left-0 right-0 z-0 border-t border-dashed border-slate-600/30" />
                  
                  {/* Road Trip Car Indicator Progress Line */}
                  <div 
                    className="h-1 bg-gradient-to-r from-[#FBFA74] via-rose-400 to-[#A649E2] absolute top-[34px] left-0 z-0 transition-all duration-500 ease-out" 
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  />

                  {/* Little car driver moving along the highway */}
                  <div 
                    className="absolute top-[18px] z-10 transition-all duration-500 ease-out hidden sm:block"
                    style={{ left: `calc(${((currentStep - 1) / 3) * 90}% + 20px)` }}
                  >
                    <div className="text-xl animate-bounce">🚗</div>
                  </div>

                  {/* Steps Icons & Text Layout */}
                  <div className="grid grid-cols-4 relative z-20">
                    {STEPS.map((step) => {
                      const isActive = step.id === currentStep;
                      const isCompleted = step.id < currentStep;
                      
                      return (
                        <button
                          type="button"
                          key={step.id}
                          onClick={async () => {
                            // Only allow navigating back or to steps already completed
                            if (step.id < currentStep) {
                              setCurrentStep(step.id);
                            } else if (step.id > currentStep) {
                              // If trying to skip forward, trigger validation on current step
                              let fieldsToValidate: (keyof RegistrationFormData)[] = [];
                              if (currentStep === 1) fieldsToValidate = ["name", "email", "phone", "college", "otherCollege", "ageCheck"];
                              else if (currentStep === 2) fieldsToValidate = ["interests"];
                              else if (currentStep === 3) fieldsToValidate = ["tshirtSize"];
                              
                              const isValid = await trigger(fieldsToValidate);
                              if (isValid && step.id === currentStep + 1) {
                                setCurrentStep(step.id);
                              }
                            }
                          }}
                          className="flex flex-col items-center text-center focus:outline-none group cursor-pointer"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                            isActive 
                              ? "bg-[#FBFA74] text-[#021442] border-[#FBFA74] scale-110 shadow-lg"
                              : isCompleted
                                ? "bg-[#A649E2] text-white border-[#A649E2] shadow-sm"
                                : "bg-slate-900/60 text-slate-400 border-slate-700"
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                          </div>
                          
                          <span className={`text-[10px] sm:text-xs font-bold mt-2 tracking-wide transition-all ${
                            isActive ? "text-[#FBFA74]" : isCompleted ? "text-purple-300" : "text-slate-400"
                          }`}>
                            {step.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Body Frame */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Step Panels Container */}
                  <div className="bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 min-h-[350px] flex flex-col justify-between">
                    
                    <AnimatePresence mode="wait">
                      {/* STEP 1: Pit Stop - Basic Info */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="border-b border-white/10 pb-3 flex items-center gap-2 mb-4">
                            <span className="text-2xl">🚦</span>
                            <div>
                              <h2 className="text-xl font-heading text-white">Basic Info: Driver Details</h2>
                              <p className="text-xs text-slate-300">Let's gather some basic parameters to identify your application.</p>
                            </div>
                          </div>

                          {/* Full Name */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-200">Full Name</label>
                            <input
                              {...register("name")}
                              type="text"
                              placeholder="Sandy Cheeks"
                              className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                            />
                            {errors.name && (
                              <p className="text-xs text-rose-400 font-semibold">{errors.name.message}</p>
                            )}
                          </div>

                          {/* Contact Email & Phone Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">Email Address</label>
                              <input
                                {...register("email")}
                                type="email"
                                placeholder="sandy@beach.edu"
                                className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                              />
                              {errors.email && (
                                <p className="text-xs text-rose-400 font-semibold">{errors.email.message}</p>
                              )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">Phone Number</label>
                              <input
                                {...register("phone")}
                                type="tel"
                                placeholder="714-555-0199"
                                className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                              />
                              {errors.phone && (
                                <p className="text-xs text-rose-400 font-semibold">{errors.phone.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Community College Autocomplete Selector */}
                          <div className="space-y-1 relative" ref={dropdownRef}>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-200">California Community College</label>
                            
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search & Select College..."
                                value={collegeDropdownOpen ? collegeQuery : (selectedCollege || "")}
                                onChange={(e) => {
                                  setCollegeQuery(e.target.value);
                                  setCollegeDropdownOpen(true);
                                }}
                                onFocus={() => {
                                  setCollegeQuery("");
                                  setCollegeDropdownOpen(true);
                                }}
                                className="w-full bg-slate-950/80 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                              />
                              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                              
                              {selectedCollege && !collegeDropdownOpen && (
                                <CheckCircle className="w-4 h-4 text-green-400 absolute right-3.5 top-3.5" />
                              )}
                            </div>

                            {errors.college && (
                              <p className="text-xs text-rose-400 font-semibold">{errors.college.message}</p>
                            )}

                            {/* Dropdown panel */}
                            {collegeDropdownOpen && (
                              <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-slate-950 border border-white/20 rounded-xl z-50 shadow-2xl p-1 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10">
                                {filteredColleges.length > 0 ? (
                                  filteredColleges.map((college, idx) => (
                                    <button
                                      type="button"
                                      key={idx}
                                      onClick={() => {
                                        setValue("college", college);
                                        setCollegeDropdownOpen(false);
                                        setCollegeQuery("");
                                        trigger("college");
                                      }}
                                      className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                                        selectedCollege === college 
                                          ? "bg-[#FBFA74] text-[#021442]" 
                                          : "hover:bg-white/10 text-white"
                                      }`}
                                    >
                                      <span>{college}</span>
                                      {selectedCollege === college && <Check className="w-4 h-4 stroke-[3]" />}
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-3 text-xs text-slate-400 text-center font-medium">
                                    No colleges match. Select "Other / Not Listed" to enter manually.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Fallback Manual write-in for Other College */}
                          {selectedCollege === "Other / Not Listed" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-1 overflow-hidden"
                            >
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">Please Specify School Name</label>
                              <input
                                {...register("otherCollege")}
                                type="text"
                                placeholder="Santa Monica College"
                                className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                              />
                              {errors.otherCollege && (
                                <p className="text-xs text-rose-400 font-semibold">{errors.otherCollege.message}</p>
                              )}
                            </motion.div>
                          )}

                          {/* Age Verification (18+ Confirm checkbox) */}
                          <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input
                                {...register("ageCheck")}
                                type="checkbox"
                                className="w-5 h-5 rounded border-white/20 bg-slate-950/80 accent-[#FBFA74] text-navyblue cursor-pointer mt-0.5"
                              />
                              <div className="space-y-0.5">
                                <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition">
                                  I confirm that I will be 18 years of age or older by Fall 2026.
                                </span>
                                <p className="text-[10px] text-slate-400">
                                  HackCC is an 18+ event for compliance and insurance guidelines.
                                </p>
                              </div>
                            </label>
                            {errors.ageCheck && (
                              <p className="text-xs text-rose-400 font-semibold mt-1">{errors.ageCheck.message}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Route - Experience */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="border-b border-white/10 pb-3 flex items-center gap-2 mb-4">
                            <span className="text-2xl">🗺️</span>
                            <div>
                              <h2 className="text-xl font-heading text-white">Hacking Experience</h2>
                              <p className="text-xs text-slate-300">Choose the topics you're interested in exploring on this hacking trip.</p>
                            </div>
                          </div>

                          {/* Checklist of Interests */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-200 block mb-1">
                              Select Your Interests (Choose at least one)
                            </label>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {INTEREST_OPTIONS.map((interest) => {
                                const isChecked = selectedInterests?.includes(interest);
                                return (
                                  <label
                                    key={interest}
                                    className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-3 transition-all select-none ${
                                      isChecked 
                                        ? "bg-[#6950D5]/50 border-[#FBFA74] text-white" 
                                        : "bg-slate-950/40 border-white/10 hover:border-white/30 text-slate-300 hover:text-white"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      value={interest}
                                      checked={isChecked}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (isChecked) {
                                          setValue("interests", selectedInterests.filter(i => i !== val));
                                        } else {
                                          setValue("interests", [...(selectedInterests || []), val]);
                                        }
                                        trigger("interests");
                                      }}
                                      className="hidden"
                                    />
                                    <div className={`w-4 h-4 rounded flex items-center justify-center transition border ${
                                      isChecked ? "bg-[#FBFA74] border-[#FBFA74]" : "border-slate-500"
                                    }`}>
                                      {isChecked && <Check className="w-3.5 h-3.5 text-[#021442] stroke-[3]" />}
                                    </div>
                                    <span>{interest}</span>
                                  </label>
                                );
                              })}
                            </div>
                            {errors.interests && (
                              <p className="text-xs text-rose-400 font-semibold mt-1">{errors.interests.message}</p>
                            )}
                          </div>

                          {/* First-Timer Checkbox */}
                          <div className="pt-4 border-t border-white/10 mt-6">
                            <label className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer group hover:bg-white/10 transition">
                              <input
                                {...register("isFirstTimer")}
                                type="checkbox"
                                className="w-5 h-5 rounded border-white/20 bg-slate-950/80 accent-[#FBFA74] text-navyblue cursor-pointer mt-0.5"
                              />
                              <div className="space-y-1">
                                <span className="text-sm font-bold text-[#FBFA74] flex items-center gap-1.5">
                                  <span>Yes, this is my first hackathon! 🎒</span>
                                </span>
                                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                  We welcome beginners with open arms! Over 50% of HackCC participants are first-timers. We provide mentorship, design workshops, and beginner prizes to help you build your first project!
                                </p>
                              </div>
                            </label>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: Cargo - Logistics */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="border-b border-white/10 pb-3 flex items-center gap-2 mb-4">
                            <span className="text-2xl">🎒</span>
                            <div>
                              <h2 className="text-xl font-heading text-white">Logistics & Preferences</h2>
                              <p className="text-xs text-slate-300">Specify your food preferences and swag sizes for the journey.</p>
                            </div>
                          </div>

                          {/* T-Shirt Size */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-200">T-Shirt Size</label>
                            <select
                              {...register("tshirtSize")}
                              className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition"
                            >
                              <option value="" className="text-slate-500 bg-slate-950">Select Size</option>
                              <option value="S" className="bg-slate-950">Small (S)</option>
                              <option value="M" className="bg-slate-950">Medium (M)</option>
                              <option value="L" className="bg-slate-950">Large (L)</option>
                              <option value="XL" className="bg-slate-950">X-Large (XL)</option>
                              <option value="XXL" className="bg-slate-950">XX-Large (XXL)</option>
                            </select>
                            {errors.tshirtSize && (
                              <p className="text-xs text-rose-400 font-semibold">{errors.tshirtSize.message}</p>
                            )}
                          </div>

                          {/* Dietary Restrictions */}
                          <div className="space-y-1 pt-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-200">Dietary Restrictions & Allergies</label>
                              <span className="text-[10px] text-slate-400 font-semibold uppercase">Optional</span>
                            </div>
                            <textarea
                              {...register("dietaryRestrictions")}
                              rows={3}
                              placeholder="e.g. Vegetarian, Gluten-Free, Peanut Allergy (Leave blank if none)"
                              className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FBFA74] transition resize-none"
                            />
                            {errors.dietaryRestrictions && (
                              <p className="text-xs text-rose-400 font-semibold">{errors.dietaryRestrictions.message}</p>
                            )}
                            <div className="flex items-start gap-1.5 text-[10px] text-slate-400 mt-1">
                              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span>We cater free breakfast, lunch, dinner, boba, and midnight snacks, and do our best to provide allergen-safe alternatives.</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: Fasten Seatbelts - Consent */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -30, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div className="border-b border-white/10 pb-3 flex items-center gap-2 mb-4">
                            <span className="text-2xl">🛣️</span>
                            <div>
                              <h2 className="text-xl font-heading text-white">Consent & Guidelines</h2>
                              <p className="text-xs text-slate-300">Review Code of Conduct guidelines to ensure a safe, welcoming experience for all.</p>
                            </div>
                          </div>

                          <div className="bg-slate-950/60 rounded-2xl p-5 border border-white/10 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                            <p className="font-semibold text-white text-sm">🎒 HackCC Community Norms:</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>Be respectful, welcoming, and collaborative. Any harassment, discrimination, or abusive behavior will result in immediate ejection.</li>
                              <li>Respect intellectual property; make sure all project code is written fresh during the hackathon. Existing project code imports are prohibited.</li>
                              <li>Prioritize hacker safety and maintain the positive, inclusive, and fun road trip vibe!</li>
                            </ul>
                            <p className="text-[11px] text-slate-400 border-t border-white/5 pt-3">
                              By registering, you acknowledge that your contact details will be stored securely. Because HackCC respects hacker security, we only record minimal PII, keeping your files safe.
                            </p>
                          </div>

                          {/* Code of Conduct Checkbox */}
                          <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input
                                {...register("codeOfConduct")}
                                type="checkbox"
                                className="w-5 h-5 rounded border-white/20 bg-slate-950/80 accent-[#FBFA74] text-navyblue cursor-pointer mt-0.5"
                              />
                              <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition">
                                I agree to follow the <span className="text-[#FBFA74] hover:underline font-bold">HackCC Code of Conduct</span>.
                              </span>
                            </label>
                            {errors.codeOfConduct && (
                              <p className="text-xs text-rose-400 font-semibold mt-1">{errors.codeOfConduct.message}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step Action Buttons Footer inside Panel */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="btn-secondary text-xs sm:text-sm py-2 px-5 cursor-pointer inline-flex items-center gap-1 border-white/20"
                        >
                          <span>Back</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="btn-primary text-xs sm:text-sm py-2 px-5 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <span>Next Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-accent text-xs sm:text-sm py-2.5 px-6 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <span>Submit Application</span>
                          <Sparkles className="w-4 h-4 text-[#FBFA74] animate-spin" />
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
