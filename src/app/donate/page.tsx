"use client";

import React, { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Donate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 40,
    x: 0,
    y: 0,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);
  //   const router = useRouter();

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

  const handleCropAndSave = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imgRef.current, crop);
      setImageUrl(croppedImage);
      setImage(null);
    }
  };

  const handleSubmit = () => {
    if (!name || !amount) return alert("Бүх талбарыг бөглөнө үү!");

    const newItem = { name, amount: parseFloat(amount), imageUrl };
    const data = JSON.parse(localStorage.getItem("data") || "[]");
    data.push(newItem);
    localStorage.setItem("data", JSON.stringify(data));

    // router.push("/"); // Redirect to home page
  };

  const inputClass =
    "w-full p-4 border border-border rounded-lg focus:border-blue-600  font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0 mb-6 bg-[#DDDDDD00]";

  return (
    <div className="overflow-scroll fixed inset-0 flex place-content-center items-center bg-black bg-opacity-50 z-50">
      <div className=" px-10 pt-8 pb-16 rounded-2xl shadow-lg mx-4">
        <>
          <h2 className=" text-42 text-center font-semibold mb-4">
            Хандив нэмэх
          </h2>

          <form
            // onSubmit={(e) => e.preventDefault()}
            onSubmit={handleSubmit}
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
                  onClick={handleCropAndSave}
                >
                  Зураг хадгалах
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
    // <div className="h-screen flex flex-col items-center justify-center">
    //   <h2 className="text-2xl font-bold mb-4">Хандив өгөх</h2>

    //   <input
    //     type="text"
    //     placeholder="Нэр"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     className="border p-2 mb-2 w-80"
    //   />
    //   <input
    //     type="number"
    //     placeholder="Хандив дүн"
    //     value={amount}
    //     onChange={(e) => setAmount(e.target.value)}
    //     className="border p-2 mb-2 w-80"
    //   />
    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={handleImageUpload}
    //     className="mb-2"
    //   />

    //   {image && (
    //     <div className="mt-2">
    //       <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1}>
    //         <Image
    //           ref={imgRef}
    //           src={image}
    //           alt="Crop"
    //           width={100}
    //           height={100}
    //         />
    //       </ReactCrop>
    //       <button
    //         className="mt-2 p-2 bg-blue-500 text-white rounded"
    //         onClick={handleCropAndSave}
    //       >
    //         Crop & Save
    //       </button>
    //     </div>
    //   )}

    //   {imageUrl && !image && (
    //     <Image
    //       src={imageUrl}
    //       alt="Cropped"
    //       width={100}
    //       height={100}
    //       className="mt-2"
    //     />
    //   )}

    //   <div className="flex gap-4 mt-4">
    //     <Button onClick={handleSubmit}>Хадгалах</Button>
    //     <Button onClick={() => router.push("/")}>Буцах</Button>
    //   </div>
    // </div>
  );
}

// Crop Image Utility
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
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert to base64 instead of using Blob
      const base64Image = canvas.toDataURL("image/jpeg");
      resolve(base64Image);
    }
  });
};

// const getCroppedImg = (
//   image: HTMLImageElement,
//   crop: Crop
// ): Promise<string> => {
//   return new Promise((resolve) => {
//     const canvas = document.createElement("canvas");
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width * scaleX;
//     canvas.height = crop.height * scaleY;
//     const ctx = canvas.getContext("2d");

//     if (ctx) {
//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
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
