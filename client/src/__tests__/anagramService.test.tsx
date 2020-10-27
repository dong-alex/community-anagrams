import { renderHook } from "@testing-library/react-hooks";
import useAnagramService from "../components/api/useAnagramService";
import ConfiguredAxios from "../components/api/ConfiguredAxios";

describe("useAnagramService Tests", () => {
  let mockGet: jest.SpyInstance;
  let mockPost: jest.SpyInstance;

  beforeEach(() => {
    mockGet = jest.spyOn(ConfiguredAxios, "get");
    mockPost = jest.spyOn(ConfiguredAxios, "post");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all anagrams", async () => {
    mockGet.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            firstWord: "number",
            secondWord: "one",
            result: false,
          },
          {
            firstWord: "number",
            secondWord: "two",
            result: false,
          },
          {
            firstWord: "number",
            secondWord: "three",
            result: false,
          },
          {
            firstWord: "number",
            secondWord: "four",
            result: false,
          },
          {
            firstWord: "aaa",
            secondWord: "aaa",
            result: true,
          },
        ],
      })
    );

    const { result } = renderHook(() => useAnagramService());

    const data = await result.current.getAllAnagrams();

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(data).toHaveLength(5);
  });

  it("should fetch top anagrams", async () => {
    mockGet.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            firstWord: "number",
            secondWord: "one",
            count: 10,
          },
        ],
      })
    );

    const { result } = renderHook(() => useAnagramService());

    const data = await result.current.getTopAnagrams();

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(data).toHaveLength(1);
  });

  it("should throw an error if there is an error fetching", async () => {
    mockGet.mockImplementation(() =>
      Promise.reject(Error("an error occurred fetching top anagrams"))
    );

    const { result } = renderHook(() => useAnagramService());

    await expect(result.current.getTopAnagrams()).rejects.toEqual(
      Error("an error occurred fetching top anagrams")
    );
  });

  it("should add a request of two words that ARE anagrams", async () => {
    mockPost.mockImplementation(() => Promise.resolve({ data: true }));

    const { result } = renderHook(() => useAnagramService());

    const data = await result.current.saveAnagram("abc", "cba");

    expect(data).toBeTruthy();
  });

  it("should add a request of two words that ARE NOT anagrams", async () => {
    mockPost.mockImplementation(() => Promise.resolve({ data: false }));

    const { result } = renderHook(() => useAnagramService());

    const data = await result.current.saveAnagram("abcd", "cba");

    expect(data).toBeFalsy();
  });

  it("should throw an error i.e. if there are numbers or symbols", async () => {
    mockPost.mockImplementation(() =>
      Promise.reject(Error("an error occurred"))
    );

    const { result } = renderHook(() => useAnagramService());

    await expect(result.current.saveAnagram("123", "234")).rejects.toEqual(
      Error("an error occurred")
    );
  });
});
