import { screenSizeEnum } from "./enums";

const getFilmsCount = (screenSize) => {
  let count;
  switch (screenSize) {
    case screenSizeEnum.L:
      count = 12;
      break;
    case screenSizeEnum.M:
      count = 8;
      break;
    case screenSizeEnum.S:
      count = 5;
      break;
    default:
      throw new Error(
        `value=${screenSize} is out of ${typeof screenSizeEnum} range`
      );
  }

  return count;
};

const getSlicedFilms = (screenSize, movies) => {
  const count = getFilmsCount(screenSize);
  return movies.slice(0, count);
};

const getAddCount = (screenSize) => {
  let addCount;
  switch (screenSize) {
    case screenSizeEnum.L:
      addCount = 3;
      break;
    case screenSizeEnum.M:
    case screenSizeEnum.S:
      addCount = 2;
      break;
    default:
      throw new Error(
        `value=${screenSize} is out of ${typeof screenSizeEnum} range`
      );
  }

  return addCount;
};

export { getFilmsCount, getSlicedFilms, getAddCount };
