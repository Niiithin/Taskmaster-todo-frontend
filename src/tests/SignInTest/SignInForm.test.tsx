import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../../pages/auth/SignIn/SignInForm";
import * as authService from "services/auth";
import * as toastUtility from "utility/toast";

jest.mock("services/auth");
jest.mock("utility/toast");

const mockedAuthService = authService as jest.Mocked<typeof authService>;
const mockedToastUtility = toastUtility as jest.Mocked<typeof toastUtility>;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignInForm", () => {
  const mockOnSubmitSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SignInForm component", () => {
    render(
      <Router>
        <SignInForm onSubmitSuccess={mockOnSubmitSuccess} />
      </Router>
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    mockedAuthService.loginUserRequest.mockResolvedValue({
      status: 200,
      data: { token: "fake-token" },
    });
    mockedAuthService.getUserProfileRequest.mockResolvedValue({
      status: 200,
      data: { userId: "123", username: "demoaccount", email: "demo@gmail.com" },
    });

    render(
      <Router>
        <SignInForm onSubmitSuccess={mockOnSubmitSuccess} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "demo@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockedAuthService.loginUserRequest).toHaveBeenCalledWith(
        "demo@gmail.com",
        "password123"
      );
      expect(mockedAuthService.getUserProfileRequest).toHaveBeenCalledWith(
        "fake-token"
      );
      expect(mockOnSubmitSuccess).toHaveBeenCalledWith("fake-token", {
        id: "123",
        username: "demoaccount",
        email: "demo@gmail.com",
      });
      expect(mockedToastUtility.showToast).toHaveBeenCalledWith(
        expect.any(String),
        "success"
      );
    });
  });

  test("handles invalid credentials", async () => {
    mockedAuthService.loginUserRequest.mockResolvedValue({ status: 204 });

    render(
      <Router>
        <SignInForm onSubmitSuccess={mockOnSubmitSuccess} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "demo@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockedToastUtility.showToast).toHaveBeenCalledWith(
        expect.any(String),
        "error"
      );
    });
  });

  test('navigates to sign up page when "Register" is clicked', () => {
    render(
      <Router>
        <SignInForm onSubmitSuccess={mockOnSubmitSuccess} />
      </Router>
    );

    fireEvent.click(screen.getByText("Register"));

    expect(mockNavigate).toHaveBeenCalledWith(expect.any(String));
  });
});
