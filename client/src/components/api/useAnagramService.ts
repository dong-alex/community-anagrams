import ConfiguredAxios from "./ConfiguredAxios";
import { TopAnagram, Anagram } from "../../types";

// handles all api requests
const useAnagramService = () => {
  const getAllAnagrams = async (): Promise<Anagram[] | never> => {
    try {
      const { data }: { data: Anagram[] } = await ConfiguredAxios.get("/");
      console.log(data);
      return data || [];
    } catch (err) {
      console.log("Error in 'getAllAnagrams': ", err);
      throw Error(err.message);
    }
  };

  const saveAnagram = async (
    firstWord: string,
    secondWord: string
  ): Promise<boolean | never> => {
    try {
      const { data }: { data: boolean } = await ConfiguredAxios.post(
        "/anagrams",
        {
          firstWord,
          secondWord,
        }
      );
      return data;
    } catch (err) {
      console.log("Error in 'saveAnagram': ", err);
      throw Error(err.message);
    }
  };

  const getTopAnagrams = async (): Promise<TopAnagram[] | never> => {
    try {
      const { data }: { data: TopAnagram[] } = await ConfiguredAxios.get(
        "/top"
      );
      console.log(data);
      return data || [];
    } catch (err) {
      console.log("Error in 'getTopAnagrams': ", err);
      throw Error(err.message);
    }
  };

  return {
    getAllAnagrams,
    saveAnagram,
    getTopAnagrams,
  };
};

export default useAnagramService;
