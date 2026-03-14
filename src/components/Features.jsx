import { FiShield, FiZap, FiSettings, FiGlobe } from "react-icons/fi";

const features = [
  { icon: <FiShield />, title: "Secure", desc: "Military grade encryption" },
  { icon: <FiZap />, title: "Fast", desc: "Zero-latency streaming" },
  { icon: <FiSettings />, title: "Smart", desc: "AI Powered automation" },
  { icon: <FiGlobe />, title: "Global", desc: "Control from anywhere" },
];

export default function Features() {
  return (
    // <div className="py-20 bg-background text-foreground ">
    <div className="py-20 text-foreground bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">

      {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Our Features
          </h2>
          <p className="mt-4 text-foreground/60 text-sm md:text-base max-w-2xl mx-auto">
            Discover powerful tools designed to make your experience faster, smarter, and more secure.
          </p>
        </div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">

        {features.map((f, i) => (
          <div key={i} className="group p-8 rounded-[32px] bg-muted border border-border hover:bg-card hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-3xl text-primary mb-4 bg-primary/10 w-fit p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
              {f.icon}
            </div>
            <h4 className="text-xl font-bold text-foreground mb-2">{f.title}</h4>
            <p className="text-foreground/50 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}