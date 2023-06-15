export const filterMovies = (moviesData, filterValue, isShort) => {
  return moviesData.filter((data) => {
    return (
      data.nameRU.toLowerCase().includes(filterValue.toLowerCase()) ||
      data.nameEN.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
};
