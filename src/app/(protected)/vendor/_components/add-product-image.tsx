import { useState } from "react";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { LuZoomIn } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { GiExtractionOrb } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { CreateProductSchema } from "@/schemas";

import { DefaultValuesType } from "./create-product-form";

interface AddProductImageProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<z.infer<typeof CreateProductSchema>>;
  setProduct: React.Dispatch<React.SetStateAction<DefaultValuesType>>;
  setColorImage: React.Dispatch<React.SetStateAction<string>>;
}

const AddProductImage = ({
  images,
  setImages,
  setValue,
  setProduct,
  setColorImage,
}: AddProductImageProps) => {
  const [imageHoveredIndex, setImageHoveredIndex] = useState<number | null>(
    null
  );
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const handleDeleteImage = async (index: number, imageUrl: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing`, {
        data: {
          url: imageUrl,
        },
      });
      toast.success("File Deleted");
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: newImages,
      }));
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="mt-5 mb-10 w-full">
      <div className="w-full">
        {images.length <= 0 ? (
          <Image
            src="/images/no-image.png"
            alt="no-image"
            width={800}
            height={800}
            className="w-full h-72 mb-5 object-cover"
            priority
          />
        ) : (
          <ul className="flex flex-wrap gap-4 items-center justify-start">
            {images.map((image, index) => (
              <li
                key={image}
                className="relative h-52 w-40 mb-5"
                onMouseEnter={() => setImageHoveredIndex(index)}
                onMouseLeave={() => setImageHoveredIndex(null)}
              >
                <Image
                  src={image}
                  width={300}
                  height={300}
                  alt="Product Image"
                  className="h-full w-full rounded-md cursor-pointer z-20 object-cover"
                  loading="eager"
                  priority
                />

                <div
                  className={`absolute top-0 left-0 rounded-md bg-black/70 h-full w-full flex items-center justify-center gap-2 text-[1.6rem] text-white z-30 transition duration-300 ${
                    imageHoveredIndex === index
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <MdDelete
                    className="cursor-pointer hover:text-accent"
                    onClick={() => handleDeleteImage(index, image)}
                  />

                  <GiExtractionOrb
                    className="cursor-pointer hover:text-muted-foreground"
                    onClick={() => setColorImage(image)}
                  />

                  <LuZoomIn
                    className="cursor-pointer hover:text-muted-foreground"
                    onClick={() => setZoomedImageUrl(image)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <UploadButton
        endpoint="multipleImageUploader"
        onUploadBegin={() => {
          toast.loading("Uploading...");
        }}
        onClientUploadComplete={(res) => {
          setValue &&
            setValue(
              "image",
              res.map((image) => image.url)
            );
          setImages((prevImages) => [
            ...prevImages,
            ...res.map((image) => image.url),
          ]);
          setProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, ...res.map((image) => image.url)],
          }));
          toast.success("Upload completed.");
          toast.dismiss();
        }}
        onUploadError={(error) => {
          console.error(error.message);
          toast.error("Only 6 images are allowed.");
        }}
      />

      <ImageZoomModal
        imageUrl={zoomedImageUrl}
        onClose={() => setZoomedImageUrl(null)}
      />
    </div>
  );
};

export default AddProductImage;

const ImageZoomModal = ({
  imageUrl,
  onClose,
}: {
  imageUrl: string | null;
  onClose: () => void;
}) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-200",
        imageUrl
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative h-full w-full">
        <IoMdClose
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl z-50 cursor-pointer"
        />

        <div className="w-full h-full flex items-center justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Zoomed Image"
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};
