export const filterMovies = (moviesData, searchParams) => {
  const filterValue = searchParams.value;

  return moviesData.filter((data) => {
    return (
      data.nameRU.toLowerCase().includes(filterValue.toLowerCase()) ||
      data.nameEN.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
};
