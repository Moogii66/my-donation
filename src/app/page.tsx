"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import AddModal from "@/components/AddModal";
import Image from "next/image";
import CountUp from "react-countup";
import { Add } from "iconsax-react";

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
  const [oldTotal, setOldTotal] = useState(0);
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const maxAmountItem =
    data.length > 0
      ? data.reduce((prev, current) =>
          prev.amount > current.amount ? prev : current
        )
      : null;

  const getData = () => {
    const _data = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data")!)
      : [];
    if (_data.length !== 0) {
      setOldTotal(totalAmount);
      setData(_data);

      console.log("_data :>> ", _data);
    }
  };

  useEffect(() => {
    getData();
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
      const item = {
        name: name,
        amount: parseFloat(amount),
        imageUrl: imageUrl,
      };
      const _temp: MainItemType[] = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data")!)
        : [];
      setOldTotal(totalAmount);
      _temp.push(item);
      localStorage.setItem("data", JSON.stringify(_temp));
      setTimeout(() => {
        getData();
      }, 200);
    }

    setName("");
    setAmount("");
    setImageUrl("");
  };

  function Number({ n }: { n: number }) {
    return (
      <CountUp
        start={oldTotal}
        end={n}
        duration={1.5}
        separator=","
        // prefix="$"
        suffix=" ₮"
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
              <span>{formatAmount(item.amount) + " ₮"}</span>
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
