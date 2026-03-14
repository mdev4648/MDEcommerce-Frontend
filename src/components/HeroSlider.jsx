import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1555617117-08fda5f4f3f5",
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
  "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9",
];

export default function HeroSlider() {
  return (
    <div className="mt-16 overflow-hidden">

      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >

        {[...images, ...images].map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="min-w-[250px] md:min-w-[350px] h-[300px] md:h-[420px] rounded-[60px] overflow-hidden"
          >
            <img
              src={img}
              alt="electronics"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

      </motion.div>

    </div>
  );
}