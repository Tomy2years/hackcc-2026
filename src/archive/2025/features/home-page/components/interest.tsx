"use client";
import { useState, useRef } from "react";
import {
  FiMail,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

export const Interest = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovering) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * 10;
    const rotateY = ((rect.width / 2 - x) / rect.width) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: "transform 0.05s ease",
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.5s ease",
    });
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmitEmail = () => {
    setSuccess(false);
    if (!email || !isValidEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setStatus("You have been added to the list!");
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitEmail();
    }
  };

  return (
    <div
      ref={containerRef}
      className="z-10 relative flex flex-col bg-black bg-opacity-20 shadow-lg backdrop-blur-sm px-7 py-8 border border-white/10 rounded-3xl w-[300px] sm:w-[400px] md:w-[450px] 2xl:w-[550px] font-mont md:text-md text-sm 2xl:text-lg text-center transition-all duration-300"
      style={{
        ...tiltStyle,
        boxShadow: isHovering
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(128, 128, 255, 0.2)"
          : "0 10px 15px -10px rgba(0, 0, 0, 0.3)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl ${
          isHovering ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      ></div>

      {isSubmitting && (
        <div className="relative flex flex-col items-center py-6">
          <div className="relative mb-4 text-hoverpurple text-4xl animate-spin">
            <FiLoader />
          </div>
          <p className="font-medium text-white">Processing...</p>
        </div>
      )}

      {!isSubmitting && !success && (
        <div className="relative animate-fadeIn">
          <p className="mb-3 font-semibold text-white/90 text-lg">
            Sign up to receive updates about the event
          </p>
          <div className="relative flex sm:flex-row flex-col items-center pt-2">
            <div className="group relative w-full sm:w-2/3">
              <div className="top-1/2 left-3 absolute text-navyblue -translate-y-1/2 transform">
                <FiMail />
              </div>
              <input
                name="email"
                className="bg-white/90 shadow-sm mb-3 sm:mb-0 px-10 py-3 rounded-lg outline-none focus:ring-2 focus:ring-hoverpurple w-full text-black transition-all duration-300 placeholder-gray-500"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="sm:ml-3 md:ml-4 w-full sm:w-1/3">
              <button
                type="button"
                className={`w-full text-nowrap text-center py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
                  hovered ? "bg-hoverpurple scale-105" : "bg-navyblue"
                } text-white shadow-md`}
                onClick={handleSubmitEmail}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span>Get Notified</span>
                <span className="ml-2">
                  <FiSend />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {!isSubmitting && success && (
        <div className="relative flex flex-col items-center py-4">
          <div className="mb-3 text-green-400 text-4xl">
            <FiCheckCircle />
          </div>
          <p className="font-medium text-white">Thank you for your interest!</p>
        </div>
      )}

      {status && !success && !isSubmitting && (
        <div className="mt-4 flex justify-center items-center text-red-300">
          <FiAlertCircle className="mr-2" />
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};
