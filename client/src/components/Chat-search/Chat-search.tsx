import styles from './Chat-search.module.scss';
import Search from '../../../public/loop.svg?react';

export const ChatSearch = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} placeholder="Search" />
      <button type="button">
        <Search />
      </button>
    </div>
  );
};
