import { useState } from "react";
import ImageCardModal from "../ImageCardModal/ImageCardModal";

interface IProps {
  image: {
    small: string;
    full: string;
  };
  likes: number;
}

const ImageCard = ({ image, likes }: IProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");

  const handlePhotoClick = (image: string) => {
    setSelectedPhoto(image);
  };

  return (
    <>
      <div>
        <img
          style={{ width: "300px", objectFit: "cover", cursor: "pointer" }}
          src={image.small}
          onClick={() => handlePhotoClick(image.full)}
          alt="Preview"
        />
      </div>

      {selectedPhoto && <ImageCardModal likes={likes} image={image.full} />}
    </>
  );
};

export default ImageCard;
