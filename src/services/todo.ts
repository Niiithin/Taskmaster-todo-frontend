/* Relative Imports */
import axiosInstance from "config/axiosConfig";
import { TodoItem } from "models/todo";

// ----------------------------------------------------------------------

export const addToDo = (
  title: string,
  description: string,
  scheduleDate: string,
  dueDate: string
): Promise<any> => {
  return axiosInstance
    .post("/api/todos/create-todo", {
      title,
      description,
      scheduleDate,
      dueDate,
    })
    .then((response) => response);
};

export const editToDo = (
  todoId: string,
  title: string,
  description: string,
  scheduleDate: string,
  dueDate: string
): Promise<any> => {
  return axiosInstance
    .put(`/api/todos/edit-todo/${todoId}`, {
      title,
      description,
      scheduleDate,
      dueDate,
    })
    .then((response) => response);
};

export const getAllTodos = (): Promise<any> => {
  return axiosInstance
    .get("/api/todos/getAllTodos")
    .then((response) => response);
};

export const getTodoById = (todoId: string): Promise<any> => {
  return axiosInstance
    .get(`/api/todos/get-todo-by-id/${todoId}`)
    .then((response) => response);
};

export const getAllTodosByDate = (
  page: string,
  date: string,
  status: string
): Promise<any> => {
  return axiosInstance
    .get(`/api/todos/filter`, {
      params: { page, date, status },
    })
    .then((response) => response);
};

export const deleteTodos = (): Promise<any> => {
  return axiosInstance
    .delete("/api/todos/getAllTodos")
    .then((response) => response);
};

export const updateTodoStatus = async (
  todoId: string,
  status: TodoItem["status"]
): Promise<any> => {
  return axiosInstance
    .put(`/api/todos/update-todo-status/${todoId}`, {
      status,
    })
    .then((response) => response);
};

export const searchToDo = (searchTerm: string, page: string): Promise<any> => {
  return axiosInstance
    .get(`/api/todos/search/`, {
      params: {
        searchTerm,
        page,
      },
    })
    .then((response) => response);
};
