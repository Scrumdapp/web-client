import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

export default function Layout({ children }: PropsWithChildren) {    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
        )
};