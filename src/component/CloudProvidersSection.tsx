"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function CloudProvidersSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to various animation values
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [135, 140]);
  const backgroundOpacity1 = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const backgroundOpacity2 = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const backgroundOpacity3 = useTransform(scrollYProgress, [0, 1], [0.03, 0.05]);
  
  const radialOpacity1 = useTransform(scrollYProgress, [0, 1], [0.08, 0.04]);
  const radialOpacity2 = useTransform(scrollYProgress, [0, 1], [0.04, 0.02]);
  
  const element1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const element1X = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const element1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const element1Opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.2]);
  
  const element2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const element2X = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const element2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const element2Opacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.15]);
  
  const element3Y = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const element3X = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const element3Rotate = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const element3Opacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.1]);
  
  const element4Y = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const element4X = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const element4Rotate = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const element4Opacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.1]);
  
  const element5Y = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const element5X = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const element5Rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const element5Opacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.05]);
  
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const cloudProviders = [
    { name: "Vercel", image: "/images/vercel.png" },
    { name: "Netlify", image: "/images/netlify.png" },
    { name: "Digital Ocean", image: "/images/digital_ocean.png" },
    { name: "AWS", image: "/images/aws.png" },
    { name: "Scaleway", image: "/images/scaleway.png" },
    { name: "Ionos", image: "/images/ionos.png" },
    { name: "OVH", image: "/images/ovh.png" },
    { name: "Azure", image: "/images/azure.png" },
    { name: "Firebase", image: "/images/firebase.png" },
    { name: "Google Cloud", image: "/images/gc.png" },
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(${backgroundRotation}deg, 
          rgba(249, 250, 251, ${backgroundOpacity1}) 0%, 
          rgba(255, 255, 255, ${backgroundOpacity2}) 50%, 
          rgba(93, 56, 145, ${backgroundOpacity3}) 100%)`
      }}
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, 
            rgba(93, 56, 145, ${radialOpacity1}) 0%, 
            transparent 60%), 
            radial-gradient(circle at 70% 80%, 
            rgba(93, 56, 145, ${radialOpacity2}) 0%, 
            transparent 60%)`
        }}
      />
      
      {/* Animated Decorative Elements */}
      <motion.div 
        className="absolute top-10 left-16 w-16 h-16 bg-accent/8 blur-xl"
        style={{
          x: element1X,
          y: element1Y,
          scale: element1Scale,
          opacity: element1Opacity
        }}
      />
      <motion.div 
        className="absolute bottom-16 right-20 w-24 h-24 bg-accent/6 blur-2xl"
        style={{
          x: element2X,
          y: element2Y,
          scale: element2Scale,
          opacity: element2Opacity
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div 
        className="absolute top-1/4 right-1/3 w-12 h-12 bg-accent/6 blur-lg"
        style={{
          x: element3X,
          y: element3Y,
          rotate: element3Rotate,
          opacity: element3Opacity
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-accent/7 blur-md"
        style={{
          x: element4X,
          y: element4Y,
          rotate: element4Rotate,
          opacity: element4Opacity
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-accent/5 blur-sm"
        style={{
          x: element5X,
          y: element5Y,
          rotate: element5Rotate,
          opacity: element5Opacity
        }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto"
        style={{
          y: contentY,
          opacity: contentOpacity
        }}
      >
        <motion.div 
          className="text-center mb-16"
          style={{
            y: titleY,
            opacity: titleOpacity
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {t("cloudProviders.title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("cloudProviders.subtitle")}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center"
          style={{
            y: cardsY,
            opacity: cardsOpacity
          }}
        >
          {cloudProviders.map((provider) => (
            <motion.div 
              key={provider.name}
              className="flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-lg border border-accent/10"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={provider.image}
                alt={provider.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
