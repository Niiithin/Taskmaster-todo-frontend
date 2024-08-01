import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as notificationService from "services/notification";
import Notification from "pages/notification";

jest.mock("services/notification");
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockedNotificationService = notificationService as jest.Mocked<
  typeof notificationService
>;

describe("Notification", () => {
  const theme = createTheme();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Notification component with loading state", async () => {
    mockedNotificationService.getNotifications.mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <ThemeProvider theme={theme}>
        <Notification />
      </ThemeProvider>
    );

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test('renders "No notifications" when there are no notifications', async () => {
    mockedNotificationService.getNotifications.mockResolvedValue({
      status: 200,
      data: { notifications: [] },
    });

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Notification />
        </ThemeProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("No notifications")).toBeInTheDocument();
    });
  });

  test("calls getNotifications on initial render", async () => {
    mockedNotificationService.getNotifications.mockResolvedValue({
      status: 200,
      data: { notifications: [] },
    });

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Notification />
        </ThemeProvider>
      );
    });

    expect(mockedNotificationService.getNotifications).toHaveBeenCalledWith(
      "1",
      "10"
    );
  });
});
