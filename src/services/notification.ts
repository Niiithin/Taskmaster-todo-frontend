/* Relative Imports */
import axiosInstance from "config/axiosConfig";

// ----------------------------------------------------------------------

export const sendCollabInvite = (
  receiverEmail: string,
  todoId: string
): Promise<any> => {
  return axiosInstance
    .post("/api/notifications/invite", {
      receiverEmail,
      todoId,
    })
    .then((response) => response);
};

export const getNotifications = (page: string, limit: string): Promise<any> => {
  return axiosInstance
    .get("/api/notifications/getNotifications", {
      params: { page, limit },
    })
    .then((response) => response);
};

export const handleInviteNotifications = (
  id: string,
  status: string
): Promise<any> => {
  return axiosInstance
    .patch(`/api/notifications/${id}`, {
      status,
    })
    .then((response) => response);
};
