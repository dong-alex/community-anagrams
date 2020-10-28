import ConfiguredAxios from "./ConfiguredAxios";
import { TopAnagram, Anagram } from "../../types";

// handles all api requests
const useAnagramService = () => {
  const getAllAnagrams = async (): Promise<Anagram[] | never> => {
    const { data }: { data: Anagram[] } = await ConfiguredAxios.get("/");
    return data;
  };

  const saveAnagram = async (
    firstWord: string,
    secondWord: string
  ): Promise<boolean | never> => {
    const { data }: { data: boolean } = await ConfiguredAxios.post(
      "/anagrams",
      {
        firstWord,
        secondWord,
      }
    );
    return data;
  };

  const getTopAnagrams = async (): Promise<TopAnagram[] | never> => {
    const { data }: { data: TopAnagram[] } = await ConfiguredAxios.get("/top");
    return data || [];
  };

  return {
    getAllAnagrams,
    saveAnagram,
    getTopAnagrams,
  };
};

export default useAnagramService;
