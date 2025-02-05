"use client";
// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
//   formAction?: any;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };
import React from "react";

import { Ellipsis, Ring } from "react-css-spinners";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  second?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  loading?: boolean;
  red?: boolean;
}

const Button = ({
  onClick,
  children,
  className,
  second,
  type,
  loading,
  red,
}: ButtonProps) => {
  // console.log("loading button :>> ", loading);
  return (
    <button
      type={type}
      className={`px-4 py-3  rounded-xl h-14 font-semibold text-18 place-content-center flex-row flex items-center  ${className} ${
        second
          ? red
            ? "border border-red-500 text-red-500"
            : "border text-text-primary"
          : loading
          ? "bg-primary400 text-white"
          : "bg-primary hover:bg-primary400 text-white"
      }`}
      onClick={!loading ? onClick : undefined}
    >
      {loading ? (
        // <div className="flex items-center justify-center">
        //   <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full "></div>
        // </div>

        <Ring
          color={second ? "#1C2634" : "#ffffff"}
          size={18}
          thickness={2}
          className="pt-1 mb-1 mx-5"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
