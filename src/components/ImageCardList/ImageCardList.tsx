import "./ImageCardList.css";
import ImageCard from "../ImageCard/ImageCard";

interface ImageData {
  urls: {
    regular: string;
    full: string;
  };
  likes: number;
}

interface ImageCardListProps {
  data: ImageData[];
}

const ImageCardList = ({ data }: ImageCardListProps) => {
  return (
    <div className="image-card-list">
      {data.map((item: any, index: number) => {
        return <ImageCard key={index} image={item.urls} likes={item.likes} />;
      })}
    </div>
  );
};

export default ImageCardList;
