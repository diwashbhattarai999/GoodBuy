"use client";

import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuKeyRound, LuMail, LuUserCircle } from "react-icons/lu";
import { UserRole } from "@prisma/client";

import { registerAction } from "@/actions/register";

import { RegisterSchema } from "@/schemas";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import CardWrapper from "@/components/ui/card-wrapper";
import Select from "../ui/select";

type defaultValueType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: "VENDOR" | "USER" | undefined;
  companyName?: string | undefined;
  panNo: number;
};

const defaultValues: defaultValueType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: UserRole.USER,
  companyName: "",
  panNo: 0,
};

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectValue, setSelectValue] = useState("Select a role");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);

    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.sucess);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Register"
      subHeaderLabel="Join us today"
      backButtonHref="/login"
      backButtonLabel="Already have an account ? Login Now"
      showSocial
      className="my-20"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Inputs -- UserName */}
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Full Name"
          icon={LuUserCircle}
          error={errors.name?.message}
          disabled={isPending}
          register={register("name")}
        />

        {/* User Inputs -- Email */}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          icon={LuMail}
          error={errors.email?.message}
          disabled={isPending}
          register={register("email")}
        />

        {/* User Inputs -- Role */}
        <Select
          selectLabel="Role"
          name="role"
          value={selectValue}
          setSelectValue={setSelectValue}
          error={errors.role?.message}
          disabled={isPending}
          options={[
            { label: "User", value: "USER" },
            { label: "Vendor", value: "VENDOR" },
          ]}
          register={register("role")}
        />

        {selectValue.toUpperCase() === UserRole.VENDOR && (
          <>
            {/* User Inputs -- Company Name */}
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Company Name"
              icon={LuMail}
              error={errors.companyName?.message}
              disabled={isPending}
              register={register("companyName")}
            />

            {/* User Inputs -- Pan Number */}
            <Input
              label="PAN Number"
              name="panNo"
              type="number"
              placeholder="PAN Number"
              icon={LuMail}
              error={errors.panNo?.message}
              disabled={isPending}
              register={register("panNo", { valueAsNumber: true })}
            />
          </>
        )}

        {/* User Inputs -- Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="******"
          icon={LuKeyRound}
          error={errors.password?.message}
          disabled={isPending}
          register={register("password")}
        />

        {/* User Inputs -- Password */}
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="******"
          icon={LuKeyRound}
          error={errors.confirmPassword?.message}
          disabled={isPending}
          register={register("confirmPassword")}
        />

        {/* Sucess Message */}
        {success && <FormSuccess message={success} />}

        {/* Error Message */}
        {error && <FormError message={error} />}

        {/* Submit Button */}
        <Button disabled={isPending} type="submit" full>
          Register
        </Button>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
