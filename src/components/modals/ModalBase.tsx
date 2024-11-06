import CloseIcon from "@mui/icons-material/Close";
import { useModalContext } from "../../context/ModalContext";
import DefaultButton from "../../components/ui/button/DefaultButton";
import { modalFormId } from "../../utils/Types";

const ModalBase = () => {
  const {
    isModalOpen,
    closeModal,
    modalContent,
    isModalFormSubmitted,
    clearModalContent,
  } = useModalContext();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${!isModalOpen && "hidden"}`}
        onClick={() => {
          closeModal(false);
        }}
      />
      <div
        className={`fixed right-0 top-0 z-50 flex w-full max-w-[700px] lg:w-2/5 ${!isModalOpen && "translate-x-full"} h-screen flex-col justify-between bg-accent-100 transition-transform duration-500 max-sm:w-full`}
        onTransitionEnd={(event: React.TransitionEvent<HTMLDivElement>) => {
          if (event.target === event.currentTarget) {
            isModalFormSubmitted && !isModalOpen && clearModalContent();
          }
        }}
      >
        <div className="flex items-center justify-between gap-3 bg-forest-200 p-6">
          <span>
            <h3 className="text-xl font-medium text-accent-50">
              {modalContent?.header}
            </h3>
            <p className="text-sm text-accent-50">{modalContent?.subheading}</p>
            <p className="mt-1 text-sm text-accent-50">
              Fields marked with (<span className="text-red-400">*</span>) are
              required.
            </p>
          </span>
          <button
            type="button"
            className="flex items-center justify-center self-start rounded-full bg-accent-50 p-2"
            onClick={() => {
              closeModal(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="grow overflow-y-auto">{modalContent?.content}</div>
        <div className="flex justify-between gap-6 bg-forest-200 px-6 py-8">
          <DefaultButton
            text="Cancel"
            handleClick={() => {
              closeModal(false);
            }}
            className="bg-forest-500 font-medium hover:bg-forest-600"
          />
          <DefaultButton
            formId={modalFormId}
            text="Submit"
            type="submit"
            className="bg-forest-800 hover:bg-forest-900"
          />
        </div>
      </div>
    </>
  );
};

export default ModalBase;
