import PasswordChangeForm from "@/components/auth/PasswordChangeForm";
import Image from "next/image";
import newpassword from "@/assets/images/newpassword.png";

const PasswordChangePage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={newpassword}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Password Change Form Card */}
      <div className="relative z-10 w-full max-w-[1000px]">
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default PasswordChangePage;
