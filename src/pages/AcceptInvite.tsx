export default function AcceptInvite() {
    return(
        <div className="app-container">
            <h1>You're invited to -group-!</h1>
            <p>Enter your given password underneath.</p>
               <div className="w-7/10">
                    <div className="py-3">
                        <input className="write-section w-full!" />
                    </div>
                    <div>
                        <button  className="btn btn-secondary border flex float-right">
                            Join
                        </button>
                    </div>
               </div>
        </div>

    )
}