import { useState } from "react";

export function useCheckbox(isChecked = false) {
    const [checkboxValues, setCheckboxValues] = useState(isChecked);
  
    const handleCheckboxChange = (event) => {
      const { checked, name } = event.target;
      setCheckboxValues({ ...checkboxValues, [name]: checked });
    };
    
    return { checkboxValues, handleCheckboxChange, setCheckboxValues };
  }