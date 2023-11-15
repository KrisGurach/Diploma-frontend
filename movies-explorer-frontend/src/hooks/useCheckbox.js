import { useState } from "react";

export function useCheckbox(values = {}) {
    const [checkboxValues, setCheckboxValues] = useState(values);
  
    const handleCheckboxChange = (event) => {
      const { checked, name } = event.target;
      setCheckboxValues({ ...checkboxValues, [name]: checked });
    };
    
    return { checkboxValues, handleCheckboxChange, setCheckboxValues };
  }