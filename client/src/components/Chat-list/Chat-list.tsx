/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import cn from 'classnames';
import styles from './Chat-list.module.scss';
import { ChatListItem } from '../Chat-list-item/Chat-list-item';
import { chatListItemsMock } from '../../mocks/chat-list-items-mock';
import BurgetIcon from '../../../public/burget.svg?react';
import { ChatSearch } from '../Chat-search/Chat-search';
import { ScrollHoc } from '../../helpers/hoc/scroll/ScrollHoc';

export const ChatList = () => {
  const [checkedItem, setCheckedItem] = useState<null | number>(null);
  const filterToPinned = chatListItemsMock.sort((a, b) => (a.pinned && !b.pinned ? -1 : 1));
  const [focus, setFocus] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.button} type="button">
          <BurgetIcon />
        </button>
        <div className={styles.chatText}>Chats</div>
      </div>
      <ChatSearch />
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
        {filterToPinned.map((userItem) => {
          return (
            <ChatListItem
              checkedItem={checkedItem}
              setCheckedItem={setCheckedItem}
              id={userItem.id}
              avatar={userItem.avatar}
              name={userItem.name}
              surName={userItem.surName}
              pinned={userItem.pinned}
              lock={userItem.lock}
              date={userItem.date}
              messageCount={userItem.messageCount}
              online={userItem.online}
              lastMessage={userItem.lastMessage}
              pinnedLastMessage={userItem.pinnedLastMessage}
              groupChannel={userItem.groupChannel}
              lastMessageAttachIcon={userItem.lastMessageAttachIcon}
              mute={userItem.mute}
              verify={userItem.verify}
            />
          );
        })}
      </div>
    </div>
  );
};
