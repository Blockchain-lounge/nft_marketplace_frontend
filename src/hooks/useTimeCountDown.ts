import { useState, useEffect } from "react";

export const useTimeCountDown = (date: string) => {
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
      let remainingDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let remainingHours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let remainingMinutes = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      let remainingSeconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (
        remainingDays < 0 &&
        remainingHours < 0 &&
        remainingMinutes < 0 &&
        remainingSeconds < 0
      ) {
        setTime({
          ...time,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTime({
        ...time,
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return { time };
};
