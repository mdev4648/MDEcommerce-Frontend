import { useRef } from "react";

export default function OtpInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");

    if (!val) return;

    const otpArray = value.split("");
    otpArray[index] = val;

    const newOtp = otpArray.join("");
    onChange(newOtp);

    if (index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const otpArray = value.split("");
      otpArray[index] = "";
      onChange(otpArray.join(""));

      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  // Paste full OTP
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!paste) return;

    const otp = paste.slice(0, 6).split("");

    onChange(otp.join(""));

    otp.forEach((num, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = num;
      }
    });

    const lastIndex = otp.length - 1;
    inputs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          maxLength="1"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
        />
      ))}
    </div>
  );
}