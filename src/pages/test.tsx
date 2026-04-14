import Modal from "../components/generic/Modal.tsx";

export default function Test() {
    return (

        <div>
        <Modal
            title="New Group"
            onClose={() => setOpen(false)}
            actions={
                <>
                    <button onClick={() => setOpen(false)} className="btn border">Cancel</button>
                    <button onClick={() => setOpen(false)} className="btn border">Submit</button>
                </>
            }
        >

            <input className="w-full p-2 border rounded" />
            
        </Modal>
        </div>
    )
}


