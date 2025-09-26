import Link from "next/link";
import Image from "next/image";

import { Hint } from "@/components/global/Hint";
import { Separator } from "@/components/ui/separator";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { ContinueWithGoogle } from "@/components/auth/ContinueWithGoogle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <section className="wrapper max-w-[400px] min-h-screen flex flex-col items-center justify-center gap-6 py-10 mx-auto">
        <Hint content="Trang chủ">
          <Link href="/" className="flex items-center gap-3">
            <Image src={"/logo.svg"} alt="Logo" width={35} height={35} />
            <h1 className="text-2xl font-extrabold">PhysioCare</h1>
          </Link>
        </Hint>

        {children}

        <div className="w-full relative">
          <Separator orientation="horizontal" />
          <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm px-2 bg-white">
            hoặc
          </p>
        </div>

        <ContinueWithGoogle />

        <div className="text-xs text-center px-4">
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <Link href="/" className="text-primary hover:underline">
            Điều khoản sử dụng
          </Link>{" "}
          và{" "}
          <Link href="/" className="text-primary hover:underline">
            Chính sách bảo mật
          </Link>{" "}
          của PhysioCare.
        </div>
      </section>
    </AuthGuard>
  );
}
