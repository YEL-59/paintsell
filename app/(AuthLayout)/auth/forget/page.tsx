import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import Image from "next/image";
import forgetpassword from "@/assets/images/forgetpassword.png";

const ForgetPasswordPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={forgetpassword}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Forget Password Form Card */}
      <div className="relative z-10 w-full max-w-[1000px]">
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
