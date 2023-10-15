import { useState } from "react";

export function useInputParameters(inputNames, classNames) {
  const createInputParameters = (name, isInvalid = false) => {
    return {
      inputName: name,
      isInvalid: isInvalid,
      className: `${classNames.baseInputName} 
      ${classNames.inputTypeName}${name}
       ${isInvalid ? classNames.invalidInputName : ""}`,
    };
  };

  const parameters = inputNames.map((name) => createInputParameters(name));

  const [inputParameters, setInputParameters] = useState(parameters);

  const validateInput = (event) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const namePattern = /^[a-zA-Zа-яёА-ЯЁ\s-]+$/;

    const { name, value } = event.target;

    let isValid = value !== "";

    if (isValid) {
      switch (name) {
        case "name":
          isValid = namePattern.test(value) && value.length >= 2 && value.length <= 30;
          break;

        case "email":
          isValid = emailPattern.test(value);
          break;

        default:
          isValid = true;
      }
    }

    setInputParameters(
      inputParameters.map((input) => {
        if (input.inputName === name) {
          return createInputParameters(name, !isValid);
        }
        return input;
      })
    );
  };

  return { inputParameters, validateInput };
}
