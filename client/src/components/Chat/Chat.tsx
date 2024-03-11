import styles from './Chat.module.scss';
import { WriteMessage } from '../Write-message/WriteMessage';
import { AudioMessage } from '../Audio-message/AudioMessage';

export const Chat = () => {
  const arr = Array.from({ length: 20 }, (_, i) => {
    return {
      position: i % 2 === 0 ? 'right' : 'left',
    };
  });

  return (
    <div className={styles.container}>
      <header>header</header>
      <div className={styles.wrapperMessages}>
        <div className={styles.messageList}>
          {arr.map((el) => (
            <AudioMessage position={el.position} />
          ))}
        </div>
      </div>
      <WriteMessage />
    </div>
  );
};
