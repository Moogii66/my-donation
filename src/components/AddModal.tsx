"use client";
import React from "react";
import Button from "./Button";
import { Add } from "iconsax-react";
import Image from "next/image";

interface AddModalProps {
  name: string;
  setName: (arg: string) => void;
  amount: string;
  setAmount: (arg: string) => void;
  imageUrl: string;
  setImageUrl: (arg: string) => void;
  onClose: () => void;
}

export default function AddModal({
  name,
  setName,
  amount,
  setAmount,
  imageUrl,
  setImageUrl,
  onClose,
}: AddModalProps) {
  const inputClass =
    "w-full p-4 border border-border rounded-lg focus:border-primary text-text-primary font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0 mb-6";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex place-content-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white px-10 pt-8 pb-16 rounded-2xl shadow-lg mx-4">
        <>
          <div
            onClick={() => {
              onClose();
            }}
            className="flex items-end justify-end mb-6 cursor-pointer"
          >
            <Add size="36" className="rotate-45" />
          </div>

          <h2 className="text-text-primary text-42 text-center font-semibold mb-4">
            Нэвтрэх
          </h2>

          <form onSubmit={onClose} className="justify-center w-96">
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
              className="w-full mt-4"
            />

            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={100}
                height={100}
                className="mt-4 rounded-lg w-full h-48"
                style={{ objectFit: "contain" }} // or "contain"
                // layout="responsive" // or "responsive"
                priority
              />
            )}

            <div className="flex place-content-center mt-4">
              <Button type="submit">Хадгалах</Button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}
