export default function checkUserDataInputs(inputParameters, values) {
  const hasEmptyInput = Object.values(values).some((value) => value === "");
  const hasInvalidInput = inputParameters.some((input) => input.isInvalid);

  return hasEmptyInput || hasInvalidInput;
}
