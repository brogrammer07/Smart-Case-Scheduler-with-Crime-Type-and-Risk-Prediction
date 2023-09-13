"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="bg-white h-24 border-b border-gray-200 flex items-center px-20 justify-between">
      <Image
        src="/assets/images/logo.png"
        alt="Case Schedular"
        width={200}
        height={100}
        className="object-contain"
      />
      {session?.user && (
        <div className="flex items-center gap-6">
          <div className="">
            <div className="flex items-center gap-2">
              <h1 className="font-bold">PS:</h1>
              <p>{session.user.name}</p>
            </div>
          </div>
          <div onClick={() => signOut()} className="cursor-pointer">
            <BiLogOut size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
