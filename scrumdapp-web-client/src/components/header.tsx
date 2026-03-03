export default function Header() {
        return (<body className="bg-gray-100">

        <nav className="bg-liniear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="shrink-0 text-white text-2xl font-bold">
                        MyBrand
                    </div>


                    <div className="hidden md:flex space-x-6 text-white font-medium">
                        <a href="#" className="hover:text-yellow-300 transition">Home</a>
                        <a href="#" className="hover:text-yellow-300 transition">About</a>
                        <a href="#" className="hover:text-yellow-300 transition">Services</a>
                        <a href="#" className="hover:text-yellow-300 transition">Contact</a>
                    </div>


                    <div className="hidden md:block">
                        <a href="#"
                           className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold">
                            Get Started
                        </a>
                    </div>


                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-white focus:outline-none text-2xl">
                            ☰
                        </button>
                    </div>
                </div>
            </div>


            <div id="mobile-menu" className="md:hidden hidden px-4 pb-4 space-y-2 text-white font-medium">
                <a href="#" className="block hover:text-yellow-300 transition">Home</a>
                <a href="#" className="block hover:text-yellow-300 transition">About</a>
                <a href="#" className="block hover:text-yellow-300 transition">Services</a>
                <a href="#" className="block hover:text-yellow-300 transition">Contact</a>
                <a href="#"
                   className="block bg-white text-indigo-700 text-center px-4 py-2 rounded-xl hover:bg-yellow-300 transition-all font-semibold mt-2">
                    Get Started
                </a>
            </div>
        </nav>

        <script>

        </script>

        </body>)
    }