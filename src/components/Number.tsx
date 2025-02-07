"use client";
import React, { useRef, useEffect } from "react";
import CountUp from "react-countup";

interface NumberProps {
  n: number;
}

export default function Number({ n }: NumberProps) {
  const prevTotalRef = useRef(n); // Store previous total

  useEffect(() => {
    if (prevTotalRef.current !== n) {
      prevTotalRef.current = n; // Update only when `n` changes
    }
  }, [n]);

  return (
    <CountUp
      start={prevTotalRef.current}
      end={n}
      duration={3}
      separator=","
      suffix=" ₮"
      redraw={true}
    />
  );
}
