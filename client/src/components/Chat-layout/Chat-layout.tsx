import { useState } from 'react';
import styles from './Chat-layout.module.scss';
import { ChatList } from '../Chat-list/Chat-list';
import { Chat } from '../Chat/Chat';

export const ChatLayout = () => {
  return (
    <div className={styles.container}>
      <ChatList />
      <Chat />
      <div>right</div>
    </div>
  );
};
