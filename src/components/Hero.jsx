import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi"; // Lucide icons already installed

const slides = [
  {
    id: 1,
    title: "Next-Gen Surveillance",
    desc: "4K Resolution, AI tracking, and night vision. Keep your world safe.",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800", // Quality Camera Image
    price: 399,
  },
  {
    id: 2,
    title: "Cinematic Home Theater",
    desc: "Laser projectors with 5000 lumens and infinity contrast for a true cinema feel.",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800", // Quality Projector Image
    price: 1299,
  },
  // ADD UP TO 6 SLIDES HERE FOLLOWING THE SAME STRUCTURE
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Functions to change slides
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000); // Change slide every 7 seconds
    return () => clearInterval(timer);
  }, [current]); // Reset timer when current slide changes

  return (
    <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          
          /* ================================
             SWIPE / DRAG LOGIC START
          ================================ */
          drag="x"
          dragConstraints={{ left: 0, right: 0 }} // Don't allow it to stay pulled
          onDragEnd={(e, { offset }) => {
            const swipe = offset.x;
            if (swipe < -100) nextSlide(); // Swipe left -> Next
            else if (swipe > 100) prevSlide(); // Swipe right -> Previous
          }}
          /* ================================
             SWIPE / DRAG LOGIC END
          ================================ */
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Main Content Container (Mobile First) */}
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between py-12 md:py-24 select-none">
            
            {/* TEXT SIDE (Pointer events: auto to allow clicks) */}
            <div className="w-full md:w-1/2 z-10 pointer-events-none mt-10 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-8xl font-black text-foreground leading-[1.05] tracking-tight mb-6"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-foreground/70 text-base md:text-xl max-w-md mb-10 font-light"
              >
                {slides[current].desc}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
              >
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                  <FiShoppingCart /> Shop Now for ${slides[current].price}
                </button>
                <button className="text-foreground px-8 py-4 font-bold border border-border rounded-full hover:bg-muted/50 transition-colors flex items-center gap-2">
                  View Specs
                </button>
              </motion.div>
            </div>

            {/* IMAGE SIDE (Pointer events: none to allow drag through image) */}
            <div className="w-full md:w-1/2 relative flex justify-center items-center pointer-events-none">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring", delay: 0.2 }}
                src={slides[current].image}
                alt="Product"
                // drop-shadow makes the images float in 3D
                className="relative z-10 w-full max-h-[300px] md:max-h-[500px] object-contain drop-shadow-2xl transition-all"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3. SLIDE INDICATORS (Pagination dots) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30 pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)} // Allow dots to change slide
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              current === i ? "w-10 bg-primary" : "w-2 bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { FiSearch, FiShoppingCart, FiChevronDown, FiArrowRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// // Replace these paths with your actual local file paths
// import logo from "../assets/InfiLogo.jpg";
// import camera from "../assets/securityCamera.jpg";
// import loginImg from "../assets/login_avator.png";

// export default function Hero() {
//   const menuItems = ["Home", "Shop", "Blog"];

//   return (
//     <div className=" min-h-screen bg-[#E5E7EB] dark:bg-[#0b0f19] flex items-center justify-center p-4 md:p-10 font-sans transition-colors duration-300">
      
//       {/* MAIN CONTAINER FRAME */}
//       <div className="bg-card dark:bg-[#111827] w-full max-w-7xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row p-4 md:p-6 gap-6 transition-colors">
        
//         {/* LEFT SIDE: THE FEATURE CARD (The Orange/Primary Block) */}
//         <div className="w-full md:w-[45%] bg-primary rounded-[32px] p-8 md:p-12 flex flex-col justify-between relative min-h-[500px] md:min-h-[700px] overflow-hidden">
          
//           <div className="z-10">
//             <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/30">
//               Top Gadgets for Every Need
//             </span>
//             <h1 className="text-white text-5xl md:text-7xl font-black leading-tight mb-6">
//               INFINITY <br /> ELECTRONICS
//             </h1>
//             <p className="text-white/80 text-lg max-w-xs leading-relaxed">
//               Stay ahead of the curve with the newest tech trends — explore our wide selection today.
//             </p>
//           </div>

//           {/* Featured Security Camera (Floating 3D Effect) */}
//           <motion.div 
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="relative z-10 flex justify-center items-end"
//           >
//             <img 
//               src={camera} 
//               alt="Security Camera" 
//               className="w-[85%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
//             />
//           </motion.div>

//           {/* Decorative Pattern Background (Optional) */}
//           <div className="absolute inset-0 opacity-10 pointer-events-none">
//              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: NAVIGATION & CONTENT AREA */}
//         <div className="flex-1 flex flex-col p-4 md:p-6">
          
//           {/* Top Bar: Logo & Nav */}
//           <div className="flex items-center justify-between mb-20">
//             {/* BRAND LOGO */}
//             <div className="flex items-center gap-2">
//               <img src={logo} alt="Infinity Logo" className="w-10 h-10 rounded-lg object-cover" />
//               <span className="font-bold text-xl tracking-tighter text-foreground">INFINITY</span>
//             </div>

//             {/* NAVIGATION PILLS */}
//             <div className="hidden lg:flex items-center gap-2 bg-muted dark:bg-[#1f2937] p-1 rounded-full border border-border">
//               {menuItems.map((item, i) => (
//                 <button 
//                   key={item}
//                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
//                     i === 0 ? "bg-white dark:bg-card shadow-sm text-foreground" : "text-foreground/50 hover:text-foreground"
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>

//             {/* ACTION ICONS */}
//             <div className="flex items-center gap-4">
//               <div className="relative cursor-pointer p-2 hover:bg-muted rounded-full transition-colors">
//                 <FiShoppingCart size={20} className="text-foreground" />
//                 <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                   3
//                 </span>
//               </div>
//               <Link to="/login" className="hidden sm:block font-bold text-sm text-foreground hover:text-primary transition-colors">
//                 Login
//               </Link>
//               <Link to="/signup" className="bg-foreground text-background px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all">
//                 Sign Up
//               </Link>
//             </div>
//           </div>

//           {/* CENTER CONTENT: CALL TO ACTION */}
//           <div className="flex-1 flex flex-col items-center justify-center text-center">
//             <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter leading-tight">
//               Your One-Stop <br /> Tech Shop
//             </h2>
            
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-foreground text-background px-10 py-5 rounded-full font-bold flex items-center gap-3 shadow-xl transition-all"
//             >
//               Shop <FiArrowRight className="bg-white text-black rounded-full p-1" size={24} />
//             </motion.button>
//           </div>

//           {/* BOTTOM SECTION: MINI PREVIEWS */}
//           <div className="mt-20 grid grid-cols-3 gap-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="aspect-[4/5] bg-muted dark:bg-[#1f2937] rounded-3xl overflow-hidden border border-border group cursor-pointer">
//                 <img 
//                   src={camera} 
//                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
//                   alt="preview"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }