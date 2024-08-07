"use client";
import { useEffect, useState } from "react";

const getGreeting = (hours: number): string => {
  if (hours >= 5 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export default function DateDisplay() {
  const [greeting, setGreeting] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    setGreeting(getGreeting(hours));
    setCurrentDate(formatDate(date));
  }, []);

  return (
    <div className="w-full">
      {greeting ? (
        <div className="flex h-full flex-col justify-between gap-4">
          <p className="h-full w-full text-lg">
            <span className="font-light">{currentDate}</span>
          </p>
        </div>
      ) : (
        <div className="h-[200px] w-[500px]" />
      )}
    </div>
  );
}
