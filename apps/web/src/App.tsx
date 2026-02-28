import './App.css';
import "@repo/tailwind-config/theme.css";
import * as React from "react";

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="flex flex-col h-screen justify-center items-center text-center bg-fg3">
                <h1 className="text-4xl text-bg_h font-bold ">Hallo van Scrumdapp</h1>
                <p className="py-4 text-bg1">Deze pagina maakt nu gebruik van de thema's /packages/tailwind-config (:</p>
            </div>
        )
    }
}