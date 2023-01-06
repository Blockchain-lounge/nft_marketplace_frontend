import { useState, useEffect } from "react";

export const useTimeCountDown = (date = "January 6, 2023") => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Set the end date here
      const endDate = new Date(date).getTime();
      // Get the current time
      const currentTime = new Date().getTime();
      // Calculate the time left
      const timeLeft = endDate - currentTime;
      // Calculate the days, hours, minutes, and seconds left
      setTime({
        ...time,
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return { time };
};
