import mergeClassNames from 'merge-class-names';
import styles from './search-bar.module.css';

export const SearchBar = (props) => {
  const { value, changeHandler, requestHandler } = props;
  return (
    <div className={mergeClassNames(styles.searchbar, props.className)}>
      <input type="text" placeholder="Inseart search query" className={styles.input} value={value} onChange={(e) => {changeHandler(e.target.value)}} />
      <button disabled={!value.length} className={mergeClassNames(styles.button, !value.length && styles.buttonDisabled)} onClick={requestHandler} />
    </div>
  )
}