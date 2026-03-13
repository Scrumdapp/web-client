import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

export default function Layout({ children }: PropsWithChildren) {    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        )
};