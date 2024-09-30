import mergeClassNames from 'merge-class-names';
import styles from './search-bar.module.css';

export const SearchBar = (props) => {
  const { value, changeHandler, requestHandler } = props;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (value.length) requestHandler();
  }

  return (
    <form className={mergeClassNames(styles.searchbar, props.className)} onSubmit={formSubmitHandler}>
      <input type="text" placeholder="Inseart search query" className={styles.input} value={value} onChange={(e) => {changeHandler(e.target.value)}} />
      <button type="submit" disabled={value.length < 1} className={mergeClassNames(styles.button, !value.length && styles.buttonDisabled)} onClick={requestHandler} />
    </form>
  )
}