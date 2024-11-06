import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodIssueCode } from "zod";

type FormData = {
  checkbox1: boolean;
  checkbox2: boolean;
  e: string;
};

const schema = z
  .object({
    checkbox1: z.boolean(),
    checkbox2: z.boolean(),
    e: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.checkbox1 && data.checkbox2) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "EEE",
        path: ["e"],
      });
    }
  });

const TestingVersion2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input type="checkbox" {...register("checkbox1")} />
        Checkbox 1
      </label>
      {errors.checkbox1 && <p>{errors.checkbox1.message}</p>}

      <label>
        <input type="checkbox" {...register("checkbox2")} />
        Checkbox 2
      </label>

      <label>
        <input {...register("e")} />
        Checkbox 2
      </label>
      {errors.e && <p>{errors.e.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default TestingVersion2;
