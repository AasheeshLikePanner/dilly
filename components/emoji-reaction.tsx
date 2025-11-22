import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
* ANIMATION VARIANTS
* These make the emojis feel "alive" with specific personalities.
*/
const emojiVariants = {
 shake: {
   hover: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } },
   tap: { x: [0, -4, 4, -4, 4, 0], scale: 1.2 }
 },
 droop: {
   hover: { rotate: -15, y: 2, transition: { type: "spring", stiffness: 300 } },
   tap: { scale: 0.9, rotate: -25 }
 },
 glance: {
   hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
   tap: { scale: 1.1 }
 },
 bounce: {
   hover: { y: -4, transition: { type: "spring", stiffness: 300 } },
   tap: { scale: 1.3 }
 },
 heartbeat: {
   hover: { scale: 1.2, transition: { type: "spring", stiffness: 400 } },
   tap: { scale: [1, 1.4, 1], transition: { duration: 0.3 } }
 }
};

/**
* SHARED DATA
* Swapped generic icons for expressive Emojis
*/
const FEEDBACK_OPTIONS = [
 { id: 1, label: 'Terrible', emoji: '😖', anim: 'shake', color: 'bg-red-500' },
 { id: 2, label: 'Bad',      emoji: '😞', anim: 'droop', color: 'bg-orange-500' },
 { id: 3, label: 'Okay',     emoji: '😐', anim: 'glance', color: 'bg-yellow-500' },
 { id: 4, label: 'Good',     emoji: '😄', anim: 'bounce', color: 'bg-blue-500' },
 { id: 5, label: 'Amazing',  emoji: '😍', anim: 'heartbeat', color: 'bg-rose-500' },
];

// --- VARIANT 1: The "Glass" Dock ---
// A floating dock design with heavy blur and magnification effects (Mac OS Dock style)
export const VariantDock = () => {
 const [selected, setSelected] = useState(null);
 const [hovered, setHovered] = useState(null);

 return (
   <div className="flex flex-col items-center justify-center gap-6">
     <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 01: Living Dock</span>
    
     <div className="relative group">
       {/* The Dock Container */}
       <div className="flex items-end gap-2 px-4 pb-3 pt-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
         {FEEDBACK_OPTIONS.map((option) => {
           const isSelected = selected === option.id;
           const isHovered = hovered === option.id;

           return (
             <motion.button
               key={option.id}
               onClick={() => setSelected(option.id)}
               onMouseEnter={() => setHovered(option.id)}
               onMouseLeave={() => setHovered(null)}
               initial="rest"
               whileHover="hover"
               whileTap="tap"
               variants={emojiVariants[option.anim]}
               className="relative group/btn focus:outline-none cursor-pointer"
             >
               {/* Spotlight underneath active item */}
               {isSelected && (
                   <motion.div
                       layoutId="dock-spotlight"
                       className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]"
                   />
               )}

               {/* The Emoji Itself */}
               <motion.div
                   className="text-4xl select-none filter drop-shadow-lg"
                   animate={{
                       scale: isHovered ? 1.4 : isSelected ? 1.2 : 1,
                       y: isHovered ? -10 : 0
                   }}
                   transition={{ type: "spring", stiffness: 400, damping: 20 }}
               >
                   {option.emoji}
               </motion.div>
              
               {/* Tooltip Label */}
               <AnimatePresence>
                   {isHovered && (
                       <motion.div
                           initial={{ opacity: 0, y: 10, scale: 0.8 }}
                           animate={{ opacity: 1, y: -50, scale: 1 }}
                           exit={{ opacity: 0, y: 10, scale: 0.8 }}
                           className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 py-1 bg-zinc-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap border border-zinc-800 shadow-xl z-20 pointer-events-none"
                       >
                           {option.label}
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-800" />
                       </motion.div>
                   )}
               </AnimatePresence>
             </motion.button>
           );
         })}
       </div>
     </div>

     <div className="h-6 text-center">
        <AnimatePresence mode='wait'>
           {selected ? (
               <motion.div
                   key={selected}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -5 }}
                   className="text-lg font-medium text-white"
               >
                   You felt <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-bold">{FEEDBACK_OPTIONS.find(o => o.id === selected).label}</span> about this.
               </motion.div>
           ) : (
               <span className="text-zinc-500 text-sm">Select a reaction</span>
           )}
        </AnimatePresence>
     </div>
   </div>
 );
};

