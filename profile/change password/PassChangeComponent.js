import "../styles/framework.css";
import "../styles/PassChangeComponent.css";
import React, { useState } from "react";
import { useRippleEffect, useInputFocus } from "./framework";

export default function PassChangeComponent() {
  useRippleEffect();
  useInputFocus();
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return <></>;
}
