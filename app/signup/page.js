"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../events/severActions";
export default function Signup() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(credentials);
      console.log("res", res);
      if (res.error) {
        console.log("error", res.error);
        return;
      }
      router.push("/api/auth/signin");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen bg-slate-900 text-white">
      <div className="w-1/2 flex flex-col bg-slate-950  rounded-xl py-10">
        <h1 className="text-3xl text-center uppercase font-bold">Signup</h1>
        <div className="flex justify-center">
          <form className="flex flex-col text-xl w-1/2" onSubmit={onSubmit}>
            <label className="p-1 pl-2 ">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="Enter your email"
              className="p-1 pl-2 my-1 text-base  rounded-lg bg-black/30"
            />
            <label className="p-1 pl-2 ">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter your password"
              className="p-1 pl-2 my-1  rounded-lg bg-black/30 text-base"
            />
            <div className="flex items-center justify-center w-full">
              <button className="m-1 border-2 p-1 rounded-xl hover:bg-slate-800 hover:border-slate-300 ">
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center my-2 text-sm">
          Click here for
          <Link
            href="/api/auth/signin"
            className="underline text-blue-600 px-1"
          >
            {" "}
            signin
          </Link>
        </div>
      </div>
    </div>
  );
}
