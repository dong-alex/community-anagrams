import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import AnagramRequestCard from "../components/AnagramRequestCard";

describe("AnagramRequestCard Tests", () => {
  it("renders the basic card", () => {
    const stub = jest.fn();

    const { container } = render(<AnagramRequestCard onSaveAnagram={stub} />);

    expect(container).toMatchSnapshot();
  });

  it("calls the api with the correct parameters - Not an Anagram", async () => {
    const stub = jest.fn((fw: string, sw: string) => Promise.resolve(false));

    render(<AnagramRequestCard onSaveAnagram={stub} />);

    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "firstword", name: "firstWord" },
      });
    });

    act(() => {
      fireEvent.change(secondInputField, {
        target: { value: "secondword", name: "secondWord" },
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(stub).toHaveBeenCalledWith("firstword", "secondword");

    // look for alerts
    const alert = screen.getByTestId("result-alert");

    expect(alert).toHaveTextContent(/Unfortunately/);
  });

  it("calls the api with the correct parameters - Is An Anagram", async () => {
    const stub = jest.fn((fw: string, sw: string) => Promise.resolve(true));

    render(<AnagramRequestCard onSaveAnagram={stub} />);

    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "racer", name: "firstWord" },
      });
    });

    act(() => {
      fireEvent.change(secondInputField, {
        target: { value: "carer", name: "secondWord" },
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(stub).toHaveBeenCalledWith("racer", "carer");

    // look for alerts
    const alert = screen.getByTestId("result-alert");

    expect(alert).toHaveTextContent(/Great/);
  });

  it("shows an error alert if you have letters or symbols in the words", async () => {
    const stub = jest.fn();

    render(<AnagramRequestCard onSaveAnagram={stub} />);

    const firstInputField = screen.getByTestId("first-word-input");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "racer22", name: "firstWord" },
      });
    });

    // look for alerts
    const alert = screen.getByTestId("error-alert");

    expect(alert).toBeDefined();
  });

  it("shows an error alert if you have symbols in the words", async () => {
    const stub = jest.fn();

    render(<AnagramRequestCard onSaveAnagram={stub} />);

    const firstInputField = screen.getByTestId("first-word-input");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "!!abc", name: "firstWord" },
      });
    });

    // look for alerts
    const alert = screen.getByTestId("error-alert");

    expect(alert).toBeDefined();
  });

  it("shows an error alert if the anagram check request fails", async () => {
    const stub = jest.fn().mockRejectedValue("error with the request");

    render(<AnagramRequestCard onSaveAnagram={stub} />);

    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "racer", name: "firstWord" },
      });
    });

    act(() => {
      fireEvent.change(secondInputField, {
        target: { value: "carer", name: "secondWord" },
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // look for alerts
    const alert = screen.getByTestId("error-alert");

    expect(alert).toHaveTextContent(
      /There was an issue with checking the words, please try again./
    );
  });
});
