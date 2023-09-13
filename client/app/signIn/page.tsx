"use client";

import { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <section className="mx-auto w-[20%] py-16 flex flex-col gap-5">
      <div className="">
        <h1 className="text-black font-bold text-3xl">LOGIN</h1>
      </div>
      <form onSubmit={handleLogin} className="text-black flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="police_station" className="font-semibold text-sm">
            Police Station Code
          </label>
          <input
            className="outline-none placeholder:text-sm rounded-sm w-full border border-gray-200 px-3 py-1"
            type="text"
            name="police_station"
            id="police_station"
            placeholder="E.g. PSC-001"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <div className="flex rounded-sm border border-gray-200 px-3 py-1 gap-2">
            <input
              className="outline-none placeholder:text-sm  w-full  "
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            <button
              className="focus:outline-none text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        <button
          className="bg-primary text-white py-3 rounded-md hover:bg-primaryDark transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default SignIn;
