"use client";

import {SignOutButton, useClerk} from "@clerk/nextjs";
import Link from "next/link";
import {FC} from "react";


interface Props {
    children: React.ReactNode;
}
const Navbar: FC<Props> = ({ children }) => {
    const { user } = useClerk();
    if (!user) return null;

    return (
        <div className="drawer min-h-screen">
            <div className="drawer-content flex flex-col h-full">
                {/* Navbar */}
                <div className="navbar bg-base w-full flex justify-between px-5 md:px-12 py-5 shadow">
                    <Link href="/">
                        <h1 className="font-kalnia text-primary text-3xl">VMNKK</h1>
                    </Link>

                    <div className="hidden flex-none md:block">
                        <ul className="hidden md:flex gap-5 items-center">
                            <SignOutButton redirectUrl="/sign-in">
                                <button className="btn btn-primary btn-small">
                                    Sign out
                                </button>
                            </SignOutButton>
                        </ul>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Navbar;
