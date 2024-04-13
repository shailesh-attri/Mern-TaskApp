import React, { useState, useEffect } from "react";

export function TimeLeft({ createdAt, deadline }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = new Date(deadline) - new Date();
      if (difference <= 0) {
        setTimeLeft("Deadline passed");
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}:${minutes}:${seconds} left`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return <span className={timeLeft === "Deadline passed" ? "text-red-500" : "text-gray-500"}>{timeLeft}</span>;
}