// --- VARIANT 2: The "Soul" Card ---
// High contrast, big typography, focusing on the selected emotion filling the card.
export const VariantSoul = () => {
 const [selected, setSelected] = useState(null);

 return (
   <div className="flex flex-col items-center justify-center gap-4">
     <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 02: Deep Soul</span>
    
     <div className="bg-black relative w-full max-w-md rounded-[2rem] border border-zinc-800 p-1 overflow-hidden shadow-2xl">
       {/* Background Gradient Mesh based on selection */}
       <div className="absolute inset-0 opacity-30 transition-colors duration-700 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
      
       <AnimatePresence>
           {selected && (
               <motion.div
                   key={selected}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.15 }}
                   exit={{ opacity: 0 }}
                   className={`absolute inset-0 ${FEEDBACK_OPTIONS.find(o => o.id === selected).color} blur-3xl`}
               />
           )}
       </AnimatePresence>

       <div className="relative z-10 bg-zinc-900/80 backdrop-blur-sm rounded-[1.8rem] p-8 text-center">
           <h3 className="text-white font-medium text-xl mb-8 tracking-tight">How was the quality?</h3>
          
           <div className="flex justify-between items-center px-2">
               {FEEDBACK_OPTIONS.map((option) => {
                   const isSelected = selected === option.id;
                  
                   return (
                       <motion.button
                           key={option.id}
                           onClick={() => setSelected(option.id)}
                           whileHover="hover"
                           whileTap="tap"
                           variants={emojiVariants[option.anim]}
                           className="relative outline-none group"
                       >
                           <motion.div
                               animate={{
                                   scale: isSelected ? 1.5 : 1,
                                   opacity: selected && !isSelected ? 0.3 : 1,
                                   filter: isSelected ? 'grayscale(0%)' : selected ? 'grayscale(100%)' : 'grayscale(0%)'
                               }}
                               className="text-4xl transition-all duration-300"
                           >
                               {option.emoji}
                           </motion.div>
                          
                           {/* Selection Dot */}
                           {isSelected && (
                               <motion.div
                                   layoutId="soul-dot"
                                   className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${option.color.replace('bg-', 'bg-')}`}
                               />
                           )}
                       </motion.button>
                   )
               })}
           </div>

           <div className="mt-10 h-8">
               {selected && (
                   <motion.p
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="text-sm text-zinc-400"
                   >
                       Thanks for feedback!
                   </motion.p>
               )}
           </div>
       </div>
     </div>
   </div>
 );
};

// --- VARIANT 3: The "Premium" Modal ---
// Full interaction flow with the new emoji set
export const VariantInteractive = () => {
 const [step, setStep] = useState('rate');
 const [rating, setRating] = useState(null);
 const [comment, setComment] = useState('');

 const handleRate = (id) => {
   setRating(id);
   setTimeout(() => setStep('comment'), 400); // Slight delay to let animation play
 };

 const handleSubmit = () => {
   setStep('done');
   setTimeout(() => {
     setStep('rate');
     setRating(null);
     setComment('');
   }, 3000);
 };

 return (
   <div className="flex flex-col items-center justify-center gap-4">
     <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase">Variant 03: Premium Modal</span>

     <motion.div
       layout
       className="bg-[#111] w-full max-w-sm rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative"
     >
       {/* Decorative Top Glow */}
       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

       <div className="absolute top-4 right-4 z-20 text-zinc-600 hover:text-zinc-300 cursor-pointer transition-colors">
           <X size={18} />
       </div>

       <AnimatePresence mode="wait">
         {/* STEP 1: RATING */}
         {step === 'rate' && (
           <motion.div
             key="step-rate"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
             className="p-8 flex flex-col items-center pt-12"
           >
             <h3 className="text-white font-bold text-2xl mb-2 tracking-tight">Rate Experience</h3>
             <p className="text-zinc-500 text-sm text-center mb-10 leading-relaxed">
               Help us improve by selecting<br/>how you felt about the service.
             </p>
            
             <div className="flex justify-center gap-2 w-full">
               {FEEDBACK_OPTIONS.map((option) => (
                   <motion.button
                     key={option.id}
                     onClick={() => handleRate(option.id)}
                     whileHover="hover"
                     whileTap="tap"
                     variants={emojiVariants[option.anim]}
                     className="p-3 rounded-2xl hover:bg-white/5 transition-colors relative outline-none"
                   >
                     <span className="text-4xl block">{option.emoji}</span>
                   </motion.button>
               ))}
             </div>
           </motion.div>
         )}

         {/* STEP 2: COMMENT */}
         {step === 'comment' && (
           <motion.div
             key="step-comment"
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -50 }}
             className="p-6 pt-8"
           >
             <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep('rate')} className="text-xs font-medium text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">Back</button>
               
                {/* Selected Context Indicator */}
                {rating && (() => {
                   const opt = FEEDBACK_OPTIONS.find(o => o.id === rating);
                   return (
                       <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                           <span className="text-lg">{opt.emoji}</span>
                           <span className="text-xs font-bold text-white">{opt.label}</span>
                       </div>
                   )
                })()}
             </div>

             <textarea
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               placeholder="Tell us what made you feel this way..."
               className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-700 transition-all mb-4 placeholder:text-zinc-600"
             />

             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={handleSubmit}
               className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors"
             >
               Submit Feedback
             </motion.button>
           </motion.div>
         )}

         {/* STEP 3: SUCCESS */}
         {step === 'done' && (
           <motion.div
             key="step-done"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="p-10 h-[340px] flex flex-col items-center justify-center text-center"
           >
             <motion.div
               initial={{ scale: 0, rotate: 180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', stiffness: 200, damping: 15 }}
               className="text-6xl mb-6"
             >
               ✨
             </motion.div>
             <h3 className="text-white font-bold text-2xl mb-2">Received!</h3>
             <p className="text-zinc-500 text-sm max-w-[200px]">
               Your feedback helps us create better experiences.
             </p>
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
   </div>
 );
};


export function EmojiSlider() {
 return (
   <div className="min-h-screen bg-black flex flex-col items-center py-20 gap-24 overflow-y-auto font-sans selection:bg-zinc-800">
      
     {/* Header */}
     <div className="text-center space-y-3">
       <h1 className="text-4xl font-bold text-white tracking-tight">
         Sentiment
       </h1>
       <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
         Expressive & Animated
       </p>
     </div>

     {/* Render Variants */}
     <VariantDock />
     <VariantSoul />
     <VariantInteractive />

     <div className="h-20" />
   </div>
 );
}
