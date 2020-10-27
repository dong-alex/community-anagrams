import React, { FunctionComponent } from "react";
import { MDBBadge, MDBBox, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { TopAnagram, TopAnagramsBoardProps } from "../types";

const TopAnagramsBoard: FunctionComponent<TopAnagramsBoardProps> = ({
  topAnagrams,
  loading,
}) => {
  return (
    <MDBBox className="mb-5">
      <h5
        className="text-center pt-5 pb-5"
        data-testid="top-anagrams-board-header"
      >
        Top 10 Most Requested Anagram Checks
      </h5>
      {loading ? (
        <MDBBox className="h-100 w-100 d-flex justify-content-center align-middle">
          <div
            className="spinner-border m-auto"
            style={{ width: "15rem", height: "15rem" }}
            role="status"
          />
        </MDBBox>
      ) : (
        <MDBListGroup>
          <MDBListGroupItem className="d-flex justify-content-between">
            <strong>Place</strong>
            <strong className="mr-2">Word</strong>
            <strong className="mr-2">Count</strong>
          </MDBListGroupItem>
          {topAnagrams.map(
            ({ firstWord, secondWord, count }: TopAnagram, i: number) => (
              <MDBListGroupItem
                data-testid="top-anagram-item"
                key={i}
                className="d-flex justify-content-between"
                style={{ userSelect: "none" }}
              >
                <span className="ml-3">{i + 1}</span>
                <span>
                  {firstWord} - {secondWord}
                </span>
                <MDBBadge className="mr-3" color="light-blue" pill>
                  {count}
                </MDBBadge>
              </MDBListGroupItem>
            )
          )}
        </MDBListGroup>
      )}
    </MDBBox>
  );
};

export default TopAnagramsBoard;
