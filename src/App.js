import { useState } from 'react';
import mergeClassNames from 'merge-class-names';
import styles from "./App.module.css"
import { Header, Loader, MovieCard, Paginator } from './components/ui';
import axios from 'axios';
import { convertMoviesData } from './utils/moviesResConverter';

// It should be defined in project documentation or used as query param
const PAGE_SIZE = 10;

const initialState = {
  currentRequest: "",
  currentPage: 1,
  totalPages: 0,
  pageResults: [],
  totalResults: 0,
}

function App() {
  const [isDataFetching, setFetchingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [queryState, setQueryValue] = useState("");
  const [resultsState, setResultsState] = useState(initialState);
  const [pageState, setPage] = useState(1);


  const updateQueryStrValue = (queryVal) => {
    if (errorMessage?.length) setErrorMessage(null);
    if (pageState !== 1) setPage(1);
    setQueryValue(queryVal);
  }

  const goToPage = (pageNumber) => {
    if (pageNumber !== resultsState.currentPage) {
      setPage(pageNumber);
      if (queryState.length) {
        sendSearchReq(queryState, pageNumber)
      }
    }
  }

  const sendSearchReq = async (requestVal, page = 1) => {
    if (requestVal?.length) {
      setFetchingStatus(true);
      axios
        .get(`https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${requestVal}&page=${page}`)
        .then(({ data, status }) => {
          if (status === 200 && data["Error"]?.length) {
            setErrorMessage(data["Error"]);
            setResultsState(initialState);
            setPage(1);
          } else if (status === 200 && data["Search"]?.length) {
            setResultsState({
              currentPage: page,
              currentRequest: requestVal,
              totalPages: Math.ceil(data.totalResults / PAGE_SIZE),
              pageResults: convertMoviesData(data["Search"]),
              totalResults: data.totalResults,
            });
          } else {
            setErrorMessage("Something went wrong. Try again in a few minutes");
            setResultsState(initialState);
            setPage(1);
          }
          setFetchingStatus(false)
        })
    }
  }

  return (
    <div className={mergeClassNames(styles.wrapper, isDataFetching && styles.scrollBlocked)}>
      <Header
        searchValue={queryState}
        onChangeSearchValueHandler={updateQueryStrValue}
        onSendRequestHandler={() => sendSearchReq(queryState)}
      />
      <main className={mergeClassNames(styles.mainContentWrapper, "container-limit")}>
        {errorMessage?.length
          ? (<div className={styles.errorContainer}>
            <span>{errorMessage}</span>
          </div>)
          : resultsState.pageResults?.length ? (<>
              <div className={styles.searchData}>
                <span>You searched for: <span className={styles.searchRequest}>{resultsState.currentRequest}</span></span>
                <span
                  className={styles.resultsCount}>{`${resultsState.totalResults} result${resultsState.totalResults > 1 ? 's' : ''}`}</span>
              </div>
              <div className={styles.results}>
                {resultsState.pageResults.map((result) => (
                  <MovieCard
                    key={result.imdbID}
                    name={result.title}
                    year={result.year}
                    imdbId={result.imdbID}
                    type={result.type}
                    previewImgUrl={result.poster}
                  />))}
              </div>
            </>)
            : (<div>
              <span onClick={() => setQueryValue("Batman")}>Try to search something</span>
            </div>)
        }

        {resultsState.totalPages > 1 && (
          <Paginator
            maxPage={resultsState.totalPages}
            currentPage={resultsState.currentPage}
            onChangePageHandler={goToPage}
          />)}
      </main>

      {isDataFetching && <Loader/>}
    </div>
  )
}

export default App;
