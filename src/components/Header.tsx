import { useState } from "react";
import { Link } from "react-router-dom";


export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { to: "/public", label: "Home" },
        { to: "/groups", label: "Groups" },
    ];

        return (
    <div className="bg-bg">
        <nav className="pt-4 pb-7 px-2 flex flex-col">
            <div className="mx-auto px-4 lg:px-12 rounded-2xl bg-bg shadow-xl border footer w-11/12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="shrink-0 text-fg text-2xl font-bold">
                        <a href="/public">Scrumdapp</a>
                    </div>

                    <div className="hidden md:flex space-x-6 text-black font-medium">
                        {links.map((link, i) => (
                            <Link key={i} to={link.to} className="btn w-20">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a href="/login"
                           className="btn border btn-secondary">
                            Profile
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden"
                        >
                            ☰
                        </button>

                        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
                            <ul className="flex flex-col md:flex-row gap-4 mt-4">
                                <li>Home</li>
                                <li>About</li>
                                <li>Privacy</li>
                                <li>Groups</li>
                                <li>Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/*WORK IN PROGRESS, NEED TO LOOK AT THIS AT A LATER TIME, NOT AS IMPORTANT AS OF RIGHT NOW*/}
            <div id="mobile-menu" className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium">
                <a href="/public" className="block hover:text-yellow-300 transition">Home</a>
                <a href="/about" className="block hover:text-yellow-300 transition">About</a>
                <a href="/privacy" className="block hover:text-yellow-300 transition">Privacy</a>
                <a href="/groups" className="block hover:text-yellow-300 transition">Groups</a>
                <a href="/support" className="block hover:text-yellow-300 transition">Support</a>
                <a href="/login" className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2">
                    Log In</a>
            </div>
            </div>
        </nav>
        </div>)
    }