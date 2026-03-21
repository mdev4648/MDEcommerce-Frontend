import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ArrowRight ,Heart, ShoppingBag } from "lucide-react"; // Using icons for better UI
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // Local state for Whitelist toggle


  // Adjusted Drag Limit for smaller cards
  const DRAG_LIMIT = 150; 
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, DRAG_LIMIT / 2], [1, 0]);

  const handleScroll = (e) => {
    const width = e.target.offsetWidth;
    const scrollLeft = e.target.scrollLeft;
    const index = Math.round(scrollLeft / width);
    setActiveImage(index);
  };

  const onDragEnd = (_, info) => {
    if (info.offset.x > 80) {
      navigate(`/product/${product.id}`);
    }
  };


  return (//bg-[#F2F2F2]
    <div className="relative  dark:bg-background rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col shadow-sm w-full max-w-[400px]  min-h-[600px] md:h-[1px] mx-auto overflow-hidden border border-gray-100">
      
      {/* 2. Image Slider */}
      <div className="relative flex-1 flex flex-col min-h-[20px] md:min-h-[30px]">

          {/* NEW: Floating Action Buttons */}
  <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-20">
    <button className="p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all">
     <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsLiked(!isLiked)}
          className="p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Heart 
            size={20} 
            className={isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-400"} 
          />
        </motion.button>
    </button>
   
  </div>

        <div 
          onScroll={handleScroll}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {product.product_images?.length > 0 ? (
            product.product_images.map((imgObj, i) => (
              <div key={i} className="min-w-full  flex items-center justify-center snap-center px-2 bg-white ">
                <motion.img
                  layoutId={`prod-img-${product.id}`}
                  src={imgObj.image}
                  alt={product.name}
                  className="max-h-[220px] md:max-h-[280px] w-auto object-contain mix-blend-multiply drop-shadow-2xl "
                />
              </div>
            ))
          ) : (
            <div className="min-w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl text-gray-400">No Image</div>
          )}
        </div>

        {/* 3. Pagination Dots */}
        <div className="flex justify-center md:justify-start gap-2 mb-6 mt-2  bg-background">
          {product.product_images?.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeImage ? "w-6 bg-gray-800" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>


      {/* 3. TEXT CONTENT & QUICK CART */}
      <div className="space-y-1 relative text-primary">
        <p className="text-gray-400 text-[10px] md:text-[11px] font-bold tracking-widest uppercase">
          {product.category?.category || "General"}
        </p>
        
        <div className="flex justify-between items-start">
            <h3 className="text-3xl md:text-[40px] leading-tight font-light text-[#1a1a1a] dark:text-white tracking-tight truncate pr-4">
            {product.name}
            </h3>
            
            {/* QUICK ADD TO CART BUTTON */}
            <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="mt-2 p-3 bg-black dark:bg-background text-white rounded-2xl shadow-xl hover:bg-orange-500 transition-colors"
            >
                <ShoppingBag size={18} />
            </motion.button>
        </div>
        
        <div className="flex items-center  gap-3 py-4 cursor-pointer group/view w-fit">
          <div className="w-2 h-2 rounded-full bg-primary group-hover/view:scale-150 transition-transform" />
          <span className="text-xs md:text-sm font-bold border-b border-transparent group-hover/view:border-black transition-all">
            View Details
          </span>
        </div>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 pb-6">
          {product.description}
        </p>
      </div>


      {/* 5. SWIPE TO BUY */}
      <div className="mt-auto relative bg-[#3a3a3a] rounded-2xl p-1.5 h-14 md:h-16 flex items-center overflow-hidden">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center pl-12 pointer-events-none"
        >
          <span className="text-gray-400 ml-10 dark:text-primary text-[9px] font-black tracking-[0.2em] uppercase">
            Swipe to Buy
          </span>
        </motion.div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: DRAG_LIMIT }}
          dragElastic={0.05}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="z-10 bg-white text-black h-full px-6 md:px-8 flex items-center justify-center rounded-xl font-bold text-base md:text-lg cursor-grab active:cursor-grabbing shadow-lg"
        >
          Br {product.price}
        </motion.div>
        
        <div className="ml-auto pr-4 text-white/20">
            <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}














// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   // Fallback data for the UI design
//   const category = product.category || "VR Glasses";
//   const description = product.description || "Magic Leap One Creator Edition is a lightweight, wearable computer that brings digital content to life.";

//   return (
//     <div className="relative bg-[#F2F2F2] rounded-[40px] p-8 h-[750px] w-full max-w-md flex flex-col shadow-sm hover:shadow-md transition-all mx-auto">
      
//       {/* Back Arrow Icon */}
//       <div className="mb-2">
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
//           <path d="M19 12H5M12 19l-7-7 7-7" />
//         </svg>
//       </div>

//       {/* Image Slider Container */}
//       <div className="relative flex-1 flex flex-col min-h-0">
//         <div className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide flex items-center">
//           {product.product_images?.map((imgObj, index) => (
//             <div key={imgObj.id || index} className="min-w-full h-full flex items-center justify-center snap-center p-4">
//               <img
//                 src={imgObj.image}
//                 alt={`${product.name} - ${index}`}
//                 className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Dynamic Pagination Dots */}
//         <div className="flex gap-2 mb-6 mt-2 justify-start">
//           {product.product_images?.map((_, i) => (
//             <div 
//               key={i} 
//               className={`w-2 h-2 rounded-full transition-colors ${i === 0 ? 'bg-gray-500' : 'bg-gray-300'}`}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Product Details Section */}
//       <Link to={`/product/${product.id}`} className="block">
//         <div className="space-y-1">
//           <span className="text-gray-500 text-xs font-semibold tracking-wide uppercase">{category}</span>
//           <h3 className="text-[40px] leading-[1.1] font-light text-gray-900 tracking-tight">
//             {product.name}
//           </h3>
          
//           {/* Experience Link */}
//           <div className="flex items-center gap-3 py-4 group/exp cursor-pointer">
//             <div className="flex items-center justify-center w-5 h-5">
//                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent"></div>
//             </div>
//             <span className="text-gray-800 font-bold text-sm">View the Experience</span>
//           </div>

//           <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-3">
//             {description}
//           </p>
//         </div>
//       </Link>

//       {/* Swipe to Buy Button Container */}
//       <div className="mt-8 bg-[#333333] rounded-2xl flex items-center p-1.5 h-16 shadow-inner">
//         {/* Price Tag */}
//         <div className="bg-black text-white h-full px-8 flex items-center justify-center rounded-xl font-bold text-lg">
//           £ {Number(product.price).toLocaleString()}
//         </div>
        
//         {/* Swipe Label */}
//         <div className="flex-1 flex justify-center items-center">
//           <span className="text-[#999999] text-[10px] font-black tracking-[0.2em] uppercase pl-4">
//             Swipe to Buy
//           </span>
//         </div>
//       </div>
      
//     </div>
//   );
// }

















//  <Link to={`/product/${product.id}`}>
//   <div className="relative h-90 w-full rounded-xl overflow-hidden hover:shadow-md transition">

//     {/* Image */}
//     <img
//       src={product.product_images[0]?.image}
//       alt={product.name}
//       className="h-full w-full object-cover"
//     />

//     {/* Overlay */}
//     <div className="absolute inset-0 bg-black/30"></div>

//     {/* Text */}
//     <div className="absolute bottom-3 left-3 text-white">
//       <h3 className="font-semibold text-lg">
//         {product.name}
//       </h3>
//       <p className="font-bold">
//         ${product.price}
//       </p>
//     </div>

//   </div>
// </Link>
















    // <Link to={`/product/${product.id}`}>

    //   <div className="bg-card border border-border rounded-xl  hover:shadow-md transition text-primary">

    //     <img
    //       src={product.product_images[0].image}
    //       alt={product.name}
    //       className="h-60 w-full object-cover object-center  rounded-t-xl"
    //     />

    //     <div className="pl-4 pb-4">

    //     <h3 className="mt-3 font-semibold text-card">
    //       {product.name}
    //     </h3>

    //     <p className="text-primary font-bold mt-1">
    //       ${product.price}
    //     </p>

    //     </div>


    //   </div>

    // </Link>