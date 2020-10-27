import React from "react";
import { render, screen, act } from "@testing-library/react";
import TopAnagramsBoard from "../components/TopAnagramsBoard";
import { TopAnagram } from "../types";

describe("TopAnagramsBoard Tests", () => {
  it("renders the basic template without data", () => {
    const data: TopAnagram[] = [];

    const { container } = render(<TopAnagramsBoard topAnagrams={data} />);

    expect(container).toMatchSnapshot();
  });

  it("renders the list of top anagrams", () => {
    const data: TopAnagram[] = [
      {
        firstWord: "hello",
        secondWord: "world",
        count: 10000,
      },
      {
        firstWord: "aaa",
        secondWord: "world",
        count: 5512,
      },
      {
        firstWord: "test",
        secondWord: "test",
        count: 2221,
      },
      {
        firstWord: "abc",
        secondWord: "abc",
        count: 667,
      },
      {
        firstWord: "www",
        secondWord: "www",
        count: 445,
      },
      {
        firstWord: "ca",
        secondWord: "com",
        count: 323,
      },
      {
        firstWord: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
        secondWord: "aaaaaaaaaaaaaaaaaaaaaaa",
        count: 100,
      },
      {
        firstWord: "aaaaaaaaaaaaaaaa",
        secondWord: "wwwwwwwwwwwwwwwwwwwwwwww",
        count: 6,
      },
      {
        firstWord: "longestwordiwouldbeabletofit",
        secondWord: "someotherlongwordiwouldbeabletoFit",
        count: 3,
      },
      {
        firstWord: "shortword",
        secondWord: "anothershortWord",
        count: 1,
      },
    ];

    const { getAllByTestId } = render(<TopAnagramsBoard topAnagrams={data} />);

    const anagrams = getAllByTestId("top-anagram-item");
    expect(anagrams).toHaveLength(10);
  });
});
