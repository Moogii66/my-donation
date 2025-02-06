"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import AddModal from "@/components/AddModal";
import Image from "next/image";
import CountUp from "react-countup";

interface MainItemType {
  name: string;
  amount: number;
  imageUrl: string;
}

export default function Home() {
  const [data, setData] = useState<MainItemType[]>([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState("");

  // Using ref to store old total to prevent unnecessary re-renders
  const oldTotalRef = useRef(0);

  const totalAmount = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  );

  const maxAmountItem = useMemo(
    () =>
      data.length > 0
        ? data.reduce((prev, current) =>
            prev.amount > current.amount ? prev : current
          )
        : null,
    [data]
  );

  const getData = useCallback(() => {
    const _data = JSON.parse(localStorage.getItem("data") || "[]");

    // Store old total before updating data
    oldTotalRef.current = totalAmount;

    setData(_data);
    console.log("_data :>> ", _data);
  }, [totalAmount]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    localStorage.removeItem("data");
    setTimeout(() => {
      getData();
    }, 200);
  };

  const handleButton = () => {
    setVisible(false);
    if (name !== "" && amount !== "") {
      const newItem = {
        name,
        amount: parseFloat(amount),
        imageUrl,
      };
      const _temp: MainItemType[] = JSON.parse(
        localStorage.getItem("data") || "[]"
      );

      oldTotalRef.current = totalAmount; // Store old total before updating data
      _temp.push(newItem);
      localStorage.setItem("data", JSON.stringify(_temp));

      setTimeout(() => getData(), 200);
    }

    setName("");
    setAmount("");
    setImageUrl("");
  };

  function Number({ n }: { n: number }) {
    const [prevTotal, setPrevTotal] = useState(oldTotalRef.current);

    useEffect(() => {
      setPrevTotal(oldTotalRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oldTotalRef.current]); // Update only when `oldTotal` changes

    return (
      <CountUp
        start={prevTotal}
        end={n}
        duration={3} // Slow down animation
        separator=","
        suffix=" ₮"
        redraw={true}
      />
    );
  }

  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div className="border border-cyan-300 w-screen h-screen grid grid-cols-4">
        <div className="border border-red-700 col-span-1 flex flex-col items-center gap-4 p-4">
          {data.map((item, index) => {
            if (item.imageUrl !== "") {
              return (
                <Image
                  key={index}
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              );
            }
          })}
        </div>
        <div className="border border-cyan-200 col-span-2 flex flex-col items-center place-content-center font-bold text-48 p-4">
          {maxAmountItem && (
            <p className="text-lg font-semibold">
              Top Item: {maxAmountItem.name} -{" "}
              {formatAmount(maxAmountItem.amount)} ₮
            </p>
          )}
          <Number n={totalAmount} />
        </div>
        <div className="border border-red-700 col-span-1 flex flex-col items-center p-4 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between w-full p-2 border-b"
            >
              <span>{item.name}</span>
              <span>{formatAmount(item.amount) + " ₮&"}</span>
            </div>
          ))}
          <Button onClick={() => setVisible(true)}>add</Button>
        </div>
        {visible && (
          <AddModal
            name={name}
            setName={setName}
            amount={amount}
            setAmount={setAmount}
            onClose={() => handleButton()}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        )}
      </div>
      <Button onClick={() => handleClear()}>clear</Button>
    </div>
  );
}
