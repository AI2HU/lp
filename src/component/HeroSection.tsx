"use client";

import { FaRocket } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  scrollY: number;
}

export function HeroSection({}: HeroSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to various animation values
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [135, 145]);
  
  // Background radial gradient positions
  const radial1X = useTransform(scrollYProgress, [0, 1], [50, 60]);
  const radial1Y = useTransform(scrollYProgress, [0, 1], [30, 40]);
  const radial2X = useTransform(scrollYProgress, [0, 1], [80, 70]);
  const radial2Y = useTransform(scrollYProgress, [0, 1], [70, 60]);
  
  // Floating elements positions
  const element1Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const element1X = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const element1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const element2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const element2X = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const element2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const element3Y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const element3X = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const element3Rotate = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const element4Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const element4X = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const element4Rotate = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Content positions
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const highlightY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  return (
    <motion.section 
      ref={ref}
      id="hero" 
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(${backgroundRotation}deg, 
          rgba(249, 250, 251, 1) 0%, 
          rgba(255, 255, 255, 1) 50%, 
          rgba(93, 56, 145, 0.05) 100%)`
      }}
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${radial1X}% ${radial1Y}%, 
            rgba(93, 56, 145, 0.1) 0%, 
            transparent 50%), 
            radial-gradient(circle at ${radial2X}% ${radial2Y}%, 
            rgba(93, 56, 145, 0.05) 0%, 
            transparent 50%)`
        }}
      />
      
      {/* Animated Decorative Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-accent/10 blur-xl"
        style={{
          x: element1X,
          y: element1Y,
          scale: element1Scale
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 blur-2xl"
        style={{
          x: element2X,
          y: element2Y,
          scale: element2Scale
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/5 blur-lg"
        style={{
          x: element3X,
          y: element3Y,
          rotate: element3Rotate
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-accent/8 blur-md"
        style={{
          x: element4X,
          y: element4Y,
          rotate: element4Rotate
        }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto text-center"
        style={{
          y: contentY
        }}
      >
        <motion.div 
          className="inline-flex bg-accent/10 text-accent px-4 py-2 text-sm font-semibold mb-8 items-center gap-2"
          style={{
            y: contentY
          }}
        >
          <FaRocket className="text-accent" />
          Migration code IA vers Code Humain
        </motion.div>
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-accent bg-clip-text text-transparent"
          style={{
            y: titleY,
            lineHeight: '1.1'
          }}
        >
          Code&nbsp;IA&nbsp;bloqué&nbsp;?<br />Reprenez&nbsp;le&nbsp;contrôle<br />avec&nbsp;du&nbsp;code&nbsp;maintenable
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed"
          style={{
            y: subtitleY
          }}
        >
          Sortez de l&apos;impasse du code IA bloqué grâce à notre migration unique vers un code <span className="text-accent font-semibold">plus robuste</span>, <span className="text-accent font-semibold">facile à maintenir</span> et <span className="text-accent font-semibold">que vous maîtrisez</span>
        </motion.p>
        <motion.div 
          className="bg-white/80 backdrop-blur-sm border border-accent/20 p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12"
          style={{
            y: highlightY
          }}
        >
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-accent">
            Maximisez votre ROI et prenez le contrôle total de votre technologie
          </p>
        </motion.div>
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          style={{
            y: buttonsY
          }}
        >
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-accent text-white px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Découvrir A2H
          </button>
          <button 
            onClick={() => window.open('https://calendly.com/jonathan-ai2h/30min', '_blank')}
            className="border-2 border-accent text-accent px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Debug Express
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
