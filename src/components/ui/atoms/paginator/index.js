import mergeClassNames from 'merge-class-names';
import styles from './paginator.module.css';
import iconPrev from './../../../../assets/icons/icon-arrow-left.png';
import iconNext from './../../../../assets/icons/icon-arrow-right.png';

export const Paginator = (props) => {
  const { maxPage, currentPage = 1, onChangePageHandler } = props;

  if (!maxPage || maxPage < 2) return null;

  const pagesOptions = []
  for (let i = 1; i <= maxPage; i++) {
    if (maxPage < 6) {
      pagesOptions.push(i)
    } else if (i === 1) {
      pagesOptions.push(i)
    } else if (i < 4 && currentPage < 4) {
      pagesOptions.push(i)
    } else if (currentPage > 3 && !pagesOptions.includes("firstSpace")) {
      pagesOptions.push("firstSpace");
    } else if (i === currentPage) {
      pagesOptions.push(i)
    } else if (i > currentPage && currentPage < maxPage - 1 && !pagesOptions.includes("secondSpace")) {
      pagesOptions.push("secondSpace")
    } else if (currentPage > maxPage - 3 && i > maxPage - 3) {
      pagesOptions.push(i)
    } else if (i === maxPage) {
      pagesOptions.push(i)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      onChangePageHandler(currentPage - 1)
    }
  }
  const goToNextPage = () => {
    if (currentPage < maxPage) {
      onChangePageHandler(currentPage + 1)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginator}>
        <div className={mergeClassNames(
          styles.button,
          currentPage === 1 && styles.buttonDisabled,
        )} onClick={goToPrevPage}>
          <img src={iconPrev} alt="Prev" />
        </div>
        {
          pagesOptions.map((page) => {
            return (
              <div
                key={page}
                className={mergeClassNames(
                  styles.button,
                  currentPage === page && styles.buttonActive,
                )}
                onClick={() => page !== "firstSpace" && page !== "secondSpace" && onChangePageHandler(page)}>
                <span>
                  {page === "firstSpace" || page === "secondSpace" ? "..." : page}
                </span>
              </div>
            )
          })
        }
        <div className={mergeClassNames(
          styles.button,
          currentPage === maxPage && styles.buttonDisabled,
        )} onClick={goToNextPage}>
          <img src={iconNext} alt="Next" />
        </div>
      </div>
    </div>
  )
}
