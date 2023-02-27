import { useState } from "react";

export const UseHandleImgError = () => {
  const [imgError, setOnImageError] = useState(false);

  const handleImgError = () => {
    setOnImageError(true);
  };

  return { handleImgError, imgError };
};

export default UseHandleImgError;
