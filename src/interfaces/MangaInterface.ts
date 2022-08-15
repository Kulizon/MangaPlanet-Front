import ReviewInterface from "./ReviewInterface";



interface MangaInterface {
  id: number;

  attributes: {
    description: string;
    genre: string;
    name: string;
    published: string;
    author: { data: { attributes: { name: string } } };
    finishedBy: { data: any[] };
    favouriteBy: { data: any[] };
    readlistBy: { data: any[] };
    image: {
      data: {
        attributes: {
          formats: { small: { url: string }; medium: { url: string }; thumbnail: { url: string } };
          url: string;
        };
      };
    };
    reviews: {
      data: ReviewInterface[];
    };
    volumes: {
      data: {
        id: number;
        attributes: {
          chapters: {
            data: {
              id: number;
              attributes: { name: string; number: number; volume: { data: { attributes: { number: number } } } };
            }[];
          };
          number: number;
          name: string;
          image: {
            data: {
              id: number;
              attributes: {
                formats: { small: { url: string }; medium: { url: string }; thumbnail: { url: string } };
                url: string;
              };
            };
          };
        };
      }[];
    };
  };
}

export default MangaInterface;
