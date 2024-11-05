import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";
import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const AddressContact: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useFormContext<NewSchemaAddEmployeeType>();

  const [isFieldError, setFieldError] = useState<boolean>(false);
  const [isSameAddress, setSameAddress] = useState<boolean>(false);

  const watchPresentAddress = watch("presentAddress");

  const inputFields = [
    errors.primaryContact,
    errors.secondaryContact,
    errors.presentAddress,
    errors.permanentAddress,
  ];

  useEffect(() => {
    if (isSameAddress) {
      console.log(isSameAddress);
      setValue("permanentAddress", watchPresentAddress);
      trigger("permanentAddress");
    } else {
      setValue("permanentAddress", "");
    }
  }, [isSameAddress, watchPresentAddress]);

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={3}
        text="Address & Contact Information"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput
          labelText="Primary Contact Number"
          requiredAsterisk={true}
          errorMessage={errors.primaryContact?.message}
        >
          <input
            type="tel"
            maxLength={25}
            placeholder="Contact Number"
            className="modal-input"
            {...register("primaryContact")}
          />
        </FormInput>

        <FormInput
          labelText="Secondary Contact Number"
          errorMessage={errors.secondaryContact?.message}
        >
          <input
            type="tel"
            maxLength={25}
            placeholder="Contact Number"
            className="modal-input"
            {...register("secondaryContact")}
          />
        </FormInput>

        <FormInput
          labelText="Present Address"
          requiredAsterisk={true}
          errorMessage={errors.presentAddress?.message}
        >
          <textarea
            maxLength={175}
            placeholder="Address"
            className="modal-input h-32"
            {...register("presentAddress")}
          />
        </FormInput>

        <FormInput
          labelText="Permanent Address"
          requiredAsterisk={true}
          errorMessage={errors.permanentAddress?.message}
        >
          <textarea
            maxLength={175}
            placeholder="Address"
            disabled={isSameAddress}
            className="modal-input h-32 disabled:bg-accent-100"
            {...register("permanentAddress")}
          />
          <label className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) => {
                e.target.checked ? setSameAddress(true) : setSameAddress(false);
              }}
            />
            <span>Same as current address</span>
          </label>
        </FormInput>
      </FormCategory>
    </>
  );
};

export default AddressContact;
