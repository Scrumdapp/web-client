import './index.css'
import './stylesheet.css'
import "tailwindcss";
import * as React from "react";

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="flex flex-col h-screen justify-center items-center text-center bg-fg3">
            <button className="btn">Hallo</button>
            </div>
        )
    }
}