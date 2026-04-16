import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from './data/weddingData';
import { translations } from './translations';
import { Heart, MapPin, Calendar, Users, ChevronDown, ChevronUp, X, Languages, Volume2, VolumeX } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Music } from 'lucide-react';

// Import songs
import song1 from './audio/song2.mp3';
import song2 from './audio/song1.mp3';

const songs = [
  { id: 1, name: 'Song 1', src: song1 },
  { id: 2, name: 'Song 2', src: song2 },
];

// --- Components ---

const TraditionalLoader = () => (
  <motion.div
    className="fixed inset-0 z-[200] bg-[#fdfbf7] flex flex-col items-center justify-center"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="relative w-32 h-32 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20"
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#d4af37" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#d4af37" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Heart className="w-10 h-10 text-[#d4af37]" fill="#d4af37" />
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 font-elegant text-[#d4af37] tracking-[0.3em] text-sm uppercase"
    >
      Shubham & Rutuja
    </motion.p>
  </motion.div>
);

const FallingPetals = () => {
  const petals = Array.from({ length: 20 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {petals.map((_, i) => {
        const isGold = i % 3 === 0;
        return (
          <motion.div
            key={i}
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            animate={{
              top: '110%',
              left: `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`,
              rotate: Math.random() * 720,
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C12 2 15 8 18 11C21 14 20 19 16 21C12 23 8 21 4 19C0 17 1 12 4 9C7 6 12 2 12 2Z"
                fill={isGold ? "#d4af37" : "#fff9e6"}
                fillOpacity={isGold ? "0.3" : "0.7"}
                stroke={isGold ? "#d4af37" : "#d4af37"}
                strokeWidth="0.1"
                strokeOpacity="0.4"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

const ClickEffect = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e.touches[0]?.clientX || 0) : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e.touches[0]?.clientY || 0) : (e as MouseEvent).clientY;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY
      };

      setRipples(prev => [...prev.slice(-10), newRipple]); // Keep only last 10 ripple groups for performance
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    };

    window.addEventListener('mousedown', handleClick, { passive: true });
    window.addEventListener('touchstart', handleClick, { passive: true });
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
      <AnimatePresence>
        {ripples.map(ripple => (
          <div key={ripple.id} className="absolute overflow-visible" style={{ left: ripple.x, top: ripple.y }}>
            {/* Three concentric rings */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={`${ripple.id}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.25, 0],
                  scale: [0, 4 + i]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + i * 0.2,
                  delay: i * 0.1,
                  ease: [0.1, 0.2, 0.3, 1]
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/20 shadow-[0_0_5px_rgba(212,175,55,0.05)]"
                style={{
                  width: 40,
                  height: 40,
                  background: 'radial-gradient(circle, rgba(212,175,55,0.02) 0%, transparent 70%)'
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const InvitationCard = ({ onOpen, t, lang }: { onOpen: () => void; t: any; lang: string; key?: string }) => {
  const groomName = lang === 'mr' ? weddingData.couple.groomMr : weddingData.couple.groom;
  const brideName = lang === 'mr' ? weddingData.couple.brideMr : weddingData.couple.bride;

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-[#fdfbf7] p-8 text-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, rotate: 5, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

      <motion.div
        className="border-2 border-[#d4af37]/30 p-12 rounded-sm relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fdfbf7] px-4">
          <Heart className="w-6 h-6 text-[#d4af37]" fill="#d4af37" />
        </div>

        <h2 className="font-elegant text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-6">{t.weddingOf}</h2>
        <h1 className="font-serif text-4xl mb-4 text-neutral-800 leading-tight">
          {groomName}<br />
          <span className="text-2xl font-elegant italic text-[#d4af37]">&</span><br />
          {brideName}
        </h1>
        <div className="space-y-1">
          <p className="font-elegant text-lg italic text-neutral-500">{t.saveTheDate}</p>
          <p className="font-serif text-xl text-neutral-700 tracking-wider">30 . 04 . 2026</p>
        </div>
      </motion.div>

      <motion.button
        onClick={onOpen}
        className="mt-16 w-24 h-24 rounded-full bg-[#d4af37] shadow-xl flex items-center justify-center text-white relative group active:scale-95 transition-transform"
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.8
        }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        <div className="text-xs font-elegant uppercase tracking-widest font-bold">{t.open}</div>

        {/* Wax Seal Texture Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      </motion.button>

      <p className="mt-8 text-xs font-sans uppercase tracking-[0.2em] text-neutral-400">{t.tapToUnlock}</p>
    </motion.div>
  );
};

const HeroScreen = ({ t, hasVisited, lang }: { t: any; hasVisited: boolean; lang: string }) => {
  const groomName = lang === 'mr' ? weddingData.couple.groomMr : weddingData.couple.groom;
  const brideName = lang === 'mr' ? weddingData.couple.brideMr : weddingData.couple.bride;

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-white p-8 text-center"
      initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        initial={hasVisited ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: hasVisited ? 0 : 0.2, duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-8" />
        <h1 className="font-serif text-5xl mb-4 text-neutral-800 leading-tight">
          {groomName}<br />
          <span className="text-3xl font-elegant italic text-[#d4af37]">&</span><br />
          {brideName}
        </h1>
        <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mt-8" />
      </motion.div>
      <motion.p
        className="font-elegant text-xl text-neutral-500 tracking-wide"
        initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: hasVisited ? 0 : 0.6 }}
      >
        {t.gettingMarried}
      </motion.p>
    </motion.div>
  );
};

const LocationScreen = ({ t, hasVisited }: { t: any; hasVisited: boolean }) => (
  <motion.div
    className="w-full h-full relative flex flex-col items-center justify-end pb-20 text-center text-white bg-neutral-800"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.img
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        src={weddingData.location.image}
        className="w-full h-full object-cover object-[70%_center] brightness-75"
        referrerPolicy="no-referrer"
        alt="Wedding Venue"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>

    <motion.div
      className="relative z-10 px-8"
      initial={hasVisited ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MapPin className="w-8 h-8 mx-auto mb-4 text-[#d4af37]" />
      <h2 className="font-serif text-3xl mb-2">{t.locations.venue}</h2>
      <p className="font-elegant text-lg text-white/80 mb-4">{t.locations.city}</p>
      <motion.a
        href="https://maps.app.goo.gl/3VdKW4L4PqTVDmyW7"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#d4af37] text-white px-8 py-3 rounded-full font-elegant font-bold text-sm tracking-widest shadow-lg hover:bg-[#b8962d] transition-colors mt-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MapPin className="w-4 h-4" />
        {t.clickHere}
      </motion.a>
    </motion.div>
  </motion.div>
);

const CountdownScreen = ({ t, hasVisited }: { t: any; hasVisited: boolean }) => {
  const calculateTimeLeft = () => {
    const target = new Date(weddingData.date).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-[#f9f8f6] p-8 text-center"
      initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: hasVisited ? 0 : 0.1 }}
        className="font-elegant text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-12"
      >
        {t.countdownTitle}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-[280px]">
        {[
          { label: t.days, value: timeLeft.days },
          { label: t.hours, value: timeLeft.hours },
          { label: t.mins, value: timeLeft.minutes },
          { label: t.secs, value: timeLeft.seconds }
        ].map((item, i) => {
          const valStr = item.value.toString().padStart(2, '0');
          const digits = valStr.split('');

          return (
            <motion.div
              key={i}
              className="bg-white w-28 h-28 rounded-2xl shadow-sm flex flex-col items-center justify-center border border-neutral-100 overflow-hidden"
              initial={hasVisited ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: hasVisited ? 0 : 0.2 + (i * 0.1), type: 'spring', damping: 15 }}
            >
              <div className="flex items-baseline">
                {digits.map((digit, idx) => (
                  <div key={idx} className="relative h-10 w-5 flex justify-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={digit}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-3xl text-neutral-800 absolute"
                      >
                        {digit}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">{item.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white"
        initial={hasVisited ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: hasVisited ? 0 : 1 }}
      >
        <Calendar className="w-5 h-5 mx-auto mb-2 text-[#d4af37]" />
        <p className="font-serif text-lg text-neutral-700">April 30, 2026</p>
      </motion.div>
    </motion.div>
  );
};

const TypewriterText = ({ text, hasVisited, delayOffset = 0 }: { text: string; hasVisited: boolean; delayOffset?: number }) => {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap justify-center gap-x-1">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: hasVisited ? 0 : delayOffset + (i * 0.08),
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#d4af37]/10"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            y: "-10%",
            rotate: Math.random() * 360 + 360
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          <Heart fill="currentColor" size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

const MessageScreen = ({ t, hasVisited }: { t: any; hasVisited: boolean }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-center bg-white p-10 text-center relative"
    initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <FloatingHearts />

    <motion.div
      className="relative z-10"
      initial={hasVisited ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedHeart className="w-8 h-8 mx-auto mb-8 text-[#d4af37]/60" hasVisited={hasVisited} />
      <div className="font-elegant text-xl leading-relaxed text-neutral-700 italic space-y-4">
        {Array.isArray(t.message) ? (
          t.message.map((line: string, i: number) => (
            <TypewriterText
              key={i}
              text={i === 0 ? `"${line}` : (i === t.message.length - 1 ? `${line}"` : line)}
              hasVisited={hasVisited}
              delayOffset={i * 1.5} // Stagger lines by 1.5 seconds
            />
          ))
        ) : (
          <TypewriterText text={`"${t.message}"`} hasVisited={hasVisited} />
        )}
      </div>
      <div className="mt-10 h-[1px] w-12 bg-[#d4af37]/30 mx-auto" />
    </motion.div>
  </motion.div>
);

const EventsScreen = ({ t, hasVisited }: { t: any; hasVisited: boolean }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-center bg-[#fdfbf7] p-8"
    initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h2 className="font-serif text-3xl mb-8 text-neutral-800 text-center">{t.weddingEvents}</h2>

    <div className="w-full space-y-3">
      {weddingData.events.map((event, i) => {
        const IconComponent = (Icons as any)[event.icon] || Heart;
        // Map event names to translations
        const eventName = event.name.toLowerCase().includes('haldi') ? t.events.haldi :
          event.name.toLowerCase().includes('saptpadi') ? t.events.saptpadi :
            event.name.toLowerCase().includes('lunch') ? t.events.lunch :
              t.events.wedding;
        const eventLoc = event.location.includes('Ashirwad') ? t.locations.haldiLoc : t.locations.venue;

        return (
          <motion.div
            key={event.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 flex items-center gap-4"
            initial={hasVisited ? { x: 0, opacity: 1 } : { x: -70 + (i * 10), opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: hasVisited ? 0 : 0.3 + (i * 0.2),
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            <div className="w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#d4af37]">
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-base text-neutral-800">{eventName}</h3>
              <p className="text-[10px] text-neutral-500 font-sans uppercase tracking-wider">{event.date} • {event.time}</p>
              <p className="text-[10px] text-[#d4af37] mt-0.5 italic">{eventLoc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const UniversalPrayerScreen = ({ t, hasVisited }: { t: any; hasVisited: boolean }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-center bg-[#fdfbf7] p-10 text-center relative overflow-hidden"
    initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {/* Premium Parchment Texture Background */}
    <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-0" style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`,
    }} />

    {/* Corner Floral Accents */}
    <div className="absolute top-4 left-4 w-24 h-24 opacity-20 pointer-events-none z-10">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
        <path d="M0 0C50 0 100 50 100 100M0 20C40 20 80 60 80 100M0 40C30 40 60 70 60 100" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
    </div>
    <div className="absolute bottom-4 right-4 w-24 h-24 opacity-20 pointer-events-none z-10 rotate-180">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
        <path d="M0 0C50 0 100 50 100 100M0 20C40 20 80 60 80 100M0 40C30 40 60 70 60 100" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#d4af37]/10 rounded-tl-3xl -translate-x-10 -translate-y-10 z-10" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#d4af37]/10 rounded-br-3xl translate-x-10 translate-y-10 z-10" />

    <motion.div
      className="flex flex-col items-center relative z-10"
      initial={hasVisited ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="w-8 h-[1px] bg-[#d4af37]/20" />
        <div className="w-2 h-2 rounded-full bg-[#d4af37]/40" />
        <div className="w-8 h-[1px] bg-[#d4af37]/20" />
      </div>

      <h2 className="font-serif text-3xl text-neutral-800 tracking-tight mb-8 font-bold">{t.prayerTitle}</h2>

      <div className="font-elegant text-xl leading-relaxed text-neutral-700 italic tracking-wide space-y-4">
        {t.prayerLines.map((line: string, idx: number) => (
          <TypewriterText
            key={idx}
            text={line}
            hasVisited={hasVisited}
            delayOffset={0.5 + (idx * 1.5)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="w-8 h-[1px] bg-[#d4af37]/20" />
        <div className="w-2 h-2 rounded-full bg-[#d4af37]/40" />
        <div className="w-8 h-[1px] bg-[#d4af37]/20" />
      </div>
    </motion.div>
  </motion.div>
);
const InterlinkedHearts = ({ className, hasVisited }: { className?: string; hasVisited: boolean }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Right Heart (Goes behind top-left of Left Heart) */}
    <motion.path
      d="M65 45 C55 35 45 25 45 15 A 8 8 0 0 1 61 15 L 65 20 L 69 15 A 8 8 0 0 1 85 15 C 85 25 75 35 65 45"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={hasVisited ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: hasVisited ? 0 : 0.5 }}
      style={{ rotate: '15deg', originX: '65px', originY: '30px' }}
    />
    {/* Left Heart (Goes behind bottom-right of Right Heart) */}
    <motion.path
      d="M35 45 C25 35 15 25 15 15 A 8 8 0 0 1 31 15 L 35 20 L 39 15 A 8 8 0 0 1 55 15 C 55 25 45 35 35 45"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={hasVisited ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: hasVisited ? 0 : 0.8 }}
      style={{ rotate: '-15deg', originX: '35px', originY: '30px' }}
    />
    {/* Small segment of Right Heart to create the interlink (Overlapping Left Heart) */}
    <motion.path
      d="M45 15 A 8 8 0 0 1 53 15"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={hasVisited ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: hasVisited ? 0 : 2.3 }}
      style={{ rotate: '15deg', originX: '65px', originY: '30px' }}
    />
  </svg>
);

const AnimatedHeart = ({ className, hasVisited }: { className?: string; hasVisited: boolean }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path
      d="M50 85 C20 65 5 45 5 25 A 20 20 0 1 1 45 25 L 50 30 L 55 25 A 20 20 0 1 1 95 25 C 95 45 80 65 50 85"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      initial={hasVisited ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay: hasVisited ? 0 : 0.5, ease: "easeInOut" }}
    />
  </svg>
);

const ThankYouScreen = ({ t, hasVisited, lang }: { t: any; hasVisited: boolean; lang: string }) => {
  const groomName = lang === 'mr' ? "शुभम" : weddingData.couple.groom;
  const brideName = lang === 'mr' ? "ऋतुजा" : weddingData.couple.bride;

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-[#fdfbf7] p-10 text-center relative overflow-hidden"
      initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Premium Parchment Texture Background */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-0" style={{
        backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`,
      }} />

      {/* Corner Floral Accents - Top Right and Bottom Left */}
      <div className="absolute top-4 right-4 w-24 h-24 opacity-20 pointer-events-none z-10 rotate-90">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
          <path d="M0 0C50 0 100 50 100 100M0 20C40 20 80 60 80 100M0 40C30 40 60 70 60 100" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 w-24 h-24 opacity-20 pointer-events-none z-10 -rotate-90">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
          <path d="M0 0C50 0 100 50 100 100M0 20C40 20 80 60 80 100M0 40C30 40 60 70 60 100" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>

      <motion.div
        className="relative z-10"
        initial={hasVisited ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          initial={hasVisited ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: hasVisited ? 0 : 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <InterlinkedHearts className="w-16 h-12 mx-auto text-[#d4af37]/60 mb-4" hasVisited={hasVisited} />
          <div className="w-16 h-[1px] bg-[#d4af37]/30 mx-auto" />
        </motion.div>

        <div className="font-serif mb-8 text-neutral-800 leading-tight tracking-tight flex flex-col items-center">
          {t.celebrateMessage.map((line: string, i: number) => (
            <motion.span
              key={i}
              className={i === 1 ? "text-[#d4af37] italic font-elegant text-3xl my-2" : "block text-2xl"}
              initial={hasVisited ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasVisited ? 0 : 0.5 + (i * 0.2) }}
            >
              {line}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-[1px] bg-[#d4af37]/20" />
          <div className="w-2 h-2 rounded-full border border-[#d4af37]/40" />
          <div className="w-12 h-[1px] bg-[#d4af37]/20" />
        </div>

        <motion.div
          initial={hasVisited ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: hasVisited ? 0 : 1.2 }}
        >
          <p className="font-elegant text-xl text-[#d4af37] italic mb-6 tracking-wide">{t.withLove}</p>
          <div className="space-y-2">
            <p className="font-serif text-3xl text-neutral-800 tracking-wider">
              {groomName}
            </p>
            <p className="font-elegant text-xl text-[#d4af37]">&</p>
            <p className="font-serif text-3xl text-neutral-800 tracking-wider">
              {brideName}
            </p>
          </div>
        </motion.div>

        <div className="mt-16 flex justify-center gap-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [isMuted, setIsMuted] = useState(false);
  const [visitedScreens, setVisitedScreens] = useState<number[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const isScrolling = React.useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const t = translations[lang];

  useEffect(() => {
    if (isOpen && !visitedScreens.includes(currentScreen)) {
      setVisitedScreens(prev => [...prev, currentScreen]);
    }
  }, [currentScreen, isOpen]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    // Restart playback of the new song if it was playing
    if (audioRef.current && !isMuted && isOpen) {
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.log("Playback error:", e));
      }, 0);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  };

  const screens = [
    <UniversalPrayerScreen t={t} hasVisited={visitedScreens.includes(0)} />,
    <HeroScreen t={t} hasVisited={visitedScreens.includes(1)} lang={lang} />,
    <LocationScreen t={t} hasVisited={visitedScreens.includes(2)} />,
    <CountdownScreen t={t} hasVisited={visitedScreens.includes(3)} />,
    <MessageScreen t={t} hasVisited={visitedScreens.includes(4)} />,
    <EventsScreen t={t} hasVisited={visitedScreens.includes(5)} />,
    <ThankYouScreen t={t} hasVisited={visitedScreens.includes(6)} lang={lang} />
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1 && !isScrolling.current) {
      isScrolling.current = true;
      setDirection(1);
      setCurrentScreen(prev => prev + 1);
      setTimeout(() => { isScrolling.current = false; }, 500);
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0 && !isScrolling.current) {
      isScrolling.current = true;
      setDirection(-1);
      setCurrentScreen(prev => prev - 1);
      setTimeout(() => { isScrolling.current = false; }, 500);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const distance = touchStart - touchEnd;

    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(null);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 20) return;
    if (e.deltaY > 0) handleNext();
    else handlePrev();
  };

  const screenVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#f8f7f4] relative overflow-hidden">
      {/* Global Bubble Click Effect */}
      <ClickEffect />

      {/* Flower Petals Animation (Moved to background) */}
      {isOpen && <FallingPetals />}

      {/* Background Music */}
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        loop
      />

      {/* Sticky Controls */}
      <div className="fixed top-4 left-4 z-[100]">
        {/* Language Switcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
          className="bg-white/80 backdrop-blur-md border border-[#d4af37]/30 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-[#d4af37] font-elegant font-bold text-sm tracking-widest min-w-[80px] justify-center"
        >
          <Languages className="w-4 h-4" />
          <span>{lang === 'en' ? 'MAR' : 'ENG'}</span>
        </motion.button>
      </div>

      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
        {/* Music Switcher
        {isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSong}
            className="bg-white/80 backdrop-blur-md border border-[#d4af37]/30 p-3 rounded-full shadow-lg flex items-center justify-center text-[#d4af37] relative group"
            title={`Switch to ${songs[(currentSongIndex + 1) % songs.length].name}`}
          >
            <Music className="w-4 h-4" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {songs[currentSongIndex].name}
            </span>
          </motion.button>
        )}
        */}

        {/* Music Toggle */}
        {isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="bg-white/80 backdrop-blur-md border border-[#d4af37]/30 p-3 rounded-full shadow-lg flex items-center justify-center text-[#d4af37]"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
        )}
      </div>

      <div className="relative w-full max-w-[450px] h-[100dvh] sm:h-[90vh] bg-white sm:rounded-[2rem] shadow-2xl overflow-hidden sm:border-8 sm:border-white">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <InvitationCard key="invitation" onOpen={handleOpen} t={t} lang={lang} />
          ) : (
            <motion.div
              key="content"
              className="w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onWheel={onWheel}
            >
              {/* Screen Content */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentScreen}
                  custom={direction}
                  className="w-full h-full absolute inset-0"
                  initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                >
                  {screens[currentScreen]}
                </motion.div>
              </AnimatePresence>

              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: 180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => {
                  setIsOpen(false);
                  setCurrentScreen(0);
                  setVisitedScreens([]); // Reset visited screens on close
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className="absolute bottom-0 right-0 translate-x-[30%] translate-y-[30%] z-50 w-24 h-24 rounded-full bg-[#d4af37] shadow-2xl flex items-center justify-center text-white active:scale-95 transition-transform overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                <div className="text-xs font-elegant uppercase tracking-widest font-bold -translate-x-2 -translate-y-2">{t.close}</div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </motion.button>

              {/* Navigation Indicators */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
                {screens.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${i === currentScreen ? 'h-6 bg-[#d4af37]' : 'h-1.5 bg-neutral-300'}`}
                    animate={{ scale: i === currentScreen ? 1.2 : 1 }}
                  />
                ))}
              </div>

              {/* Swipe Prompts */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none">
                {currentScreen < screens.length - 1 && (
                  <>
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold">{t.swipeUp}</p>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </>
                )}
                {currentScreen === screens.length - 1 && (
                  <>
                    <ChevronUp className="w-4 h-4 animate-bounce" />
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold">{t.swipeDown}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
