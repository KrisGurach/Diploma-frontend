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
    const { name, value } = event.target;

    let isValid = value !== "";

    if (isValid) {
      // TODO: заменить на актуальные паттерны валидации при реализации логики
      switch (name) {
        case "name":
          isValid = value.length > 1;
          break;

        case "email":
          isValid = value.includes("@");
          break;

        case "password":
          isValid = value.length > 2;
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
