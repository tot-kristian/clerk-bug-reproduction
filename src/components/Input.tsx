import { InternalFieldName, UseFormRegisterReturn } from "react-hook-form";

interface InputWithLabelProps<T extends InternalFieldName> {
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn<T>;
}

export const Input = <T extends InternalFieldName>({
  register,
  placeholder,
  type,
}: InputWithLabelProps<T>) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className="input input-bordered rounded w-full max-w-xs mb-3"
      {...register}
    />
  );
};
