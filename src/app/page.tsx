"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Number from "@/components/Number"; // Import Counter Component

// import logo from "../../public/jcilogo_2.png";
import classNames from "classnames";
// import logo1 from "../../public/jcilogo_1.png";

interface MainItemType {
  name: string;
  amount: number;
  imageUrl: string;
}

export default function Home() {
  const [data, setData] = useState<MainItemType[]>([]);
  const [oldTotal, setOldTotal] = useState(0); // Store old total for animation
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  // Calculate total donation amount
  const totalAmount = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  const maxAmountItem = useMemo(
    () =>
      data.length > 0
        ? data.reduce((prev, current) =>
            prev.amount > current.amount ? prev : current,
          )
        : null,
    [data],
  );

  // Fetch data from localStorage
  const getData = useCallback(() => {
    const _data = JSON.parse(localStorage.getItem("GANG_DATA") || "[]");
    setData(_data);

    // Scroll to the bottom when new data is added
    if (imageContainerRef.current) {
      setTimeout(() => {
        imageContainerRef.current?.scrollTo({
          top: imageContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
  }, []);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 5000); // Auto-fetch data every 5 seconds

    return () => clearInterval(interval);
  }, [getData]);

  useEffect(() => {
    if (totalAmount !== oldTotal) {
      setOldTotal(totalAmount); // Ensure oldTotal updates for animation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat  bg-p mb-"
      style={{
        // backgroundImage: "url('/background.jpg')",
        backgroundImage: "url('/back3.png')",
        // backgroundPosition: "-4px center",
        // backgroundPosition: "25px center",
      }} // Using an image from `public`
    >
      {/* Background Color Overlay */}
      <div className="absolute inset-0 bg-black/5"></div>

      <div className="w-screen h-screen grid grid-cols-4">
        {/* Image container with auto-scrolling */}
        <div
          ref={imageContainerRef}
          className=" col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto z-10"
        >
          <div className="font-extrabold text-24 text-white">Хандивлагчид</div>

          {/* Image Container with Background Blur */}
          <div className="relative w-full h-[calc(100vh-100px)] overflow-auto  rounded-2xl border">
            {/* Background overlay with blur effect */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl z-0"></div>

            {/* Foreground content */}
            {/* <div className="relative z-10 w-full animate-scrollUp p-4"> */}
            <div
              className={classNames(
                "relative w-full z-10 p-4 ",
                // "relative w-full z-10 pt-24",
                data.length > 4 ? "animate-scrollUp" : "",
              )}
            >
              {data.map((item, index) => {
                if (item.imageUrl !== "") {
                  return (
                    <div key={index} className="w-full mb-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-2xl w-full object-contain"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Center panel for total donation */}
        <div className=" col-span-2 flex flex-col gap-4 p-4 h-screen overflow-auto font-bold text-48 z-10 ">
          <div className=" h-[30%] justify-center items-center flex">
            {/* <Image
              src={logo}
              alt={"adsds"}
              width={1000}
              height={1000}
              className="rounded-2xl w-[600px] object-contain transition-opacity-100"
            /> */}
          </div>
          <div className=" h-[70%] flex justify-center items-center  ">
            <div className="  w-full mx-28 p-10 rounded-2xl bg-black/50 backdrop-blur-sm">
              <p className="text-32 font-semibold  text-center text-white">
                Нийт хандив
              </p>
              <div className="flex justify-center text-white">
                <Number n={totalAmount} />
              </div>
            </div>
          </div>
        </div>

        {/* Right-side donation list */}
        <div className="col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto z-10">
          {maxAmountItem && (
            <div className=" w-full bg-black/50 text-white p-4 rounded-2xl z-10 border">
              <div className="font-bold text-20 text-center">
                Шилдэг Хандивлагч
              </div>
              <div className="font-bold text-20">{maxAmountItem.name}</div>
              <div className="font-bold text-20">
                {maxAmountItem.amount.toLocaleString()} ₮
              </div>
            </div>
          )}

          <div className=" font-extrabold text-24 text-white">Хандив</div>
          {/* Container with Background Blur */}
          <div className="relative w-full h-[calc(100vh-100px)] overflow-auto border rounded-2xl">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

            {/* Keep the Top Donator Fixed */}

            {/* Scrolling Donation List */}
            <div
              className={classNames(
                "relative w-full z-10 pt-4",
                // "relative w-full z-10 pt-24",
                data.length > 20 ? "animate-scrollUp" : "",
              )}
            >
              {data.map((item, index) => (
                <div key={index} className="justify-between w-full px-3 pb-4">
                  <div className="flex ">
                    <div className="font-regular flex w-[50%] items-center text-white">
                      {item.name}
                    </div>
                    <div className="font-extrabold  text-20 flex w-[50%] justify-end items-center text-white">
                      {item.amount.toLocaleString()} ₮
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-white/50 mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="mt-4 flex gap-4 justify-center">
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={() => router.push("/donate")}>Add Donation</Button>
      </div> */}
    </div>
  );
}
