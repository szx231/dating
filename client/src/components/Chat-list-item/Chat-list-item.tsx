import cn from 'classnames';
import { useState } from 'react';
import styles from './Chat-list-item.module.scss';
import { ChatListItemProps } from '../../types/chast-list-item';
import Pin from '../../../public/Pin.svg?react';
import Verify from '../../../public/verify.svg?react';
import Mute from '../../../public/mute.svg?react';

interface Props {
  checkedItem: number | null;
  setCheckedItem: (value: number | null) => void;
}

export const ChatListItem = (props: ChatListItemProps & Props) => {
  const {
    avatar,
    name,
    surName,
    pinned,
    lock,
    id,
    date,
    messageCount,
    online,
    lastMessage,
    pinnedLastMessage,
    groupChannel,
    verify,
    mute,
    lastMessageAttachIcon,
    checkedItem,
    setCheckedItem,
  } = props;

  function getTime(datetimeString: string) {
    const dt = new Date(datetimeString);
    return `${`0${dt.getHours()}`.slice(-2)}:${`0${dt.getMinutes()}`.slice(-2)}`;
  }

  const checkItem = (itemId: number) => {
    if (checkedItem === itemId) return setCheckedItem(null);
    setCheckedItem(itemId);
  };

  const checked = checkedItem === id;

  return (
    <div className={cn(styles.container, { [styles.checked]: checked })}>
      <div className={checked ? styles.checkedBorder : ''} />
      <button onClick={() => checkItem(id)} type="button" className={styles.infoContainer}>
        <div className={styles.avatarInfoContainer}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
            {online && <div className={styles.onlineIndicate} />}
          </div>
          <div className={styles.gap}>
            <div className={styles.fullNameContainer}>
              {/* <img src="" alt="pinnedIcon" /> */}
              <div className={styles.fullName}>
                <div>
                  <div className={styles.wrapperGap}>
                    <div className={styles.fullNameText}>{`${name} ${surName}`}</div> {verify && <Verify />}{' '}
                    {mute && <Mute />}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.lastMessage}>
              <div className={styles.lastMessageWrapper}>
                {lastMessageAttachIcon && <img src={lastMessageAttachIcon} alt="iconMessage" />}
                <div className={styles.lastMessageText}>{lastMessage}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn(styles.rightSide, styles.gap)}>
          <div className={styles.date}>{`${getTime(date)} PM`}</div>
          <div className={styles.wrapper}>
            {messageCount && (
              <div className={cn(styles.messageCountContainer, { [styles.messageCountChecked]: checked })}>
                {messageCount}
              </div>
            )}
            {pinned && (
              <div className={styles.pinContainer}>
                <Pin />
              </div>
            )}
          </div>
        </div>
      </button>
      <div />
    </div>
  );
};
