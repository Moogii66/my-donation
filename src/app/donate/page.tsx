"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface MainItemType {
  name: string;
  amount: number;
  imageUrl: string; // base64
}

const STORAGE_KEY = "data";

export default function Donate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState<string | null>(null); // original base64 for cropping
  const [imageUrl, setImageUrl] = useState<string>(""); // cropped base64
  const [data, setData] = useState<MainItemType[]>([]);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // react-image-crop uses Crop (%/px)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 10,
    y: 10,
  });

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  // -------------------------
  // Storage helpers
  // -------------------------
  const fetchData = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setData(stored);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------
  // Crop helpers
  // -------------------------
  function getCenteredSquareCrop(width: number, height: number) {
    // make a centered square crop in %
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);

      // reset old values
      setImageUrl("");
      setCompletedCrop(null);
    };

    reader.readAsDataURL(file);
  };

  const handleCropAndSave = async () => {
    if (!imgRef.current) return alert("Зураг уншигдсангүй байна!");
    if (!completedCrop || completedCrop.width <= 0 || completedCrop.height <= 0)
      return alert("Crop сонгогдоогүй байна! (зураг дээр crop хөдөлгөнө үү)");

    const croppedImage = await getCroppedImg(imgRef.current, completedCrop);

    setImageUrl(croppedImage);
    setImage(null); // close crop ui
    setCompletedCrop(null);
  };

  // -------------------------
  // Submit donation
  // -------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !amount.trim()) {
      return alert("Бүх талбарыг бөглөнө үү!");
    }

    if (!imageUrl) {
      return alert("Зургаа хадгалаад дараа нь хадгална уу!");
    }

    const newItem: MainItemType = {
      name: name.trim(),
      amount: Number(amount),
      imageUrl,
    };

    const stored: MainItemType[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );

    const next = [newItem, ...stored];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setData(next);

    // clear form
    setName("");
    setAmount("");
    setImageUrl("");
  };

  const handleClear = () => {
    const confirmDelete = window.confirm(
      "Та бүх хандивыг устгахдаа итгэлтэй байна уу?",
    );

    if (confirmDelete) {
      localStorage.removeItem(STORAGE_KEY);
      setData([]);
    }
  };

  const handleDelete = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setData(updated);
  };

  const inputClass =
    "w-full p-4 border border-border rounded-lg focus:border-blue-600 font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0 mb-6 bg-[#DDDDDD00]";

  return (
    <div className="overflow-scroll fixed inset-0 flex place-content-center items-center bg-black bg-opacity-50 z-50">
      {/* LEFT */}
      <div className="px-10 pt-8 pb-16 rounded-2xl shadow-lg mx-4 border">
        <h2 className="text-42 text-center font-semibold mb-4">Хандив нэмэх</h2>

        <form onSubmit={handleSubmit} className="justify-center w-96">
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
            className="w-full mt-2"
          />

          {/* CROPPING UI */}
          {image && (
            <div className="mt-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => {
                  // ✅ onComplete returns Crop (maybe %)
                  if (!imgRef.current) return;

                  const pixel = convertToPixelCrop(
                    c,
                    imgRef.current.width,
                    imgRef.current.height,
                  );
                  setCompletedCrop(pixel);
                }}
                // aspect={1}
              >
                <img
                  ref={imgRef}
                  src={image}
                  alt="To crop"
                  className="w-full h-[320px] object-cover"
                  // onLoad={(e) => {
                  //   const img = e.currentTarget;
                  //   const nextCrop = getCenteredSquareCrop(
                  //     img.width,
                  //     img.height,
                  //   );
                  //   setCrop(nextCrop);
                  // }}
                />
              </ReactCrop>

              <button
                type="button"
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleCropAndSave}
              >
                Зураг хадгалах
              </button>
            </div>
          )}

          {/* PREVIEW CROPPED IMAGE */}
          {imageUrl && !image && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-4 rounded-lg w-full h-64 object-contain"
            />
          )}

          {/* SUBMIT */}
          {!image && (
            <div className="flex place-content-center mt-4">
              <Button type="submit">Хадгалах</Button>
            </div>
          )}
        </form>
      </div>

      {/* RIGHT */}
      <div className="border rounded-lg p-4 w-[600px] ml-10">
        <h3 className="text-xl font-semibold mb-4">Нийт - {data.length}</h3>

        <div className="overflow-auto h-96">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b p-2"
              >
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt="donation"
                      className="w-[50px] h-[50px] rounded-lg object-cover"
                    />
                  )}

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.amount.toLocaleString()} ₮</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Устгах
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Хандив байхгүй байна.</p>
          )}
        </div>

        <div className="py-6 justify-end flex">
          <Button onClick={handleClear}>Бүгдийн устгах</Button>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// Crop Image Utility (PixelCrop)
// -------------------------
const getCroppedImg = (
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // ✅ Ensure integer size
    const pixelWidth = Math.floor(crop.width * scaleX);
    const pixelHeight = Math.floor(crop.height * scaleY);

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      pixelWidth,
      pixelHeight,
    );

    // ✅ base64 size багасгах (0.7 чанартай)
    resolve(canvas.toDataURL("image/jpeg", 0.7));
  });
};
