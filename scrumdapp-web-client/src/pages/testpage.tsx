import * as React from "react";

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <div className="flex flex-col h-screen justify-center items-center text-center bg-fg3">
                    <textarea className="write-section resize-none" />
                    <button className="btn btn-main border m-2">Scrumdapp</button>
                </div>
            </div>



        )
    }
}