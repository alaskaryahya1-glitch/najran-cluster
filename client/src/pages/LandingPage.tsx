import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage1 from "@assets/0B4A4B84-6228-4A64-9958-EB4C285CB04D_1767273959627.png";
import heroImage2 from "@assets/2B883A14-BC32-41DF-906B-7A5ACD6EB41E_1767273959627.png";
import heroImage3 from "@assets/BDB09527-ABFD-4A6A-8628-483C5204F311_1767273959627.png";
import heroImage4 from "@assets/E1CAF13F-A529-4321-90B2-EDEA91B5D2D9_1767273959627.png";
import heroImage5 from "@assets/Emarah_palace_stairs_in_Aba_Alsaud_historical…_1768895221719.jpg";
import heroImage6 from "@assets/Najran_fort,_Saudi_Arabia___Traditional_Mud_Najran…_1768895239595.jpg";
import heroImage7 from "@assets/Najran_Al-Ukhdud_site_-_Saudi_Arabia___Flickr…_(1)_1768895349908.jpg";
import heroImage8 from "@assets/Najran,_Saudi_Arabia_(1)_(1)_1768894401231.jpeg";
import heroImage9 from "@assets/493A91A0-64CA-44FC-873C-FF8E3057DFE7_1767273959627.png";
import heroImage10 from "@assets/__The_Megalithic_Portal_and_Megalith_Map__1768893256731.jpeg";
import heroImage11 from "@assets/385783211_781aa10eed_b_1768893295395.jpg";
import whiteLogo from "@assets/logo4_1767233326721.PNG";

const heroImages = [
  heroImage1, heroImage2, heroImage3, heroImage4,
  heroImage5, heroImage6, heroImage7, heroImage8,
  heroImage9, heroImage10, heroImage11
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background slideshow */}
      <div className="fixed inset-0 z-0">
        {heroImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
            initial={false}
            animate={{
              opacity: currentSlide === idx ? 1 : 0,
              scale: currentSlide === idx ? 1 : 1.02,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            loading="eager"
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
      </div>

      {/* Najran geometric pattern overlay */}
      <div className="fixed inset-0 z-0 najran-geometric-bg opacity-10 pointer-events-none" />

      {/* Slide dots */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <img
            src={whiteLogo}
            alt="تجمع نجران الصحي"
            className="h-36 sm:h-44 md:h-52 w-auto object-contain mx-auto"
          />
          <p className="text-white/80 text-xs md:text-sm font-janna mt-1">
            شركة الصحة القابضة
          </p>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="bg-black/30 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-10 md:px-16 md:py-14 max-w-2xl"
        >
          <div className="w-16 h-1.5 bg-[#2FAAE0] mx-auto mb-8 rounded-full" />

          <AnimatePresence mode="wait">
            <motion.p
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-janna leading-relaxed"
              style={{ direction: "rtl" }}
            >
              وماعاد احد يدخل الموقع ولا يسوي شيء
            </motion.p>
          </AnimatePresence>

          <div className="w-16 h-1.5 bg-[#2FAAE0] mx-auto mt-8 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
