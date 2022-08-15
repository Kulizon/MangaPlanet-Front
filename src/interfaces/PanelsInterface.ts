interface PanelsInterface {
  id: number;
  attributes: {
    formats: { large: { url: string }; medium: { url: string }; small: { url: string }; thumbnail: { url: string } };
    url: string;
  };
}

export default PanelsInterface;
