import axios from "axios";
import DefaultButton from "../components/ui/button/DefaultButton";

import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { AddDocumentSchema, AddDocumentType } from "../schema/AddDocument";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileDocuments: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDocumentType>({
    resolver: zodResolver(AddDocumentSchema),
  });

  const onFormSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("NAME", "ASDASD");
    try {
      const request = await axios.post("/v1/testing/bypass", formData);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className="justify-self-center md:place-self-end">
        <DefaultButton
          text="Submit Document"
          Icon={AddIcon}
          className="rounded-full bg-forest-800 text-accent-50 hover:bg-forest-900"
          handleClick={async () => {
            try {
              // console.log("Got here");
              // const response = await axios.get("/v1/testing/bypass", {
              //   headers: {
              //     Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   },
              // });
              // console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          }}
        />

        {/* <form onSubmit={onFormSubmit}>
          <input type="file" {...register("file1")} />
          {errors.file1?.message && <p>{errors.file1.message}</p>}
          <button type="submit">SUBMIT THIS FILE</button>
        </form> */}
      </div>
    </>
  );
};

export default ProfileDocuments;
