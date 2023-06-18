import { SHORT_DURATION } from './constants';

export const filterMovies = (moviesData, searchParams) => {
  const filterValue = searchParams.value;
  const isShort = searchParams.isShort;

  return moviesData.filter((data) => {
    if (isShort) {
      if (data.duration > SHORT_DURATION) {
        return 0;
      }
    }

    return (
      data.nameRU.toLowerCase().includes(filterValue.toLowerCase()) ||
      data.nameEN.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
};
