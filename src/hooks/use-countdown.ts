import { useEffect, useState, useCallback } from "react";

export function useCountdown(initial: number = 60) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const start = useCallback(() => {
    setTimeLeft(initial);
  }, [initial]);

  return { timeLeft, start, isCounting: timeLeft > 0 };
}
