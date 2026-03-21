
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, ChevronLeft, Share2, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/products/productApi";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../features/cart/cartApi";
import { ImSpinner2 } from "react-icons/im";


export default function ProductDetail()  {

  // Mock Data
  // const product = {
  //   id: 1,
  //   name: "Magic Leap One",
  //   category: "VR Glasses / AR Headset",
  //   price: 2295,
  //   rating: 4.8,
  //   reviews: 124,
  //   description: "Experience the next generation of spatial computing. The Creator Edition is designed for pioneers who want to bridge the gap between digital and physical worlds with high-fidelity lightfield technology.",
  //   colors: [
  //     { name: "Slate", hex: "#4A4A4A" },
  //     { name: "Silver", hex: "#C0C0C0" },
  //     { name: "Midnight", hex: "#000000" },
  //   ],
  //   sizes: ["Standard", "Large"],
  //   images: [
  //     "https://res.cloudinary.com/doebgagxy/image/upload/v1773069687/ekncmvjv4cnzmtdngajj.jpg",
  //     "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
  //   ],
  // };

const { id } = useParams();
const { data: product, isLoading, error } = useGetProductByIdQuery(id);
const images = product?.product_images?.map((img) => img.image) || [];
const [quantity, setQuantity] = useState(1);
const [activeImg, setActiveImg] = useState(0);
const [isWishlisted, setIsWishlisted] = useState(false);
const navigate = useNavigate();
const variants = product?.variants || [];
// const colors = [];
// const sizes = [];


// variants?.forEach((variant) => {
//   variant.attributes.forEach((attr) => {
//     const [type, value] = attr.split(" -");

//     if (type === "Color") {
//       colors.push({
//         name: value,
//         hex: "#d35d5dff", // default color
//         variantId: variant.id,
//         stock: variant.stock,
//         price: variant.price,
//       });
//     }

//     if (type === "Size") {
//       sizes.push({
//         name: value,
//         variantId: variant.id,
//         stock: variant.stock,
//         price: variant.price,
//       });
//     }
//   });
// })


// store all variants with parsed attributes
const parsedVariants = variants.map((variant) => {
  let color = null;
  let size = null;

  variant.attributes.forEach((attr) => {
    const [type, value] = attr.split(" -");

    if (type === "Color") color = value;
    if (type === "Size") size = value;
  });

  return {
    id: variant.id,
    color,
    size,
    price: variant.price,
    stock: variant.stock,
  };
});


console.log("parsed Variant ",parsedVariants)
const colors = [...new Set(parsedVariants.map((v) => v.color).filter(Boolean))];
const sizes = [...new Set(parsedVariants.map((v) => v.size).filter(Boolean))];



const [selectedColor, setSelectedColor] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);

const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();

// const selectedVariant =
//   selectedColor?.variantId || selectedSize?.variantId || null;

// const selectedVariant = parsedVariants.find( (v) =>
//     (selectedColor ? v.color === selectedColor : true) &&
//     (selectedSize ? v.size === selectedSize : true)
// );

const selectedVariant = parsedVariants.find((v) => {
  if (product.has_variants) {
    if (v.color && v.size) {
      return v.color === selectedColor && v.size === selectedSize;
    }
    if (v.color) {
      return v.color === selectedColor;
    }
    if (v.size) {
      return v.size === selectedSize;
    }
  }
  return false;
});

console.log("Selected Variant", selectedVariant)

const displayPrice =
  selectedVariant?.price || product?.price;


console.log ("Selected variant Price", displayPrice)



const handleAddToCart = async () => {

  if (product.has_variants && !selectedVariant) {
  alert("Please select a variant");
  return;
}

  try {

    const payload = selectedVariant
      ? {
          product: product.id,
          // variant_id: selectedVariant, // the previous 
          variant_id: selectedVariant.id,

          quantity: quantity,
        }
      : {
          product: product.id,
          quantity: quantity,
        };

    await addToCart(payload).unwrap();

    alert("Added to cart successfully");

  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};

if (isLoading) return <p className="p-10">Loading product...</p>;

if (error) return <p className="p-10 text-red-500">Error loading product</p>;



  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center gap-2 font-bold text-sm hover:opacity-70 transition" onClick={() => navigate("/")}>
            <ChevronLeft size={20} />
            Back to Shop
          </button>
          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-muted border border-border hover:bg-primary hover:text-white transition">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Image Section (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              layoutId="product-img"
              className="relative bg-card border border-border rounded-[40px] aspect-square flex items-center justify-center overflow-hidden shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  // src={product.images[activeImg]}
                  src={images[activeImg]}
                  className="w-4/5 h-4/5 object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-90"
                />
              </AnimatePresence>
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {/* {product.images.map((img, idx) => ( */}
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all ${
                    activeImg === idx ? "border-primary scale-105" : "border-border opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info Section (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                {/* {product.category} */}
                {product.category?.category}
               
              </span>
              <div className="flex items-center gap-2 mt-4 text-yellow-500">
                <Star size={16} fill="currentColor" />
                {/* <span className="text-foreground font-bold">{product.rating}</span> */}
                <span className="text-foreground font-bold">{product.average_rating}</span>

                <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-foreground mb-4">
              {product.name}
            </h1>

            <p className="text-4xl font-bold text-foreground mb-8">
              {/* £ {product.price.toLocaleString()} */}
              Birr {Number(displayPrice).toLocaleString()}
            </p>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg mb-10">
              {product.description}
            </p>

            <div className="space-y-10">
              {/* Color Selection */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-60">colors</h4>
                <div className="flex gap-4">
                  {/* {product.colors.map((color) => ( */}
                  {colors.map((color) => (
                   
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === color ? "border-primary scale-110" : "border-transparent"
                      }`}
                    >
                      <span 
                        className="w-8 h-8 rounded-full shadow-inner" 
                        style={{ backgroundColor: `${color}` }}
                        // style={{ backgroundColor: color.hex }}
                      />
                      <span className="absolute -top-5 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-60">Fit System</h4>
                <div className="flex gap-3">
                  
                 {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-8 py-3 rounded-2xl border-2 font-bold transition-all ${
                        selectedSize === size
                          ? "bg-primary border-primary text-white" 
                          : "bg-card border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Wishlist */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center bg-muted rounded-2xl p-2 border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-primary transition"><Minus size={18}/></button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-primary transition"><Plus size={18}/></button>
                </div>
                
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-bold transition-all ${
                    isWishlisted ? "bg-red-500/10 border-red-500 text-red-500" : "border-border hover:border-red-400"
                  }`}
                >
                  <Heart fill={isWishlisted ? "currentColor" : "none"} size={20} />
                  {isWishlisted ? "Saved" : "Add to Wishlist"}
                </button>
              </div>

              {/* Final Action */}
              <button 
                 onClick={handleAddToCart}
                 disabled={cartLoading}  
                className="w-full bg-primary text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >

                  {cartLoading? (

                    <ImSpinner2 className="animate-spin" size={22} />

                  ): <>
                      <ShoppingBag size={24} />
                         {/* Add to Cart • Birr {(product.price * quantity).toLocaleString()} */}
                        Add to Cart • Birr {Number(
                                        // selectedColor?.price * quantity ||
                                        // selectedSize?.price * quantity ||
                                        // product.price * quantity
                                        displayPrice*quantity
                                      ).toLocaleString()}


                   </>}


                
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border text-center">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">Shipping</p>
                <p className="text-xs font-bold">Free Worldwide</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border text-center">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">Warranty</p>
                <p className="text-xs font-bold">24 Months Official</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


