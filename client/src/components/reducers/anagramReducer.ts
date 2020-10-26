import AnagramsAction from "../actions/anagramActions";
import { AnagramReducerState, AnagramAction } from "../../types";
import AnagramActions from "../actions/anagramActions";

export const ANAGRAMS_INITIAL_STATE: AnagramReducerState = {
  anagrams: [],
  topAnagrams: [],
  loading: true,
};

export const anagramReducer = (
  state: AnagramReducerState,
  { payload = {}, type }: AnagramAction
): AnagramReducerState => {
  const { anagrams = [], topAnagrams = [], submittedAnagram = null } = payload;

  switch (type) {
    case AnagramsAction.ADDED_ANAGRAM:
      return {
        ...state,
        anagrams: [...state.anagrams, ...anagrams],
        loading: false,
      };
    case AnagramActions.ADDING_ANAGRAM:
      return { ...state, loading: true };
    case AnagramsAction.FETCHED_ANAGRAMS:
      return { ...state, anagrams: anagrams, loading: false };
    case AnagramsAction.SUBMITTING_ANAGRAM:
      return { ...state, loading: true };
    case AnagramsAction.SUBMITTED_ANAGRAM: {
      if (submittedAnagram !== null) {
        return {
          ...state,
          anagrams: [...state.anagrams, submittedAnagram],
          loading: false,
        };
      } else {
        return { ...state, loading: false };
      }
    }
    case AnagramsAction.FETCHED_TOP_ANAGRAMS:
      return {
        ...state,
        topAnagrams: topAnagrams,
        loading: false,
      };
    default:
      throw Error("Invalid action passed. Please try again");
  }
};
