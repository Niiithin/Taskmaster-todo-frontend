import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../../pages/auth/SignUp/SignUpForm";
import * as authService from "services/auth";
import * as toastUtility from "utility/toast";

// Mock the dependencies
jest.mock("services/auth");
jest.mock("utility/toast");

// Create mock types
const mockedAuthService = authService as jest.Mocked<typeof authService>;
const mockedToastUtility = toastUtility as jest.Mocked<typeof toastUtility>;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SignUpForm component", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    expect(screen.getByLabelText("User Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("validates form fields on submission", async () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your name")).toBeInTheDocument();
      expect(
        screen.getByText("Please enter your registered email address.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter your login password.")
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    mockedAuthService.registerUserRequest.mockResolvedValue({ status: 201 });

    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("User Name"), {
      target: { value: "Demo Account" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "demo@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockedAuthService.registerUserRequest).toHaveBeenCalledWith(
        "Demo Account",
        "demo@gmail.com",
        "password123"
      );
      expect(mockedToastUtility.showToast).toHaveBeenCalledWith(
        expect.any(String),
        "success"
      );
      expect(mockNavigate).toHaveBeenCalledWith(expect.any(String));
    });
  });

  test("handles already registered user error", async () => {
    mockedAuthService.registerUserRequest.mockRejectedValue({
      response: { status: 400 },
    });

    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("User Name"), {
      target: { value: "Demo Account" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "demo@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockedToastUtility.showToast).toHaveBeenCalledWith(
        expect.any(String),
        "error"
      );
    });
  });

  test("handles server error", async () => {
    mockedAuthService.registerUserRequest.mockRejectedValue({
      response: { status: 500 },
    });

    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("User Name"), {
      target: { value: "Demo Account" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "demo@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockedToastUtility.showToast).toHaveBeenCalledWith(
        expect.any(String),
        "error"
      );
    });
  });

  test('navigates to sign in page when "Login" is clicked', () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(mockNavigate).toHaveBeenCalledWith(expect.any(String));
  });
});
