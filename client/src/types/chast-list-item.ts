export interface ChatListItemProps {
  id: number;
  avatar: string;
  name: string;
  surName: string;
  pinned: boolean;
  lock: boolean;
  date: string;
  messageCount: number | null;
  online: boolean;
  lastMessage: string;
  pinnedLastMessage: string;
  groupChannel: boolean;
  lastMessageAttachIcon: string | null;
  verify?: boolean;
  mute: boolean;
}
