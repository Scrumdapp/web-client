import * as React from "react";
import Checkin from "../components/Checkin.tsx";

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <div className="flex flex-col h-screen justify-center items-center text-center bg-fg3">
                    <Checkin />
                </div>
            </div>



        )
    }
}