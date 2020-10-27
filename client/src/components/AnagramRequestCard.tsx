import React, {
  useState,
  useEffect,
  FunctionComponent,
  FormEvent,
  ChangeEvent,
} from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { AnagramSubmission, AnagramRequestCardProps } from "../types";
import isAlphabetical from "./utils/isAlphabetical";

const AnagramRequestCard: FunctionComponent<AnagramRequestCardProps> = ({
  onSaveAnagram,
}) => {
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
    const castEvent = event as ChangeEvent<HTMLInputElement>;
    setSubmission({
      ...submission,
      [castEvent.target.name]: castEvent.target.value,
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

    const successString = `Great! '${savedFirstWord}' and '${savedSecondWord}' are anagrams. Feel free to check other words and see if they are anagrams.`;
    const failureString = `Unfortunately '${savedFirstWord}' and '${savedSecondWord}' are not anagrams. Feel free to check other words and see if they are anagrams.`;

    setResultMessage(result ? successString : failureString);
  };

  return (
    <MDBCard className="mt-5">
      <MDBCardBody>
        <h4 className="text-center mb-4">Check Anagram</h4>
        {resultMessage !== "" && (
          <div
            className="alert alert-dark text-center"
            data-testid="result-alert"
            role="alert"
          >
            {resultMessage}
          </div>
        )}
        <p className="text-center ">
          Check if two words are anagrams here.{" "}
          <strong>Do not include special characters and numbers.</strong>
        </p>
        {errorMessage !== "" && (
          <div
            className="alert alert-danger text-center"
            data-testid="error-alert"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        <form>
          <div className="grey-text">
            <MDBInput
              data-testid="first-word-input"
              name="firstWord"
              onChange={handleChange}
              value={submission.firstWord}
              label="First Word"
              type="text"
            />
            <MDBInput
              id="second-word-input"
              data-testid="second-word-input"
              name="secondWord"
              value={submission.secondWord}
              onChange={handleChange}
              label="Second Word"
              type="text"
            />
          </div>
          <div className="text-center">
            <MDBBtn
              onClick={handleSubmitAnagramCheck}
              data-testid="anagram-submission-button"
              color="blue"
              disabled={disableSubmission}
            >
              Check
            </MDBBtn>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default AnagramRequestCard;
