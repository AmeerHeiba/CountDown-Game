
import { useImperativeHandle, useRef } from "react"

export default function ResultModal({ ref,result, targetTime, timeTaken }) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return{
            open() {dialog.current.showModal()}
        }
    });
    return (
        <dialog ref={dialog} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was {targetTime} seconds</p>
            <p>You took <strong>{timeTaken}</strong> seconds</p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
}