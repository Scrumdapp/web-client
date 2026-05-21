import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

export default function Layout({ children }: PropsWithChildren) {    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
        </div>
        )
};