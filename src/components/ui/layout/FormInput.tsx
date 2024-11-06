import { ReactNode } from "react";

interface Props {
  labelText: string;
  children: ReactNode;
  errorMessage?: string;
  requiredAsterisk?: boolean;
}

const FormInput: React.FC<Props> = ({
  labelText,
  children,
  errorMessage,
  requiredAsterisk,
}) => {
  return (
    <div className="flex gap-4 max-[576px]:flex-col max-[576px]:gap-1 min-[576px]:justify-between">
      <label className="shrink-0 text-accent-600 min-[577px]:w-1/3">
        {labelText}
        {requiredAsterisk && <span className="text-red-500"> *</span>}
      </label>
      <div className="flex grow flex-col gap-1 overflow-hidden">
        {children}
        {errorMessage && <span className="text-red-400">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default FormInput;
