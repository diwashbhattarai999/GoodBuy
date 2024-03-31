import { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

import { sizesList } from "@/data/sizes";

import { DefaultValuesType } from "./create-product-form";
import Button from "@/components/ui/Button";

interface SizesProps {
  sizes: { size: string; qty: number; price: number }[];
  product: DefaultValuesType;
  setProduct: React.Dispatch<React.SetStateAction<DefaultValuesType>>;
}

export default function Sizes({ sizes, product, setProduct }: SizesProps) {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (
    i: number,
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = sizes.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setProduct({ ...product, sizes: values });
  };

  const handleRemove = (i: number) => {
    if (sizes.length > 0) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  const handleToggleSize = () => {
    if (!noSize) {
      const data = sizes.map((item) => ({
        ...item,
        size: "",
      }));
      setProduct({ ...product, sizes: data });
    } else {
      setProduct({
        ...product,
        sizes: sizes.map((item) => ({
          size: item.size || "",
          qty: item.qty,
          price: item.price,
        })),
      });
    }
    setNoSize((prev) => !prev);
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      sizes: [...sizes, { size: "", qty: 0, price: 0 }],
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-8 w-full">
      <div className="">Sizes / Quantity / Price</div>
      <Button
        type="reset"
        className="bg-secondary text-secondary-foreground"
        onClick={handleToggleSize}
      >
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </Button>
      {sizes.map((size, i) => (
        <div className="flex max-md:flex-col md:items-end gap-3 w-full" key={i}>
          <select
            name="size"
            value={noSize ? "" : size.size}
            disabled={noSize}
            style={{ display: `${noSize ? "none" : ""}` }}
            onChange={(e) => handleSize(i, e)}
            className="max-md:w-full h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
          >
            <option value="">Select a size</option>
            {sizesList.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-1 max-md:w-full">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Qty
            </label>
            <input
              type="number"
              name="qty"
              placeholder={noSize ? "Product Quantity" : "Size Quantity"}
              min={1}
              value={size.qty}
              onChange={(e) => handleSize(i, e)}
              className="max-md:w-full h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>

          <div className="flex flex-col gap-1 max-md:w-full ">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder={noSize ? "Product Price" : "Size Price"}
              min={1}
              value={size.price}
              onChange={(e) => handleSize(i, e)}
              className="max-md:w-full h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>
          {!noSize && (
            <div className="flex gap-4 max-md:mt-2">
              <BsFillPatchMinusFill
                onClick={() => handleRemove(i)}
                className="text-accent w-7 h-7"
              />
              <BsFillPatchPlusFill
                onClick={handleAddSize}
                className="text-accent w-7 h-7"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
