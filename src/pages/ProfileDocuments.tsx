import DefaultButton from "../components/ui/button/DefaultButton";

import AddIcon from "@mui/icons-material/Add";

const ProfileDocuments: React.FC = () => {
  return (
    <>
      <div className="justify-self-center md:place-self-end">
        <DefaultButton
          text="Submit Document"
          Icon={AddIcon}
          className="rounded-full bg-forest-800 text-accent-50 hover:bg-forest-900"
        />
      </div>
    </>
  );
};

export default ProfileDocuments;
