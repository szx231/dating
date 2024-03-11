/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from 'react';
import cn from 'classnames';
import styles from './ScrollHoc.module.scss';

export const ScrollHoc = (component) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      onMouseOver={() => setFocus(true)}
      onMouseOut={() => setFocus(false)}
      className={cn(
        styles.chatListContainer,
        styles['custom-scroll-container'],
        { [styles.scroTrackHidden]: focus },
        { [styles.scroThumHidden]: focus },
      )}
    >
      {component}
    </div>
  );
};
