export interface TodoItem {
  collaboration: Collaboration[];
  completedDate: string | null;
  creator: string;
  description: string;
  dueDate: string;
  scheduleDate: string;
  status: "NotCompleted" | "Completed" | "Postponed" | "Cancelled";
  title: string;
  _id: string;
}

export interface TaskCardTemplateProps {
  todoId: string;
  todoStatus: TodoItem["status"];
  title: string;
  description: string;
  dueDate: string;
  onStatusChange: (todoId: string, newStatus: TodoItem["status"]) => void;
  onTaskUpdated: () => void;
}

export interface Collaboration {
  email: string;
  username: string;
  _id: string;
}
