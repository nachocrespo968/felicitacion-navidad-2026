
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Volume2, VolumeX, Share2, Download, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import Snowfall from './components/Snowfall';
import MagicButton from './components/MagicButton';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'none' | 'success'>('none');
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Textos íntegros (SIN MODIFICACIONES)
  const QUOTE = "“A veces lo peor que te pasa en la vida te pone directamente en el camino de las mejores cosas de tu vida”";
  const INTRO_TEXT = "Sin duda 2025 ha sido un year en el que esto se ha hecho realidad para mi familia y para mí. Por ello, con el corazón lleno de gratitud, quiero compartir este mensaje contigo y desearte una Navidad llena de luz y un Año Nuevo transformador.";
  const LIST_HEADER = "En este camino, hemos reafirmado que lo más valioso es:";
  const LIST_ITEMS = [
    "Ofrecer lo mejor de nosotros sin esperar nada a cambio.",
    "Ser amables, pues todos libramos batallas que los demás no ven.",
    "La presencia silenciosa y firme de un amigo en los momentos difíciles.",
    "El coraje para seguir adelante cuando el camino se hace cuesta arriba.",
    "Mirar el mundo con ojos más generosos y menos juiciosos.",
    "Creer en la bondad del otro y en la fuerza de la unión.",
    "Mantener viva la llama del optimismo y la esperanza."
  ];
  const CLOSING = "¡Feliz Navidad y un 2026 lleno de propósito y alegría!";
  const FOOTER_TAG = "HACIA UN 2026 CON PROPÓSITO";

  const AUDIO_URL = "https://cdn.pixabay.com/audio/2022/12/13/audio_82c61304f5.mp3"; 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isAudioOn;
    }
  }, [isAudioOn]);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      window.history.pushState({ open: true }, "");
      
      // El audio DEBE activarse aquí por interacción directa del usuario
      if (audioRef.current) {
        audioRef.current.muted = !isAudioOn;
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Failsafe silencioso si el navegador aún bloquea
          });
        }
      }
    } else {
      setIsOpen(false);
      if (window.history.state?.open) window.history.back();
      if (audioRef.current) audioRef.current.pause();
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Feliz Navidad 2026',
      text: `“A veces lo peor que te pasa en la vida...”\n\nHe preparado esta felicitación para ti:`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('none'), 2000);
      }
    } catch (err) {
      // Usuario canceló o error silencioso
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fcf9f2',
      });
      const link = document.createElement('a');
      link.download = 'Navidad-2026.png';
      link.href = canvas.toDataURL('image/png', 0.9);
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#051612] select-none touch-none overflow-hidden">
      <audio 
        ref={audioRef} 
        src={AUDIO_URL} 
        loop 
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-black/80 pointer-events-none" />
      <Snowfall />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, y: -100 }}
            className="z-20 flex flex-col items-center gap-10 px-6 text-center"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-44 h-44 md:w-60 md:h-60 border-2 border-amber-400/30 rounded-full flex items-center justify-center p-8 bg-amber-400/5 backdrop-blur-sm"
              >
                <Star size={72} className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
              </motion.div>
              <Sparkles className="absolute -top-4 -right-4 text-amber-200 w-12 h-12 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="font-playfair text-6xl md:text-8xl text-amber-100 italic font-light tracking-tight drop-shadow-lg">2026</h1>
              <p className="font-montserrat text-amber-200/40 tracking-[0.4em] uppercase text-[10px]">Un mensaje de esperanza</p>
            </div>

            <MagicButton onClick={toggleOpen} className="mt-6">DESCUBRIR MENSAJE</MagicButton>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-20 w-full max-w-5xl h-full flex flex-col items-center justify-center p-4 md:p-8"
          >
            <div className="w-full max-h-[75vh] md:max-h-[85vh] overflow-y-auto no-scrollbar rounded-xl shadow-2xl bg-[#fcf9f2]">
              <div ref={cardRef} className="relative text-emerald-950 p-6 md:p-20 flex flex-col min-h-full w-full">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[#d4a373]/40 m-4 md:m-8" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[#d4a373]/40 m-4 md:m-8" />

                <div className="relative z-10 flex-grow flex flex-col justify-between gap-12">
                  <div className="text-center">
                    <p className="font-playfair italic text-xl md:text-4xl leading-tight text-emerald-900 px-2">
                      {QUOTE}
                    </p>
                    <div className="w-24 h-[1px] bg-amber-300 mt-8 mx-auto" />
                  </div>

                  <div className="space-y-8 md:space-y-12 px-2 md:px-8">
                    <p className="font-montserrat text-base md:text-xl text-emerald-800/90 leading-relaxed font-light">
                      {INTRO_TEXT}
                    </p>
                    
                    <div className="space-y-6">
                      <p className="font-playfair text-xl md:text-2xl text-[#c47c3c] italic font-medium">
                        {LIST_HEADER}
                      </p>
                      
                      <div className="flex flex-col gap-y-4">
                        {LIST_ITEMS.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm md:text-lg text-emerald-900/80 font-montserrat leading-snug">
                            <Heart size={14} className="text-[#c47c3c] mt-1 shrink-0" strokeWidth={2} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center space-y-4 pb-4">
                    <h2 className="font-dancing text-4xl md:text-7xl text-emerald-950 font-semibold italic">
                      {CLOSING}
                    </h2>
                    <div className="pt-4 flex items-center justify-center gap-2 text-emerald-900/40 font-montserrat text-[9px] tracking-[0.3em] uppercase">
                       {FOOTER_TAG}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-md">
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={handleNativeShare}
                  className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-full transition-all shadow-lg active:scale-95 font-montserrat font-bold text-[10px] uppercase tracking-wider"
                >
                  {copyStatus === 'success' ? <Check size={16} /> : <Share2 size={16} />}
                  {copyStatus === 'success' ? 'Enlace Copiado' : 'Compartir'}
                </button>

                <button 
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-full transition-all shadow-lg active:scale-95 disabled:opacity-50 font-montserrat font-bold text-[10px] uppercase tracking-wider"
                >
                  {isDownloading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={16} />}
                  Guardar Postal
                </button>
              </div>

              <button 
                onClick={toggleOpen}
                className="text-white/40 hover:text-white/80 transition-colors font-montserrat text-[10px] uppercase tracking-[0.2em]"
              >
                — Volver al inicio —
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50">
         <button 
           onClick={() => setIsAudioOn(!isAudioOn)}
           className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isAudioOn ? 'bg-amber-400 text-emerald-950 shadow-lg shadow-amber-400/20' : 'bg-white/5 text-white/30 border border-white/10'}`}
         >
           {isAudioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
         </button>
      </div>
    </div>
  );
};

export default App;
