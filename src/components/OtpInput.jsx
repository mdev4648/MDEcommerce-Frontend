import { useRef } from "react";

export default function OtpInput({ value, onChange }) {

  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");

    if (!val) return;

    const newOtp = value.split("");
    newOtp[index] = val;

    const finalOtp = newOtp.join("");
    onChange(finalOtp);

    // move to next input
    if (index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = value.split("");
      newOtp[index] = "";
      onChange(newOtp.join(""));

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-3 ">

      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          maxLength="1"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg border border-border rounded-lg  focus:ring-2 focus:ring-primary dark:bg-gray-100"
        />
      ))}

    </div>
  );
}