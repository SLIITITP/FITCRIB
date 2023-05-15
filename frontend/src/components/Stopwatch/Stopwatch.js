import { useEffect, useState } from "react";
import "./StopwatchStyles.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(null);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const handleStartAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const handleReset = () => {
    setTime(0);
  };

  const handleEnd = () => {
    setIsRunning(false);
    console.log(time);
    setTotalTime(time);
    handleReset();
  };

  return (
    <div className="Stopwatch">
      <div className="clock">
        <div className="timer-container">
          <div className="stripes">
            <div className="timer">
              {hours}:{minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}:
              {milliseconds.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="spacer" />
        <div className="button-container">
          <div>
            <button
              type="button"
              className="btn btn-primary Stopwatch"
              onClick={handleStartAndStop}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
          </div>
          <div>
          <button  type="button" className="btn btn-danger Session" onClick={handleReset}>Reset</button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary Stopwatch"
              onClick={handleEnd}
            >
              End Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
