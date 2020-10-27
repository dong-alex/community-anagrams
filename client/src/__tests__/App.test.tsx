import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "../App";
import useAnagramService from "../components/api/useAnagramService";

jest.mock("../components/api/useAnagramService");

describe("Overall App Tests", () => {
  beforeEach(() => {
    (useAnagramService as jest.Mock).mockRestore();
  });

  it("renders the app without data", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: jest.fn().mockResolvedValue([]),
      saveAnagram: jest.fn().mockResolvedValue(false),
    });

    await act(async () => {
      const { container } = render(<App />);
      expect(container).toMatchSnapshot();
    });
  });

  it("lists no top anagram requests initially", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: jest.fn().mockResolvedValue([]),
      saveAnagram: jest.fn().mockResolvedValue(false),
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.queryAllByTestId("top-anagram-item")).toHaveLength(0);
    expect(screen.getByTestId("top-anagrams-board-header")).toMatchSnapshot();
  });

  it("lists top anagram requests when they exist", async () => {
    const stub = jest.fn().mockResolvedValue([
      { firstWord: "testing", secondWord: "testing", count: 10 },
      { firstWord: "tester", secondWord: "tester", count: 9 },
    ]);

    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: stub,
      saveAnagram: jest.fn().mockResolvedValue(false),
    });

    await act(async () => {
      render(<App />);
    });

    expect(stub).toBeCalledTimes(1);
    const items = await screen.findAllByTestId("top-anagram-item");
    expect(items).toMatchSnapshot();
  });

  it("should handle saving anagrams when valid", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: jest.fn().mockResolvedValue([]),
      saveAnagram: jest.fn().mockResolvedValue(false),
    });

    render(<App />);
    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    fireEvent.change(firstInputField, {
      target: { value: "racer", name: "firstWord" },
    });

    fireEvent.change(secondInputField, {
      target: { value: "carer", name: "secondWord" },
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId("result-alert")).toMatchSnapshot();
  });

  it("should handle not saving anagrams when invalid", async () => {
    const spy = jest.fn();

    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: jest.fn().mockResolvedValue([]),
      saveAnagram: spy,
    });

    render(<App />);
    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    fireEvent.change(firstInputField, {
      target: { value: "ra2cer", name: "firstWord" },
    });

    fireEvent.change(secondInputField, {
      target: { value: "carer", name: "secondWord" },
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByTestId("error-alert")).toMatchSnapshot();
  });

  it("should handle error when saving anagram", async () => {
    // TODO: change all test descriptions to use "should"
    const stub = jest.fn().mockRejectedValue("error when submitting");
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: jest.fn().mockResolvedValue([]),
      getTopAnagrams: jest.fn().mockResolvedValue([]),
      saveAnagram: stub,
    });

    render(<App />);
    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    fireEvent.change(firstInputField, {
      target: { value: "racer", name: "firstWord" },
    });

    fireEvent.change(secondInputField, {
      target: { value: "carer", name: "secondWord" },
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(stub).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("error-alert")).toMatchSnapshot();
  });
});
