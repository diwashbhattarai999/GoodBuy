import { cn } from "@/lib/utils";
import { ScaleLoader } from "react-spinners";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outline?: boolean;
  destructive?: boolean;
  icon?: boolean;
  full?: boolean;
  disabled?: boolean;
  loader?: boolean;
  className?: string;
}

const Button = ({
  children,
  outline,
  destructive,
  icon,
  full,
  disabled,
  className,
  loader,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground/90 p-2 rounded-[4px] duration-300 font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        outline &&
          "bg-transparent text-secondary-foreground hover:bg-muted hover:text-muted-foreground border border-border",
        destructive && "bg-destructive hover:bg-destructive/90 text-white",
        icon &&
          "bg-transparent text-foreground hover:bg-muted flex items-center justify-center gap-4 w-full py-[10px]",
        full ? "w-full" : "w-fit",
        loader && "flex items-center justify-center gap-2",
        className
      )}
      {...props}
      disabled={disabled}
    >
      {loader && <ScaleLoader color="#282f2b" width={15} height={15} />}
      {children}
    </button>
  );
};

export default Button;
