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
  // ProgressBar,
  onError,
  api
}: UploaderProps) => {
  const [path, setPath] = useState(initialValue);
  const [uploading, setUploading] = useState(false);
  const [rate, setRate] = useState(0);

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
      setRate(0);

      const { path: newPath } = await api.uploadFile(
        currentFile,
        setRate
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
    <div className={!!styles && styles.container ? styles.container : ''}>
      <div className={!!styles && styles.uploader ? styles.uploader : ''}>
        <label className={!!styles && styles.label ? styles.label : ''} htmlFor={id}>
          <input
            onChange={onChange}
            className={!!styles && styles.input ? styles.input : ''}
            type="file"
            ref={fileInput}
            id={id}
          />
          {children}
          {path ? "Изменить файл" : "Загрузить файл"}
        </label>
        {path && removeFile && (
          <button className={!!styles && styles.button ? styles.button : ''} onClick={removeFile}>
            Удалить
          </button>
        )}
      </div>
      {/* {uploading && ProgressBar && <ProgressBar percentage={rate} />} */}
      {!!path && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={path}
          className={!!styles && styles.link ? styles.link : ''}
        >
          {path}
        </a>
      )}
    </div>
  );
};

export default Uploader;
