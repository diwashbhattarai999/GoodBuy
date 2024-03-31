import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

import { DefaultValuesType } from "./create-product-form";

interface DetailsProps {
  details: { name: string; value: string }[];
  product: DefaultValuesType;
  setProduct: React.Dispatch<React.SetStateAction<DefaultValuesType>>;
}

export default function Details({
  details,
  product,
  setProduct,
}: DetailsProps) {
  const handleDetails = (
    i: number,
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = details.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    setProduct({ ...product, details: values });
  };

  const handleRemove = (i: number) => {
    const values = [...details];
    values.splice(i, 1);
    setProduct({ ...product, details: values });
  };

  const handleAddDetails = () => {
    setProduct({
      ...product,
      details: [...details, { name: "", value: "" }],
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="">Details</div>

      {details.length === 0 && (
        <BsFillPatchPlusFill
          onClick={handleAddDetails}
          className="text-accent w-7 h-7"
        />
      )}

      {details.map((detail, i) => (
        <div className="flex items-end gap-3" key={i}>
          <div className="flex flex-col gap-1">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={detail.name}
              onChange={(e) => handleDetails(i, e)}
              className="h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-primary-foreground font-medium cursor-pointer">
              Value
            </label>
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={detail.value}
              onChange={(e) => handleDetails(i, e)}
              className="h-full p-2 bg-transparent border rounded-md text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 border-input focus:border-secondary-foreground"
            />
          </div>

          <>
            <BsFillPatchMinusFill
              onClick={() => handleRemove(i)}
              className="text-accent w-7 h-7"
            />
            <BsFillPatchPlusFill
              onClick={handleAddDetails}
              className="text-accent w-7 h-7"
            />
          </>
        </div>
      ))}
    </div>
  );
}
