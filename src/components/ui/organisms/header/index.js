import styles from "./header.module.css";
import { SearchBar } from './../../../ui';
import logo from '../../../../assets/logo/logo-upprcs.png';
import iconAvatar from '../../../../assets/icons/icon-user.png';
import mergeClassNames from 'merge-class-names';

export const Header = (props) => {
  const { searchValue, onChangeSearchValueHandler, onSendRequestHandler } = props;

  return (
    <header>
      <div className={mergeClassNames("container-limit", styles.header)}>
        <a href="/" className={styles.headerLogo}>
          <img src={logo} alt="UpperSetup" className={styles.headerLogoPic}/>
        </a>

        <SearchBar className={styles.searchbar} value={searchValue} changeHandler={onChangeSearchValueHandler} requestHandler={onSendRequestHandler} />

        <div className={styles.profile}>
          <img src={iconAvatar} alt="Avatar" className={styles.profileImg}/>
          <span className={styles.profileName}>Your Name</span>
        </div>
      </div>
    </header>
  )
}
