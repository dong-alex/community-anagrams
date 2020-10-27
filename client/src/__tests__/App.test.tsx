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
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () => Promise.resolve([]),
      saveAnagram: () => Promise.resolve(false),
    });

    await act(async () => {
      const { container } = render(<App />);
      expect(container).toMatchSnapshot();
    });
  });

  it("lists no top anagram requests initially", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () => Promise.resolve([]),
      saveAnagram: () => Promise.resolve(false),
    });

    // await to wait for the dispatch and fetching
    await act(async () => {
      render(<App />);
    });

    expect(screen.queryAllByTestId("top-anagram-item")).toHaveLength(0);
    expect(screen.getByTestId("top-anagrams-board-header")).toHaveTextContent(
      "Top 10 Most Requested Anagram Checks"
    );
  });

  it("lists top anagram requests when they exist", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () =>
        Promise.resolve([
          { firstWord: "testing", secondWord: "testing", count: 10 },
          { firstWord: "tester", secondWord: "tester", count: 9 },
        ]),
      saveAnagram: () => Promise.resolve(false),
    });

    // await to wait for the dispatch and fetching
    await act(async () => {
      render(<App />);
    });

    const items = await screen.findAllByTestId("top-anagram-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(/10/);
    expect(screen.getByTestId("top-anagrams-board-header")).toHaveTextContent(
      "Top 10 Most Requested Anagram Checks"
    );
  });

  it("should handle saving anagrams when valid", async () => {
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () => Promise.resolve([]),
      saveAnagram: () => Promise.resolve(false),
    });

    render(<App />);
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
    const alert = screen.getByTestId("result-alert");

    expect(alert).toBeDefined();
  });

  it("should handle not saving anagrams when invalid", async () => {
    const spy = jest.fn();
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () => Promise.resolve([]),
      saveAnagram: spy,
    });

    render(<App />);
    const firstInputField = screen.getByTestId("first-word-input");
    const secondInputField = screen.getByTestId("second-word-input");
    const submitButton = screen.getByTestId("anagram-submission-button");

    act(() => {
      fireEvent.change(firstInputField, {
        target: { value: "ra2cer", name: "firstWord" },
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

    expect(spy).not.toHaveBeenCalled();
    expect(alert).toHaveTextContent(
      /There was an issue with checking the words, please try again./
    );
  });

  it("should handle error when saving anagram", async () => {
    const stub = jest.fn().mockRejectedValue("error when submitting");
    (useAnagramService as jest.Mock).mockReturnValue({
      getAllAnagrams: () => Promise.resolve([]),
      getTopAnagrams: () => Promise.resolve([]),
      saveAnagram: stub,
    });

    render(<App />);
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

    expect(stub).toHaveBeenCalledTimes(1);
    expect(alert).toHaveTextContent(
      /There was an issue with checking the words, please try again./
    );
  });
});
