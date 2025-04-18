import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InnerLayoutProps {
  children: ReactNode;
  className?: string;
}

const InnerLayout = ({ children, className = "" }: InnerLayoutProps) => {
  return (
    <div
      className={twMerge(
        "w-full max-w-[52rem] min-h-[30rem] mt-[6rem] mx-auto border-2 border-[#74a3e5] rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default InnerLayout;
