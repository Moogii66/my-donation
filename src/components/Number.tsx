"use client";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

interface NumberProps {
  n: number;
}

export default function Number({ n }: NumberProps) {
  const [prevTotal, setPrevTotal] = useState(n);

  useEffect(() => {
    if (n !== prevTotal) {
      setPrevTotal(prevTotal); // Keep old value for animation
      setTimeout(() => {
        setPrevTotal(n); // Update to new total after delay
      }, 1000);
    }
  }, [n]);

  return (
    <div
      className="tracking-wide  drop-shadow-lg"
      style={{ fontFamily: "Inter, sans-serif", fontWeight: 900 }}
    >
      <CountUp
        start={prevTotal} // Animate from previous total
        end={n} // Animate to new total
        duration={5} // Animation duration in seconds
        separator=","
        suffix=" ₮"
        redraw={true}
      />
    </div>
  );
}
