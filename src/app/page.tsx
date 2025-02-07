"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import classNames from "classnames";

import "react-image-crop/dist/ReactCrop.css";
import Number from "@/components/Number";

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
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

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

    oldTotalRef.current = totalAmount;
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

      oldTotalRef.current = totalAmount;
      _temp.push(newItem);
      localStorage.setItem("data", JSON.stringify(_temp));

      setTimeout(() => getData(), 200);
    }

    setName("");
    setAmount("");
    setImageUrl("");
  };

  console.log("oldTotalRef :>> ", oldTotalRef);

  // function Number({ n }: { n: number }) {
  //   const [prevTotal, setPrevTotal] = useState(n);

  //   useEffect(() => {
  //     setPrevTotal(oldTotalRef.current); // Only update when `totalAmount` actually changes
  //   }, [n]);

  //   return (
  //     <CountUp
  //       start={prevTotal}
  //       end={n}
  //       duration={3}
  //       separator=","
  //       suffix=" ₮"
  //       redraw={true}
  //     />
  //   );
  // }

  // function Number({ n }: { n: number }) {
  //   const [prevTotal, setPrevTotal] = useState(oldTotalRef.current);

  //   useEffect(() => {
  //     setPrevTotal(oldTotalRef.current);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [oldTotalRef.current]);

  //   return (
  //     <CountUp
  //       start={prevTotal}
  //       end={n}
  //       duration={3}
  //       separator=","
  //       suffix=" ₮"
  //       redraw={true}
  //     />
  //   );
  // }

  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 40,
    x: 0,
    y: 0,
  });
  const [image, setImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropAndClose = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imgRef.current, crop);
      setImageUrl(croppedImage);
      setImage(null);
      // onClose();
    }
  };

  console.log("image :>> ", image);

  const inputClass =
    "w-full p-4 border border-border rounded-lg focus:border-blue-600  font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0 mb-6 bg-[#DDDDDD00]";

  return (
    <div>
      <div className="border border-cyan-300 w-screen h-screen grid grid-cols-4">
        {/* Image container with auto-scrolling */}
        <div
          ref={imageContainerRef}
          className="border border-red-700 col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto"
        >
          <div className="font-extrabold text-24">Хандивлагчид</div>
          <div className="w-full h-[calc(100vh-100px)] overflow-auto border rounded-lg">
            <div className=" w-full animate-scrollUp">
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

        {/* Center panel for total amount */}
        <div className="border border-cyan-200 col-span-2 flex flex-col items-center justify-center gap-4 p-4 h-screen overflow-auto font-bold text-48">
          {/* <div className="border border-cyan-200 col-span-2 flex flex-col items-center place-content-center font-bold text-48 p-4"></div> */}
          {maxAmountItem && (
            <p className="text-lg font-semibold">
              Top Item: {maxAmountItem.name} -{" "}
              {formatAmount(maxAmountItem.amount)} ₮
            </p>
          )}

          <Number n={totalAmount} />
        </div>

        {/* Right-side data list */}
        <div className="border border-red-700 col-span-1 flex flex-col items-center gap-4 p-4 h-screen overflow-auto">
          {/* <div>Хандив</div> */}
          <div className="font-extrabold text-24">Хандив</div>
          <div
            className={classNames(
              "w-full  overflow-auto border rounded-lg",
              visible ? "h-[50%]" : "h-[100%]"
            )}
          >
            <div className=" w-full animate-scrollUp ">
              {/* <div className=" w-full"> */}
              {data.map((item, index) => (
                <div key={index} className=" justify-between w-full p-3 ">
                  <div className="flex ">
                    <div className="font-regular flex  w-[50%] items-center">
                      {item.name}dsfdsfdskjhgfjhgv
                    </div>
                    <div className="font-bold text-20 flex  w-[50%] justify-end items-center">
                      {formatAmount(item.amount) + " ₮"}
                    </div>
                  </div>

                  <div className="h-0.5 w-full bg-white mt-2" />
                </div>
              ))}
            </div>
          </div>
          {visible ? (
            <div className="overflow-scroll items-center h-[50%] border  w-full">
              <div className=" mx-auto rounded-2xl  h-full items-center justify-center">
                <>
                  {/* <div
                    onClick={() => {
                      setName("");
                      setAmount("");
                      setImageUrl("");
                      setVisible(false);
                    }}
                    className="flex items-end justify-end mb-6 cursor-pointer"
                  >
                    <Add
                      size="36"
                      className="rotate-45 mt-3 mr-3"
                      color="#FFFFFF"
                    />
                  </div> */}

                  <h2 className=" text-24 text-center font-semibold mb-4 mt-10">
                    Хандив оруулах
                  </h2>

                  <form
                    // onSubmit={(e) => e.preventDefault()}
                    onSubmit={() => handleButton()}
                    className="justify-center "
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Хандивлагч:"
                    />

                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={inputClass}
                      placeholder="Хандив дүн:"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full mt-4 mb-4"
                    />

                    {image && (
                      <div className="mt-4">
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          aspect={1} // Keep a square aspect ratio
                          locked={true} // Allow moving and resizing crop area
                        >
                          <Image
                            ref={imgRef}
                            src={image}
                            alt="To crop"
                            className="w-full"
                            width={100}
                            height={100}
                          />
                        </ReactCrop>
                        {/* <div
                          onClick={handleCropAndClose}
                          className="mt-4 flex "
                        >
                          <Button className="mx-auto">Зураг хадгалах</Button>
                        </div> */}
                        <div className="mt-2 flex justify-center ">
                          <button
                            type="button"
                            className=" px-6 py-2 bg-primary hover:bg-primary400 text-white rounded-lg font-semibold text-18"
                            onClick={handleCropAndClose}
                          >
                            {/* Crop & Save */}
                            Зураг хадгалах
                          </button>
                        </div>
                      </div>
                    )}

                    {imageUrl && !image && (
                      <Image
                        src={imageUrl}
                        alt="Uploaded"
                        width={100}
                        height={100}
                        className=" rounded-lg w-full border"
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    )}
                    {!image && (
                      <div className="flex place-content-center mt-4 ">
                        {/* <Button type="button" onClick={handleCropAndClose}> */}
                        <Button
                          onClick={() => {
                            setName("");
                            setAmount("");
                            setImageUrl("");
                            setVisible(false);
                          }}
                          className="w-50% mr-10"
                        >
                          Болих
                        </Button>
                        <Button type="submit" className="w-50%">
                          Хадгалах
                        </Button>
                      </div>
                    )}
                  </form>
                </>
              </div>
            </div>
          ) : (
            <Button onClick={() => setVisible(true)}>Хандив өгөх</Button>
          )}
        </div>

        {/* Modal */}
        {/* {visible && (
          <AddModal
            name={name}
            setName={setName}
            amount={amount}
            setAmount={setAmount}
            onClose={() => handleButton()}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        )} */}
      </div>
      <Button onClick={() => handleClear()}>clear</Button>
    </div>
  );
}

// Utility function to crop image using a canvas
const getCroppedImg = (
  image: HTMLImageElement,
  crop: Crop
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX, // Scale crop position to actual image size
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        }
      }, "image/jpeg");
    }
  });
};
