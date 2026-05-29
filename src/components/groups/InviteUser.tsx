export default function InviteUser() {
    return (
        <div>
            <h1>Invite others to group</h1>
            <p>Copy and share the generated link with your team. Enjoy Scrumdapp</p>
            <div className="py-5 flex flex-nowrap justify-between items-center">
                <p>Link:</p>
                <input className="write-section !w-7/10" />
            </div>
            <div className="flex flex-nowrap float-right space-x-3">
                <button className="btn btn-secondary border">
                    Copy
                </button>
                <button className="btn border">
                    Done?
                </button>
            </div>
        </div>

    )
}
