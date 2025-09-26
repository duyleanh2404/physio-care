"use client";

import Link from "next/link";
import Image from "next/image";

import { useMe } from "@/react-query/query/users/useMe";

import { Hint } from "../Hint";
import { UserButton } from "../UserButton";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../LoadingSpinner";

export function Header() {
  const { data: user, isPending } = useMe();

  return (
    <header>
      <div className="wrapper w-full h-full flex items-center justify-between">
        <Hint content="Trang chủ">
          <Link href="/" className="flex items-center gap-3">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h1 className="text-xl font-extrabold">PhysioCare</h1>
          </Link>
        </Hint>
        {isPending ? (
          <LoadingSpinner size={6} />
        ) : user ? (
          <UserButton user={user} />
        ) : (
          <Button asChild>
            <Link href={"/login"}>Đăng nhập</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
