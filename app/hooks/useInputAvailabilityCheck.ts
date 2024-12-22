// REACT
import { useState } from "react";
// INTERNAL
import { BASE_URL } from "../routes/actions";

export default function useInputAvailabilityCheck(
  url: string,
  input: string,
  errorMessage: string
) {
  const [isInputAvailable, setIsInputAvailable] = useState<boolean>(true);
  const [inputAvailabilityMessage, setInputAvailabilityMessage] =
    useState<string>("");

  const resetInputAvailabilityMessage = () => {
    setInputAvailabilityMessage("");
  };

  const checkInput = async () => {
    const isInputTaken = await fetch(BASE_URL + url, {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (isInputTaken) {
      setInputAvailabilityMessage(errorMessage);
    }

    setIsInputAvailable(!isInputTaken);
  };

  return {
    checkInput,
    isInputAvailable,
    inputAvailabilityMessage,
    resetInputAvailabilityMessage,
  };
}
