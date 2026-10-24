import Image from "next/image";
import MiracostaCollegeImg from "@2025-public/miracosta-college.jpg";

export default function VenueMap() {
    return (
        <div className="relative bg-gradient-to-b from-bgpurple to-bgpurple py-20 w-full h-auto overflow-hidden">
            <div className="relative mx-auto w-full max-w-full">
                
                <div className="flex lg:flex-row flex-col justify-center lg:justify-start items-center gap-0 lg:gap-12">
                    {/* Info Card */}
                    <div className="z-20 flex-shrink-0 bg-white shadow-xl mx-4 sm:mx-8 mb-8 md:mb-0 lg:ml-20 p-6 sm:p-8 rounded-2xl w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] lg:w-full max-w-sm lg:max-w-lg">
                        <div className="font-bagel font-semibold text-4xl sm:text-5xl">Venue</div>
                        <div className="mt-4 mb-6 rounded-lg w-full h-40 sm:h-48 overflow-hidden">
                            <Image 
                                src={MiracostaCollegeImg} 
                                alt="MiraCosta College"
                                width={500}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <h2 className="mb-2 font-bagel text-hoverpurple text-2xl sm:text-3xl">MiraCosta College</h2>
                        <p className="mb-1 font-mont text-gray-700 text-base sm:text-lg">One Barnard Drive</p>
                        <p className="mb-6 font-mont text-gray-700 text-base sm:text-lg">Oceanside, CA 92056</p>
                        
                        <div className="flex gap-4">
                            <a 
                                href="https://maps.google.com/?q=MiraCosta+College+Oceanside" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mont text-hoverpurple hover:text-richpurple text-sm sm:text-base underline transition-colors"
                            >
                                Get Directions +
                            </a>
                        </div>
                    </div>
                    
                  {/* Map - Full width on mobile, positioned absolutely on desktop */}
                  <div className="lg:right-0 lg:left-0 z-10 lg:absolute relative w-full h-[500px] lg:h-[600px]">
                      <iframe
                          title="MiraCosta College Oceanside Map"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=-117.3165%2C33.1808%2C-117.2965%2C33.2008&layer=mapnik&marker=33.1908%2C-117.3065" 
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="grayscale-[20%] contrast-110 map-fade-mask rounded-2xl lg:rounded-none"
                      ></iframe>
                  </div>


                </div>
            </div>
        </div>
    );
}