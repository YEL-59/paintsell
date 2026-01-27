import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import signin from "@/assets/images/signin.png";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={signin}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to match the darkened/blurred look if needed */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Login Form Card */}
      <div className="relative z-10 w-full max-w-[1000px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
