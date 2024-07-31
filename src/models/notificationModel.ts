export interface User {
  email: string;
  username: string;
  __v: number;
  _id: string;
}

export interface Todo {
  description: string;
  title: string;
  _id: string;
}

export interface NotificationModel {
  createdAt: string;
  inviteStatus: string;
  receiverUserId: User;
  senderUserId: User;
  todoId: Todo;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface NotificationResponse {
  notifications: Notification[];
}
