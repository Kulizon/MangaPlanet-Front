import shuffleArray from "./shuffle";
import ReviewInterface from "../interfaces/ReviewInterface";

// changes mangas response format -> adds attributes fields to reviews and image
const changeResponseFormat = (array: any[]) => {
  return shuffleArray([...array])
    .slice(0, 5)
    .map((r: any) => {
      return {
        id: r.id,
        attributes: {
          ...r,
          reviews: {
            data: [
              ...r.reviews.map((rev: ReviewInterface) => {
                return { id: rev.id, attributes: { ...rev } };
              }),
            ],
          },
          image: { data: { id: r.image.id, attributes: { ...r.image } } },
        },
      };
    });
};

export default changeResponseFormat;
