import React, { useEffect, FunctionComponent } from "react";
import { MDBBox, MDBContainer } from "mdbreact";
import Header from "./components/Header";
import TopAnagramsBoard from "./components/TopAnagramsBoard";
import AnagramRequestCard from "./components/AnagramRequestCard";
import useAnagrams from "./components/hooks/useAnagrams";

const App: FunctionComponent = () => {
  const { topAnagrams } = useAnagrams();

  useEffect(() => {}, []);

  return (
    <MDBBox>
      <Header />
      <MDBContainer>
        <AnagramRequestCard />
        <TopAnagramsBoard topAnagrams={topAnagrams} />
      </MDBContainer>
    </MDBBox>
  );
};

export default App;
