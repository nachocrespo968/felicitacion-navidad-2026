
import React from 'react';

interface MagicButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const MagicButton: React.FC<MagicButtonProps> = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative group px-8 py-3 overflow-hidden font-montserrat tracking-widest text-white transition-all duration-300 bg-transparent border border-amber-400 hover:text-emerald-950 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 bg-amber-400 origin-left" />
    </button>
  );
};

export default MagicButton;
