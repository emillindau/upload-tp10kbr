import React, { useEffect, useState } from "react";

export const FakeLoading = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setValue((prevValue) => {
        const newVal = (prevValue += 2);
        if (newVal >= 100) {
          clearInterval(timeout);
          return 100;
        }
        return newVal;
      });

      return () => clearInterval(timeout);
    }, 300);
  }, []);

  return (
    <progress
      className="nes-progress is-primary"
      value={`${value}`}
      max="100"
    ></progress>
  );
};
