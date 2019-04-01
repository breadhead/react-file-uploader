import * as React from "react";
import { useCallback, useRef, useState } from "react";

import { head } from "lodash";
import { UploaderProps } from "./types";

const Uploader = ({
  id,
  onUploaded,
  initialValue,
  removeFile,
  children,
  styles,
  ProgressBar,
  onError,
  api
}: UploaderProps) => {
  const [path, setPath] = useState(initialValue);
  const [uploading, setUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

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
      setPercentage(0);

      const { path: newPath } = await api.uploadFile(
        currentFile,
        setPercentage
      );

      setPath(newPath);

      if (onUploaded) {
        onUploaded(newPath);
      }
    } catch (err) {
      onError(err);
    } finally {
      setUploading(false);
    }
  }, [path, fileInput, api]);

  return (
    <div className={styles.container}>
      <div className={styles.uploader}>
        <label className={styles.label} htmlFor={id}>
          <input
            onChange={onChange}
            className={styles.input}
            type="file"
            ref={fileInput}
            id={id}
          />
          {children}
          {path ? "Изменить файл" : "Загрузить файл"}
        </label>
        {path && removeFile && (
          <button className={styles.button} onClick={removeFile}>
            Удалить
          </button>
        )}
      </div>
      {uploading && ProgressBar && <ProgressBar percentage={percentage} />}
      {!!path && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={path}
          className={styles.link}
        >
          {path}
        </a>
      )}
    </div>
  );
};

export default Uploader;
