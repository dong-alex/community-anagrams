import { useEffect, useReducer } from "react";
import {
  anagramReducer,
  ANAGRAMS_INITIAL_STATE,
} from "../reducers/anagramReducer";
import AnagramActions from "../actions/anagramActions";
import useAnagramService from "../api/useAnagramService";
import isAlphabetical from "../utils/isAlphabetical";
import { Anagram } from "../../types";

const useAnagrams = () => {
  const [state, dispatch] = useReducer(anagramReducer, ANAGRAMS_INITIAL_STATE);
  const { topAnagrams, loading } = state;
  const { getTopAnagrams, saveAnagram } = useAnagramService();

  useEffect(() => {
    const fetch = async () => {
      const data = await getTopAnagrams();
      dispatch({
        type: AnagramActions.FETCHED_TOP_ANAGRAMS,
        payload: { topAnagrams: data },
      });
    };

    fetch();
  }, []);

  const handleSaveAnagram = async (
    firstWord: string,
    secondWord: string
  ): Promise<boolean | never> => {
    if (!isAlphabetical(firstWord) || !isAlphabetical(secondWord)) {
      throw Error(
        "Please remove any numbers or special symbols from your words and try again."
      );
    }

    try {
      dispatch({
        type: AnagramActions.ADDING_ANAGRAM,
      });

      const result = await saveAnagram(firstWord, secondWord);

      const submittedAnagram: Anagram = {
        firstWord,
        secondWord,
        result,
      };

      dispatch({
        type: AnagramActions.ADDED_ANAGRAM,
        payload: { submittedAnagram },
      });
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    topAnagrams,
    loading,
    onSaveAnagram: handleSaveAnagram,
  };
};

export default useAnagrams;
