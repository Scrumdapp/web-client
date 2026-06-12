import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <img src={"/backgrounds/1.webp"} className="absolute bg-cover right-0 left-0 top-0 bottom-0 -z-1 opacity-15" alt="background" />
        </div>
    )
}
