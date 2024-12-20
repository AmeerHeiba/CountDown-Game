import { useState , useRef } from "react";
import ResultModal from "./ResultModal";


export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);

    function handleStartChallenge() {
        setTimerStarted(true);
        setStartTime(Date.now()); // Record the start time
        timer.current = setTimeout(() => {
            dialog.current.open();
            setTimerExpired(true);
            setTimerStarted(false);
            setTimeTaken(targetTime); // Set time taken to target time if expired
        }, targetTime * 1000);
    }

    function handleEndChallenge() {
        clearTimeout(timer.current);
        const elapsed = (Date.now() - startTime) / 1000; // Calculate elapsed time in seconds
        setTimeTaken(elapsed.toFixed(2)); // Record elapsed time (2 decimal places)
        dialog.current.open();
        setTimerStarted(false);
        setTimerExpired(false);
    }

    return (
    <>
            <ResultModal
                ref={dialog}
                result={timerExpired ? "lost" : "won"}
                targetTime={targetTime}
                timeTaken={timeTaken}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                {timerExpired && <p className="challenge-expired">Challenge Expired</p>}
                <p className={timerStarted ? "active" : ""}>{timerStarted ? "Running" : "Not Running"}</p>
                <p>
                    <button onClick={timerStarted ? handleEndChallenge : handleStartChallenge}>
                        {timerStarted ? "Stop" : "Start"} Challenge
                    </button>
                </p>
            </section>
    </>
    )
}