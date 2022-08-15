interface CommentInterface {
  id: number;
  attributes: {
    comment: string;
    createdAt: string;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
          image: { data: { attributes: { formats: { thumbnail: { url: string } } } } };
        };
      };
    };
  };
}

export default CommentInterface;
