import * as React from "react";
import { useCallback, useRef, useState } from "react";

import { UploaderProps } from "./UploaderProps";
import { head } from "./head";

export const Uploader = ({
  id,
  children,
  initialPath,
  uploadFile,
  onUploaded,
  onError
}: UploaderProps) => {
  const [path, setPath] = useState(initialPath);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileInput = useRef<HTMLInputElement>(null);

  const onChange = useCallback(async () => {
    if (!fileInput.current) {
      return;
    }

    const currentFile = head(fileInput.current.files);

    if (!currentFile) {
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const { path: newPath } = await uploadFile(currentFile, setProgress);

      setPath(newPath);

      if (onUploaded) {
        onUploaded(newPath);
      }
    } catch (err) {
      onError(err);
    } finally {
      setUploading(false);
    }
  }, [path, fileInput, uploadFile]);

  return (
    <>
      <label htmlFor={id}>
        <input
          style={{ display: "none" }}
          onChange={onChange}
          type="file"
          ref={fileInput}
          id={id}
        />
        {children({ path, uploading, progress })}
      </label>
    </>
  );
};
