import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={100} height={30} alt="logo" />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link className="font-bold" href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>

              <Link
                className="border px-4 rounded hover:bg-slate-200 transition"
                href="startup/create"
              >
                Create
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  className="cursor-pointer border px-4 rounded hover:bg-slate-200 transition"
                  type="submit"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                className="cursor-pointer border px-4 rounded hover:bg-slate-200 transition"
                type="submit"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
