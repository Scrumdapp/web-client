import * as React from "react";
import Checkin from "../components/checkins/Checkin.tsx";

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <div className="flex flex-col h-screen justify-center items-center text-center bg-bg">
                    <Checkin groupId={1} />
                </div>
            </div>



        )
    }
}