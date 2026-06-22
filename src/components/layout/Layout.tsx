import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {BackgroundProvider} from "../../js/context/background/BackgroundProvider.tsx";
import {useCurrentBackground} from "../../js/context/background/hooks.ts";

export default function Layout({ children }: PropsWithChildren) {

    return (
        <BackgroundProvider initialBackground={"1"}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col">{children}</main>
                <Footer />
                <BackgroundDisplayer />
            </div>
        </BackgroundProvider>
    )
}


function BackgroundDisplayer() {
    const bg = useCurrentBackground()

    return (
        <img src={`/backgrounds/${bg ?? "1"}.webp`} className="fixed object-cover right-0 left-0 top-0 bottom-0 w-full h-full -z-1 opacity-15" alt="background" />
    )
}