import { Anagram, TopAnagram } from "./anagrams";

export type AnagramAction = {
  type: string;
  payload?: {
    topAnagrams?: TopAnagram[];
    anagrams?: Anagram[];
    submittedAnagram?: Anagram;
  };
};
