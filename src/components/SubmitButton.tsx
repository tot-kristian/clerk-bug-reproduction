import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}

export const SubmitButton: FC<ButtonProps> = ({
  onClick,
  type,
  children,
  disabled,
}) => {
  return (
    <button
      className="btn btn-primary text-primary-content font-bold px-6 py-2 rounded hover:bg-primary-dark"
      type={type}
      disabled={disabled}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};
