import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {backgroundContext} from "../../js/context/background/backgroundContext.ts";
import {BackgroundProvider} from "../../js/context/background/BackgroundProvider.tsx";

export default function Layout({ children }: PropsWithChildren) {
    
    const BackgroundConsumer = backgroundContext.Consumer
    return (
        <BackgroundProvider initialBackground={"1"}>
            <BackgroundConsumer>
                {ctx => (
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1 flex flex-col">{children}</main>
                        <Footer />
                        <img src={`/backgrounds/${ctx?.background ? ctx.background : '1'}.webp`} className="fixed object-cover right-0 left-0 top-0 bottom-0 w-full h-full -z-1 opacity-15" alt="background" />
                    </div>
                )}
            </BackgroundConsumer>
        </BackgroundProvider>
    )
}
