
// finds best available image quality
// 4 -> worst   1 -> best 
const findBestFormat = (formats: any, startFormat: 4 | 3 | 2 | 1) => {
  if (!formats) return null;

  const availableFormats = Object.keys(formats);

  if (startFormat === 4) return formats[availableFormats[0]];
  if (startFormat === 3)
    return formats[availableFormats[3]] ? formats[availableFormats[3]] : formats[availableFormats[0]];
  if (startFormat === 2)
    return formats[availableFormats[2]]
      ? formats[availableFormats[2]]
      : formats[availableFormats[3]]
      ? formats[availableFormats[3]]
      : formats[availableFormats[0]];
  if (startFormat === 1)
    return formats[availableFormats[1]]
      ? formats[availableFormats[1]]
      : formats[availableFormats[2]]
      ? formats[availableFormats[2]]
      : formats[availableFormats[3]]
      ? formats[availableFormats[3]]
      : formats[availableFormats[0]];
};

export default findBestFormat;
