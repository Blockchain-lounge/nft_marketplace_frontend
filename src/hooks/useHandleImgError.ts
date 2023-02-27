import { useCallback, useState } from "react";

export const UseHandleImgError = (endpoint: string) => {
  const [imgError, setOnImageError] = useState(false);

  const handleImgError = useCallback(() => {
    setOnImageError((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgError]);

  return { handleImgError, imgError };
};

export default UseHandleImgError;
