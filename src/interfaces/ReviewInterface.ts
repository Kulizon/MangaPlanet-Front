interface ReviewInterface {
  id: number;
  attributes: {
    review: string;
    score: number;
    createdAt: string;
    manga: { id: number; name: string };
    users_permissions_user: {
      id: number;
      data: {
        id: number;
        attributes: {
          username: string;
          image: {
            data: { id: number; attributes: { formats: { thumbnail: { url: string }; small: { url: string } } } };
          };
        };
      };
    };
  };
}

export default ReviewInterface;
