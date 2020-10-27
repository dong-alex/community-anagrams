export type Anagram = {
  firstWord: string;
  secondWord: string;
  result: boolean;
};

export type TopAnagram = {
  firstWord: string;
  secondWord: string;
  count: number;
};

export type AnagramReducerState = {
  anagrams: Anagram[];
  topAnagrams: TopAnagram[];
  loading: boolean;
};

export type TopAnagramsBoardProps = {
  topAnagrams: TopAnagram[];
  loading: boolean;
};

export type AnagramSubmission = {
  firstWord: string;
  secondWord: string;
};

export type AnagramRequestCardProps = {
  onSaveAnagram: (
    firstWord: string,
    secondWord: string
  ) => Promise<boolean | never>;
};

export type TopEntryItemProps = {
  index: number;
  firstWord: string;
  secondWord: string;
  count: number;
};
