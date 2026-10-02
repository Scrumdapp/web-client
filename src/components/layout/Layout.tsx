import type { PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import { BackgroundProvider } from "../../js/context/background/BackgroundProvider.tsx";
import { useCurrentBackground } from "../../js/context/background/hooks.ts";
import { useTranslation } from "react-i18next";
import FooterMobile from "./FooterMobile.tsx";
import HeaderMobile from "./HeaderMobile.tsx";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <BackgroundProvider initialBackground={"1"}>
      <div className="min-h-screen flex flex-col">
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="block md:hidden">
          <HeaderMobile />
        </div>
        <main className="flex-1 flex flex-col">{children}</main>
        <div className="hidden md:block">
          <Footer />
        </div>
        <div className="block md:hidden">
          <FooterMobile />
        </div>
        <BackgroundDisplayer />
      </div>
    </BackgroundProvider>
  );
}

function BackgroundDisplayer() {
  const bg = useCurrentBackground();
  const { t } = useTranslation();
  return (
    <img
      src={`/backgrounds/${bg ?? "1"}.webp`}
      className="fixed object-cover right-0 left-0 top-0 bottom-0 w-full max-w-full h-full -z-1 opacity-15"
      alt={t("settings.background.header")}
    />
  );
}
