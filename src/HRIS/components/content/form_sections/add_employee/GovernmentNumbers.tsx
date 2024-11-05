import { useFormContext } from "react-hook-form";
import FormInput from "../../../../../Shared/components/ui/layout/FormInput";
import FormCategory from "../../FormCategory";
import { useState, useEffect } from "react";
import { NewSchemaAddEmployeeType } from "../../../../schema/AddEmployee";

interface Props {
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
}

const GovernmentNumbers: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewSchemaAddEmployeeType>();

  const [isFieldError, setFieldError] = useState<boolean>(false);

  const inputFields = [
    errors.sss,
    errors.birTin,
    errors.gsis,
    errors.pagibig,
    errors.philhealth,
  ];

  useEffect(() => {
    setFieldError(inputFields.some((item) => item !== undefined));
  }, [inputFields]);

  return (
    <>
      <FormCategory
        id={6}
        text="Government Numbers"
        activeCategory={activeCategory}
        isFieldError={isFieldError}
        handleCategoryClick={handleCategoryClick}
      >
        <FormInput labelText="SSS" errorMessage={errors.sss?.message}>
          <input
            type="text"
            maxLength={25}
            placeholder="SSS Number"
            className="modal-input"
            {...register("sss")}
          />
        </FormInput>
        <FormInput labelText="BIR/TIN" errorMessage={errors.birTin?.message}>
          <input
            type="text"
            maxLength={25}
            placeholder="BIR/TIN Number"
            className="modal-input"
            {...register("birTin")}
          />
        </FormInput>
        <FormInput labelText="GSIS" errorMessage={errors.gsis?.message}>
          <input
            type="text"
            maxLength={25}
            placeholder="GSIS Number"
            className="modal-input"
            {...register("gsis")}
          />
        </FormInput>
        <FormInput labelText="Pag-IBIG" errorMessage={errors.pagibig?.message}>
          <input
            type="text"
            maxLength={25}
            placeholder="Pag-IBIG Number"
            className="modal-input"
            {...register("pagibig")}
          />
        </FormInput>
        <FormInput
          labelText="PhilHealth"
          errorMessage={errors.philhealth?.message}
        >
          <input
            type="text"
            maxLength={25}
            placeholder="PhilHealth Number"
            className="modal-input"
            {...register("philhealth")}
          />
        </FormInput>
      </FormCategory>
    </>
  );
};

export default GovernmentNumbers;
