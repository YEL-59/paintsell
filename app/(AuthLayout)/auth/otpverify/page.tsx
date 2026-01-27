import OtpVerifyForm from "@/components/auth/OtpVerifyForm";
import Image from "next/image";
import verification from "@/assets/images/verification.png";

const OtpVerifyPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={verification}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* OTP Form Card */}
      <div className="relative z-10 w-full max-w-[1000px]">
        <OtpVerifyForm />
      </div>
    </div>
  );
};

export default OtpVerifyPage;