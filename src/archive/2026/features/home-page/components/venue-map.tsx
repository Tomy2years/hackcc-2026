"use client";

import Image from "next/image";
import { useState } from "react";

interface VenueInfo {
    id: string;
    name: string;
    location: string;
    date: string;
    addressLine1: string;
    addressLine2: string;
    mapQuery: string;
    embedUrl: string;
    imageSrc: string;
    imageAlt: string;
}

export default function VenueMap() {
    function getVenues(): VenueInfo[] {
        // Keep venue copy in one place so the toggle buttons, card details, and map embed stay synchronized.
        return [
            {
                id: "hackecc",
                name: "HackECC",
                location: "East Dining Hall",
                date: "May 3rd",
                addressLine1: "El Camino College",
                addressLine2: "Torrance, CA",
                mapQuery: "East Dining Hall El Camino College Torrance CA",
                embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-118.3383%2C33.8788%2C-118.3183%2C33.8988&layer=mapnik&marker=33.8888%2C-118.3283",
                imageSrc: "https://www.elcamino.edu/civic-center/images/EDR03.jpg",
                imageAlt: "East Dining Hall at El Camino College",
            },
            {
                id: "hacksmc",
                name: "HackSMC",
                location: "Bundy Campus",
                date: "May 9th - May 10th",
                addressLine1: "Santa Monica College",
                addressLine2: "Bundy Campus, Santa Monica, CA",
                mapQuery: "Santa Monica College Bundy Campus Santa Monica CA",
                embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-118.4626%2C34.0164%2C-118.4426%2C34.0364&layer=mapnik&marker=34.0264%2C-118.4526",
                imageSrc: "https://www.smc.edu/images/hero-images/_campus-hero-images/bundy-06.jpg",
                imageAlt: "Bundy Campus at Santa Monica College",
            },
        ];
    }

    function getDirectionsUrl(mapQuery: string): string {
        return `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;
    }

    const venues = getVenues();
    const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0].id);
    const selectedVenue = venues.find((venue) => venue.id === selectedVenueId) ?? venues[0];

    return (
        <section className="relative pt-20 pb-28 w-full h-auto overflow-visible">
            <div className="absolute inset-0">
                {/* Swap the interactive map background with the selected campus so the section reinforces the active venue card. */}
                <iframe
                    title={`${selectedVenue.name} campus map`}
                    src={selectedVenue.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[20%] contrast-110"
                ></iframe>
                <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                <div className="top-0 absolute inset-x-0 h-40 sm:h-56 bg-gradient-to-b from-bgpurple/90 via-bgpurple/40 to-transparent pointer-events-none"></div>
                <div className="bottom-0 absolute inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-bgpurple/88 via-bgpurple/40 to-transparent pointer-events-none"></div>
            </div>
            <div className="z-20 relative mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
                <div className="bg-white/95 shadow-2xl p-6 sm:p-8 rounded-3xl w-full max-w-xl">
                    <div className="mb-5 font-bagel text-hoverpurple text-4xl sm:text-5xl">Venue</div>
                    <div className="flex flex-wrap gap-2 mb-5">
                        {venues.map((venue) => (
                            <button
                                key={venue.id}
                                type="button"
                                onClick={() => setSelectedVenueId(venue.id)}
                                className={`px-4 py-2 rounded-full font-mont text-sm sm:text-base transition-colors ${
                                    venue.id === selectedVenue.id
                                        ? "bg-[#EEF06C] text-[#5428A8] font-semibold"
                                        : "bg-[#EDE8F8] text-[#5B3D90] hover:bg-[#E3DAF5]"
                                }`}
                            >
                                {venue.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative mb-6 rounded-2xl border border-[#e4d5ff] w-full h-44 sm:h-52 overflow-hidden">
                        <Image
                            src={selectedVenue.imageSrc}
                            alt={selectedVenue.imageAlt}
                            // These previews come from campus-hosted image URLs, so we render them without Next optimization.
                            unoptimized
                            fill
                            className="object-cover"
                            sizes="(min-width: 640px) 36rem, 100vw"
                        />
                    </div>

                    <h2 className="mb-1 font-bagel text-hoverpurple text-4xl sm:text-5xl">{selectedVenue.name}</h2>
                    <p className="font-mont text-gray-700 text-2xl">{selectedVenue.location}</p>
                    <p className="mb-5 font-bagel text-gray-700 text-3xl">{selectedVenue.date}</p>
                    <p className="font-mont text-gray-700 text-lg">{selectedVenue.addressLine1}</p>
                    <p className="mb-6 font-mont text-gray-700 text-lg">{selectedVenue.addressLine2}</p>

                    <a
                        href={getDirectionsUrl(selectedVenue.mapQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center bg-[#EEF06C] hover:bg-[#F5F783] px-7 py-3 rounded-full font-mont font-semibold text-[#5428A8] text-xl leading-none transition-colors"
                    >
                        Get Directions +
                    </a>
                </div>
            </div>
            <div className="bottom-0 z-30 absolute inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#c86bff]/30 to-bgpurple/90 pointer-events-none"></div>
            <div className="-bottom-12 z-30 absolute inset-x-0 h-24 sm:h-32 bg-[#d66dff]/28 blur-3xl pointer-events-none"></div>
        </section>
    );
}
