export const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const toastMessages = {
  success: {
    auth: {
      login: "Login Successful",
      register: "User Registered Successful!. Sign in to continue.",
    },
    task: {
      added: "Task added successfully",
      deleted: "Task deleted successfully",
      updated: "Task updated successfully",
      sentRequest: "Collaboration request sent successfully",
      rejectedRequest: "Rejected collaboration request",
      acceptedRequest: "Accepted collaboration request",
      completed: "Task Completed",
      incomplete: "Task marked as incomplete",
    },
  },
  error: {
    common: "Unable to process your request. Please try again.",
    auth: {
      alreadyRegistered: "Email is already in use",
      notRegistered: "Email is not registered yet.",
      notActive: "Account is not active yet.",
      invalidCredentials: "Email or Password are incorrect.",
      invalidResetToken:
        "Link is either expired or invalid. Please try again with new link.",
    },
    collab: {
      userNotRegistered: "User has not registered",
      invalidEmailId: "Invalid email id",
    },
  },
};

// showToast(toastMessages.error.common, "error");
