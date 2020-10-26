import React, { FunctionComponent } from "react";
import {
  MDBBox,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from "mdbreact";
import { TopAnagram, TopAnagramsBoardProps } from "../types";

const TopAnagramsBoard: FunctionComponent<TopAnagramsBoardProps> = ({
  topAnagrams,
}) => {
  return (
    <MDBBox className="mb-5">
      <MDBTypography
        className="text-center pt-5 pb-5"
        tag="h5"
        variant="h5-responsive"
      >
        Top 10 Most Requested Anagram Checks
      </MDBTypography>
      <MDBListGroup>
        {topAnagrams.map(
          ({ firstWord, secondWord, count }: TopAnagram, i: number) => (
            <MDBListGroupItem
              data-test-id={`${firstWord}-${secondWord}`}
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
