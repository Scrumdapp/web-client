import { useState } from "react";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

        return (<div className="bg-(--bg-primary) border-b border-(--colour-primary)">

        <nav className="bg-liniear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="shrink-0 text-(--colour-primary) text-2xl font-bold">
                        <a href="/public">Scrumdapp</a>
                    </div>


                    <div className="hidden md:flex space-x-6 text-black font-medium">
                        <a href="/public" className="btn btn-main ">Home</a>
                        <a href="/about" className="btn btn-main">About</a>
                        <a href="/privacy" className="btn btn-main">Privacy</a>
                        <a href="/groups" className="btn btn-main">Groups</a>
                        <a href="/support" className="btn btn-main">Support</a>
                    </div>


                    <div className="hidden md:block">
                        <a href="/login"
                           className="btn border btn-extra-actions">
                            Log In
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


            <div id="mobile-menu" className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium">
                <a href="/public" className="block hover:text-yellow-300 transition">Home</a>
                <a href="/about" className="block hover:text-yellow-300 transition">About</a>
                <a href="/privacy" className="block hover:text-yellow-300 transition">Privacy</a>
                <a href="/groups" className="block hover:text-yellow-300 transition">Groups</a>
                <a href="/support" className="block hover:text-yellow-300 transition">Support</a>
                <a href="/login" className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2">
                    Log In</a>
            </div>
        </nav>
        </div>)
    }