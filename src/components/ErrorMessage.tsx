import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-left text-red-600 font-bold text-sm">
      {children}
    </div>
  );
};
