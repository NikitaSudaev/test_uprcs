export const convertMoviesData = (rawData) => {
  return rawData.map((item) => {
    return {
      title: item["Title"],
      type: item["Type"],
      poster: item["Poster"] !== "N/A" ? item["Poster"] : null,
      imdbID: item["imdbID"],
      year: item["Year"],
    }
  })
}
