import React, { FunctionComponent } from "react";
import {
  MDBBox,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
import { TopAnagram, TopAnagramsBoardProps } from "../types";

const TopAnagramsBoard: FunctionComponent<TopAnagramsBoardProps> = ({
  topAnagrams,
}) => {
  return (
    <MDBBox className="mb-5">
      <h5
        className="text-center pt-5 pb-5"
        data-testid="top-anagrams-board-header"
      >
        Top 10 Most Requested Anagram Checks
      </h5>
      <MDBListGroup>
        {topAnagrams.map(
          ({ firstWord, secondWord, count }: TopAnagram, i: number) => (
            <MDBListGroupItem
              data-testid="top-anagram-item"
              key={i}
              className="text-center"
              style={{ userSelect: "none" }}
            >
              {i + 1}. {firstWord} - {secondWord} - {count}
            </MDBListGroupItem>
          )
        )}
      </MDBListGroup>
    </MDBBox>
  );
};

export default TopAnagramsBoard;
