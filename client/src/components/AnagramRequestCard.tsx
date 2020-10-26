import React, {
  useState,
  useEffect,
  FunctionComponent,
  FormEvent,
} from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBInput,
  MDBTypography,
} from "mdbreact";
import { AnagramSubmission } from "../types";
import isAlphabetical from "./utils/isAlphabetical";
import useAnagrams from "./hooks/useAnagrams";

const AnagramRequestCard: FunctionComponent<{}> = () => {
  const { onSaveAnagram } = useAnagrams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [disableSubmission, setDisableSubmission] = useState<boolean>(false);
  const [submission, setSubmission] = useState<AnagramSubmission>({
    firstWord: "",
    secondWord: "",
  });

  useEffect(() => {
    const { firstWord, secondWord } = submission;
    if (
      (firstWord !== "" && !isAlphabetical(firstWord)) ||
      (secondWord !== "" && !isAlphabetical(secondWord))
    ) {
      setErrorMessage("Please remove any numbers or symbols.");
      setDisableSubmission(true);
    } else {
      setErrorMessage("");
    }

    setDisableSubmission(firstWord === "" || secondWord === "");
  }, [submission]);

  const handleChange = (event: FormEvent<HTMLInputElement>): void => {
    setSubmission({
      ...submission,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmitAnagramCheck = async (
    event: FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    const { firstWord, secondWord } = submission;

    // useEffect handled validations
    try {
      const result = await onSaveAnagram(firstWord, secondWord);
      handleDisplayResult(result);
      return;
    } catch (err) {
      console.log("Error with handleSubmitAnagramCheck", err);
      setErrorMessage(
        "There was an issue with checking the words, please try again."
      );
    }
  };

  const handleDisplayResult = (result: boolean): void => {
    // copy the initial words so that we can check anagrams again
    const { firstWord, secondWord } = submission;

    let savedFirstWord = firstWord;
    let savedSecondWord = secondWord;

    const successString = `'${savedFirstWord}' and '${savedSecondWord}' are not anagrams. Feel free to check other words and see if they are anagrams.`;
    const failureString = `Unfortunately '${savedFirstWord}' and '${savedSecondWord}' are not anagrams. Feel free to check other words and see if they are anagrams.`;

    setResultMessage(result ? successString : failureString);
  };

  return (
    <MDBCard className="mt-5">
      <MDBCardBody>
        <MDBCardText>
          <form>
            <MDBTypography
              tag="h4"
              variant="h4-responsive"
              className="text-center mb-4"
            >
              Check Anagram
            </MDBTypography>
            {resultMessage !== "" && (
              <div className="alert alert-dark text-center" role="alert">
                {resultMessage}
              </div>
            )}
            <p className="text-center ">
              Check if two words are anagrams here.{" "}
              <strong>Do not include special characters and numbers.</strong>
            </p>
            {errorMessage !== "" && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="grey-text">
              <MDBInput
                id="first-word-input"
                name="firstWord"
                onChange={handleChange}
                label="First Word"
                group
                type="text"
              />
              <MDBInput
                id="second-word-input"
                name="secondWord"
                onChange={handleChange}
                label="Second Word"
                group
                type="text"
              />
            </div>
            <div className="text-center">
              <MDBBtn
                onClick={handleSubmitAnagramCheck}
                color="blue"
                disabled={disableSubmission}
              >
                Check
              </MDBBtn>
            </div>
          </form>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default AnagramRequestCard;
