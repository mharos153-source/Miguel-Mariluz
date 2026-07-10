import React, { useEffect, useRef } from 'react';
import videoFile from '@/assets/GALERIAS/Video/Miguel&Mariluz.mp4';

export default function VideoSeccion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log("Video play failed or interrupted:", err);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the video container is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="px-6 pt-4 pb-1 max-w-md mx-auto"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-serenity-light shadow-[0_12px_28px_rgba(137,166,200,0.15)] bg-slate-100 transition-all duration-1000 ease-in-out">
        <video
          ref={videoRef}
          src={videoFile}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle decorative overlay to match wedding look and feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Elegant, fine, and soft caption representing the video */}
      <p 
        className="text-[14px] md:text-[15px] text-navy-royal/80 leading-[1.05] mt-3.5 max-w-[280px] sm:max-w-xs mx-auto text-center px-2 select-none antialiased"
        style={{ fontFamily: "'Nuptial Script', 'Pinyon Script', cursive", fontWeight: 400 }}
      >
        "Juntos ante Dios, prometemos amarnos, honrarnos y caminar unidos para siempre."
      </p>
    </div>
  );
}