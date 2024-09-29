import styles from './movie-card.module.css';
import placeholderImg from '../../../../assets/placeholders/placeholderImg.png';

export const MovieCard = (props) => {
  return (
    <div>
      <div className={styles.cardImgWrapper}>
        <img
          src={props.previewImgUrl ? props.previewImgUrl : placeholderImg}
          alt={props.previewImgUrl ? `${props.name} poster` : "No poster image"}
          className={props.previewImgUrl
            ? styles.cardImg
            : styles.cardImgPlaceholder}
        />
      </div>
      <div className={styles.info}>
        <span>Name: {props.name}</span>
        <span>Year: {props.year}</span>
        <span>imdbID: {props.imdbId}</span>
        <span>Type: {props.type}</span>
      </div>
    </div>
  )
}
