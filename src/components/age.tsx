"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface AgeProps {
  beggining: number;
}

export const Age = ({ beggining = 939790800000 }: AgeProps) => {
  const [age, setAge] = useState("");

  useEffect(() => {
    setInterval(() => {
      const age = dayjs()
        .diff(dayjs(beggining), "year", true)
        .toString()
        .substring(0, 12);
      setAge(age);
    }, 50);
  }, [beggining]);

  return age;
};
