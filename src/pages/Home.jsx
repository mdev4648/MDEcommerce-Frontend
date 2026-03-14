import React from 'react';
import { useGetProductsQuery } from '../features/products/productApi';
import Features from "../components/Features";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import ProductCard from "../components/ProductCard"; // Your existing amazing card
import camera2 from "../assets/camera2.png";
import camera from  "../assets/landingcamera.png";
import projector from  "../assets/projector.png";
import dimage from  "../assets/3dmage.png";
     
const slides = [
  {
    id: 1,
    title: "Next-Gen Surveillance",
    subtitle: "Infinity Security Cameras",
    desc: "4K Resolution, Night Vision, and AI motion tracking to keep your world safe.",
    image: camera, // Camera
    color: "from-blue-500/20",
  },
  {
    id: 2,
    title: "Cinematic Home Theater",
    subtitle: "4K Laser Projectors",
    desc: "Turn your living room into a cinema with 5000 lumens and infinity contrast.",
    image: camera2, // Projector
    color: "from-orange-500/20",
  },
];

export default function Hero() {
  const { data:products, error, isLoading } = useGetProductsQuery();

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

    if (isLoading) return <p>Loading products...</p>;
   if (error) return <p>Error fetching products</p>;

  return (
    <>
    <div className="relative h-[90vh] w-full overflow-hidden bg-background ">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].color} to-transparent`}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between py-12">
            
            {/* TEXT CONTENT */}
            <div className="w-full md:w-1/2 z-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-bold tracking-[0.3em] uppercase mb-4"
              >
                {slides[current].subtitle}
              </motion.p>
              
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-8xl font-black text-foreground leading-none mb-6"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-foreground/60 text-lg md:text-xl max-w-md mb-8"
              >
                {slides[current].desc}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all group shadow-lg shadow-primary/20">
                  Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white dark:bg-card border border-border text-foreground px-8 py-4 rounded-full font-bold transition-all">
                  View Specs
                </button>
              </motion.div>
            </div>

            {/* 3D FLOATING IMAGE */}
            <div className="w-full md:w-1/2 relative flex justify-center items-center h-full">
              {/* Decorative Background Circles */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-3xl"
              />
              
              <motion.img
                key={slides[current].image}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring" }}
                whileHover={{ y: -20, rotateY: 10 }}
                src={slides[current].image}
                alt="Product"
                className="relative z-10 w-[80%] md:w-full max-h-[500px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_35px_35px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === i ? "w-12 bg-primary" : "w-3 bg-foreground/20"
            }`}
          />
        ))}
      </div>

    </div> 
    <Features />
        <section className="max-w-400 mx-auto px-6 py-20 bg-background text-foreground"> 
          <div className="flex justify-between items-end mb-12 ">     
            <div> 
               <h2 className="text-4xl font-bold ">Featured Products</h2>
            <p className="text-primary mt-2">Discover our best-selling tech.</p>
          </div>
           {/* <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            See All Store <ArrowRight />
          </button> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.slice(0,4).map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>
       </section>
    </>
  );
}




























//  function Home() {
//   const { data: products, error, isLoading } = useGetProductsQuery();

//   if (isLoading) return <p>Loading products...</p>;
//   if (error) return <p>Error fetching products</p>;

//   return (
//     <div className="p-4 grid grid-cols-3 gap-4">
//       {products.map((product) => (
//         <div key={product.id} className="border p-4 rounded shadow">
//           <h2 className="text-lg font-bold">{product.name}</h2>
//           <p>Price: ${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;

// import Hero from "../components/Hero";





// import Hero from "../components/Hero";
// import Features from "../components/Features";
// import ProductCard from "../components/ProductCard";
// import { FiArrowRight, FiShoppingCart } from "react-icons/fi";

// export default function Home() {
//   // Real data placeholder - Replace with your actual API data later
//   const data = [
//     {
//       id: 1,
//       name: "Smart AI Camera",
//       price: 299,
//       category: "Security",
//       description: "4K Resolution with night vision.",
//       product_images: [{ image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=500" }]
//     },
//     {
//       id: 2,
//       name: "Laser Projector",
//       price: 899,
//       category: "Home Theater",
//       description: "Cinematic experience in your room.",
//       product_images: [{ image: "https://images.unsplash.com/photo-1535016120720-40c646bebbbb?q=80&w=500" }]
//     }
//   ];

//   return (
//     <main className="bg-background min-h-screen transition-colors duration-300">
//       <Hero />
//       <Features />
      
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="flex justify-between items-end mb-12">
//           <div>
//             <h2 className="text-4xl font-bold text-foreground">Featured Products</h2>
//             <p className="text-foreground/50 mt-2">Discover our best-selling tech.</p>
//           </div>
//           <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
//             See All Store <FiArrowRight />
//           </button>
//         </div>

//         {/* Responsive Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {data.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////

// import ProductCard from "../components/ProductCard"; // Your existing amazing card

// export default function Home() {
//   // Use dummy data or your API data
//   const { data:products, error, isLoading } = useGetProductsQuery();
//   console.log("Heelow world",products)

//   if (isLoading) return <p>Loading products...</p>;
//   if (error) return <p>Error fetching products</p>;


//   return (
//     <main className="bg-background min-h-screen">
//       <Hero />
//       <Features />
      
//       <section className="max-w-400 mx-auto px-6 py-20">
//         <div className="flex justify-between items-end mb-12">
//           <div>
//             <h2 className="text-4xl font-bold text-foreground">Featured Products</h2>
//             <p className="text-foreground/50 mt-2">Discover our best-selling tech.</p>
//           </div>
//           {/* <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
//             See All Store <ArrowRight />
//           </button> */}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }