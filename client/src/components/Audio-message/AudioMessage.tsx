import cn from 'classnames';
import styles from './AudioMessage.module.scss';

export const AudioMessage = ({ position }: { position: string }) => {
  return (
    <div className={cn(styles.wrapper, position === 'right' ? styles.positionMessage : '')}>
      <div className={styles.container}>
        <div>Message</div>
      </div>
    </div>
  );
};
