interface Props {
  imagePath: string;
  text: string;
}

const ProfileTableData: React.FC<Props> = ({ imagePath, text }) => {
  return (
    <>
      <td className="table-data">
        <div className="flex items-center gap-3">
          <div className="max-h-8 min-h-8 min-w-8 max-w-8 shrink-0 overflow-hidden rounded-full">
            <img src={imagePath} className="object-cover" />
          </div>
          <span>{text}</span>
        </div>
      </td>
    </>
  );
};

export default ProfileTableData;
