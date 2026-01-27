import RegisterForm from "@/components/auth/Register";
import Image from "next/image";
import register from "@/assets/images/register.png";


const RegisterPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={register}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>


      {/* Register Form Card */}
      <div className="relative z-10 w-full max-w-[1100px]">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
