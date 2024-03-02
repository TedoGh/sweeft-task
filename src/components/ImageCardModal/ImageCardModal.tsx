import { useState } from "react";
import "./ImageCardModal.css";

interface IProps {
  image: string;
  likes: number;
}

const Modal = ({ likes, image }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              X
            </span>
            <div>
              <img src={image} width="100%" height="100%" />
              <h1 style={{ color: "#000", marginTop: "20px" }}>
                Total Likes : {likes}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
