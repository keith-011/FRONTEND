import { createContext, ReactNode, useContext, useState } from "react";

type ModalContent = {
  header: string;
  subheading: string;
  content: ReactNode;
};

interface ModalInterface {
  isModalOpen: boolean;
  openModal: (modalContent: ModalContent) => void;
  closeModal: (clearContent: boolean) => void;
  modalContent: ModalContent | null;
  refreshParent: boolean;
  isModalFormSubmitted: boolean;
  clearModalContent: () => void;
}

// Context
const ModalContext = createContext<ModalInterface | undefined>(undefined);

// Context Hooks
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext provider missing");
  }
  return context;
};

// Context Providers
export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalStatus] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [refreshParent, setRefreshModal] = useState<boolean>(false);
  const [isModalFormSubmitted, setModalFormSubmitStatus] =
    useState<boolean>(false);

  const openModal = (modalContent: ModalContent) => {
    setModalStatus(true);
    setModalContent(modalContent);
    setModalFormSubmitStatus(false);
  };

  const closeModal = (clearContent: boolean) => {
    setModalStatus(false);
    if (clearContent) {
      setModalFormSubmitStatus(true);
      setRefreshModal(!refreshParent);
    }
  };

  const clearModalContent = () => {
    setModalContent(null);
  };

  return (
    <>
      <ModalContext.Provider
        value={{
          isModalOpen,
          closeModal,
          openModal,
          clearModalContent,
          refreshParent,
          modalContent,
          isModalFormSubmitted,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};

// import { createContext, ReactNode, useContext, useState } from "react";

// type ModalContent = {
//   header: string;
//   subheading: string;
//   content: ReactNode;
// };

// interface ModalInterface {
//   isModalOpen: boolean;
//   openModal: (modalContent: ModalContent) => void;
//   closeModal: () => void;
//   refresh: boolean;
//   refreshParentPage: () => void;
//   content: ModalContent | null;
// }

// // Context
// const ModalContext = createContext<ModalInterface | undefined>(undefined);

// // Context Hooks
// export const useModalContext = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error("useModalContext provider missing");
//   }
//   return context;
// };

// // Context Providers
// export const ModalContextProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isModalOpen, setModalStatus] = useState<boolean>(false);
//   const [content, setContent] = useState<ModalContent | null>(null);
//   const [refresh, setRefresh] = useState<boolean>(false);

//   const openModal = (modalContent: ModalContent) => {
//     setModalStatus(true);
//     setContent(modalContent);
//   };

//   const closeModal = () => {
//     setModalStatus(false);
//   };

//   const refreshParentPage = () => {
//     setRefresh(!refresh);
//   };

//   return (
//     <>
//       <ModalContext.Provider
//         value={{
//           isModalOpen,
//           closeModal,
//           openModal,
//           refresh,
//           refreshParentPage,
//           content,
//         }}
//       >
//         {children}
//       </ModalContext.Provider>
//     </>
//   );
// };
