"use client";
import React, { useState, useRef } from "react";
import Button from "./Button";
import { Add } from "iconsax-react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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

  return (
    <div className="overflow-scroll fixed inset-0 flex place-content-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white px-10 pt-8 pb-16 rounded-2xl shadow-lg mx-4">
        <>
          <div
            onClick={onClose}
            className="flex items-end justify-end mb-6 cursor-pointer"
          >
            <Add size="36" className="rotate-45" />
          </div>

          <h2 className="text-text-primary text-42 text-center font-semibold mb-4">
            Нэвтрэх
          </h2>

          <form
            // onSubmit={(e) => e.preventDefault()}
            onSubmit={onClose}
            className="justify-center w-96"
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
              className="w-full mt-4"
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
                <button
                  type="button"
                  className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleCropAndClose}
                >
                  Crop & Save
                </button>
              </div>
            )}

            {imageUrl && !image && (
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={100}
                height={100}
                className="mt-4 rounded-lg w-full h-48"
                style={{ objectFit: "contain" }}
                priority
              />
            )}
            {!image && (
              <div className="flex place-content-center mt-4">
                {/* <Button type="button" onClick={handleCropAndClose}> */}
                <Button type="submit">Хадгалах</Button>
              </div>
            )}
          </form>
        </>
      </div>
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

// // Utility function to crop image using a canvas
// const getCroppedImg = (
//   image: HTMLImageElement,
//   crop: Crop
// ): Promise<string> => {
//   return new Promise((resolve) => {
//     const canvas = document.createElement("canvas");
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     canvas.width = crop.width * (scaleX || 1);
//     canvas.height = crop.height * (scaleY || 1);
//     const ctx = canvas.getContext("2d");

//     if (ctx) {
//       ctx.drawImage(
//         image,
//         crop.x * scaleX, // Scale crop position to actual image size
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       canvas.toBlob((blob) => {
//         if (blob) {
//           const fileUrl = URL.createObjectURL(blob);
//           resolve(fileUrl);
//         }
//       }, "image/jpeg");
//     }
//   });
// };
