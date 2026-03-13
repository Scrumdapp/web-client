import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./css/Stylesheet.css"

async function tryEnableMocking() {
    if (!import.meta.env.DEV) {
        return
    }

    if (import.meta.env.USE_MOCKING_SERVER === "FALSE") {
        return
    }

    const { worker } = await import('../msw/worker.ts')
    return worker.start()
}

tryEnableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    )
})