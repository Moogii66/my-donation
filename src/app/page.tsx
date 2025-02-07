"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Number from "@/components/Number"; // Import Counter Component

import logo from "../../public/jcilogo.png";
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
  const router = useRouter();

  // Calculate total donation amount
  const totalAmount = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  // Fetch data from localStorage
  const getData = useCallback(() => {
    const _data = JSON.parse(localStorage.getItem("data") || "[]");
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

  const handleClear = () => {
    localStorage.removeItem("data");
    setTimeout(() => {
      getData();
    }, 200);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }} // Using an image from the `public` folder
    >
      <div className="border border-cyan-300 w-screen h-screen grid grid-cols-4">
        {/* Image container with auto-scrolling */}
        <div
          ref={imageContainerRef}
          className="border border-red-700 col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto"
        >
          <div className="font-extrabold text-24">Хандивлагчид</div>

          {/* Image Container with Background Blur */}
          <div className="relative w-full h-[calc(100vh-100px)] overflow-auto border rounded-lg">
            {/* Background overlay with blur effect */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg z-0"></div>

            {/* Foreground content */}
            <div className="relative z-10 w-full animate-scrollUp p-4">
              {data.map((item, index) => {
                if (item.imageUrl !== "") {
                  return (
                    <div key={index} className="w-full mb-6">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg w-full object-contain"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Center panel for total donation */}
        <div className="border border-cyan-200 col-span-2 flex flex-col gap-4 p-4 h-screen overflow-auto font-bold text-48">
          <div className="border h-[30%] justify-center items-center flex">
            <Image
              src={logo}
              alt={"adsds"}
              width={1000}
              height={1000}
              className="rounded-lg w-96 object-contain "
            />
          </div>
          <div className="border h-[70%] flex justify-center items-center  ">
            <div className="  w-full mx-28 p-10 rounded-2xl bg-black/50 backdrop-blur-sm">
              <p className="text-lg font-semibold  text-center">Нийт хандив</p>
              <div className="flex justify-center">
                <Number n={totalAmount} />
              </div>
            </div>
          </div>
        </div>

        {/* Right-side donation list */}
        <div className="border border-red-700 col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto">
          <div className="font-extrabold text-24">Хандив</div>
          <div className="relative w-full h-[calc(100vh-100px)] overflow-auto border rounded-lg">
            {/* Background overlay with blur effect */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg z-0"></div>
            <div className="w-full animate-scrollUp">
              {data.map((item, index) => (
                <div key={index} className="justify-between w-full p-3">
                  <div className="flex">
                    <div className="font-regular flex w-[50%] items-center">
                      {item.name}
                    </div>
                    <div className="font-bold text-20 flex w-[50%] justify-end items-center">
                      {item.amount.toLocaleString()} ₮
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-white mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4 justify-center">
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={() => router.push("/donate")}>Add Donation</Button>
      </div>
    </div>
  );
}
