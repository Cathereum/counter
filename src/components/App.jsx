import { useEffect, useRef, useState } from "react";
import "./App.css";

const setDefoultValue = () => {
  const userCount = localStorage.getItem("count");
  return userCount ? +userCount : 0;
};

function App() {
  const [count, setCount] = useState(setDefoultValue());
  const [isCounting, setIsCounting] = useState(false);
  const timerIdRef = useRef(null);

  const handleReset = () => {
    setCount(0);
    setIsCounting(false);
  };

  const handleStart = () => {
    setIsCounting(true);
  };

  const handleStop = () => {
    setIsCounting(false);
  };

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [isCounting]);

  return (
    <>
      <div>React timer</div>
      <h3>{count}</h3>
      {!isCounting ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
