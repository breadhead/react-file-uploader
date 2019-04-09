import * as React from "react";
import { useCallback, useRef, useState, useMemo } from "react";

import { UploaderProps } from "./types";
import { head } from "./head";

const Uploader = ({
  id,
  uploadFile,
  onUploaded,
  initialPath = null,
  removeFile,
  renderIcon,
  className = {},
  buttonText = {
    upload: "upload file",
    remove: "remove file"
  },
  renderProgressBar,
  onError
}: UploaderProps) => {
  const [path, setPath] = useState(initialPath);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileInput = useRef<HTMLInputElement>(null);

  const uploadButtonText = useMemo(() => {
    if (!buttonText.update) {
      return buttonText.upload;
    }

    return !!path ? buttonText.update : buttonText.upload;
  }, [path]);

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
    <div className={className.container}>
      <div className={className.uploader}>
        <label className={className.label} htmlFor={id}>
          <input
            onChange={onChange}
            className={className.input}
            type="file"
            ref={fileInput}
            id={id}
          />
          {renderIcon && renderIcon()}
          {uploadButtonText}
        </label>
        {!!path && removeFile && (
          <button className={className.button} onClick={removeFile}>
            {buttonText.remove}
          </button>
        )}
      </div>
      {uploading && renderProgressBar && renderProgressBar(progress)}
      {!!path && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={path || ""}
          className={className.link}
        >
          {path}
        </a>
      )}
    </div>
  );
};

export default Uploader;
