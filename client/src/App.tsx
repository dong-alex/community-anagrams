import React, { FunctionComponent, useEffect, useState } from "react";
import { MDBBox, MDBContainer } from "mdbreact";
import Header from "./components/Header";
import TopAnagramsBoard from "./components/TopAnagramsBoard";
import AnagramRequestCard from "./components/AnagramRequestCard";
import useAnagramService from "./components/api/useAnagramService";
import isAlphabetical from "./components/utils/isAlphabetical";
import { TopAnagram } from "./types";

const App: FunctionComponent = () => {
  const { getTopAnagrams, saveAnagram } = useAnagramService();
  const [loading, setLoading] = useState<boolean>(true);
  const [topAnagrams, setTopAnagrams] = useState<TopAnagram[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTopAnagrams();
      setTopAnagrams(data);
      setLoading(false);
    };

    fetch();
  }, [getTopAnagrams]);

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
      setLoading(true);

      const result = await saveAnagram(firstWord, secondWord);

      setLoading(false);
      return result;
    } catch (err) {
      throw err;
    }
  };

  return (
    <MDBBox>
      <Header />
      <MDBContainer>
        <AnagramRequestCard onSaveAnagram={handleSaveAnagram} />
        <TopAnagramsBoard topAnagrams={topAnagrams} loading={loading} />
      </MDBContainer>
    </MDBBox>
  );
};

export default App;
