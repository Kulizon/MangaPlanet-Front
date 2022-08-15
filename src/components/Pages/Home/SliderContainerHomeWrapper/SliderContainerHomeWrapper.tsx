import useFetch from "../../../../hooks/useFetch";
import { useEffect } from "react";
import MangaInterface from "../../../../interfaces/MangaInterface";
import shuffleArray from "../../../../utilities/shuffle";

import SliderContainer from "../../../UI/SliderContainer/SliderContainer";
import SpinningWheelAndError from "./../../../UI/SpinningWheelAndError/SpinningWheelAndError";

const SliderContainerHomeWrapper = (props: { link: string; title: string; shuffle?: boolean }) => {
  const [loading, error, data, getData] = useFetch();

  useEffect(() => {
    getData(props.link);
  }, [getData, props.link]);

  const mangas: MangaInterface[] = data?.data;

  return loading || error || !data?.data ? (
    <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>
  ) : (
    <SliderContainer title={props.title} content={props.shuffle ? shuffleArray(mangas) : mangas}></SliderContainer>
  );
};

export default SliderContainerHomeWrapper;
