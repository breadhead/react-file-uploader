import * as React from "react";
import { useCallback, useRef, useState } from "react";

import { head } from "lodash";
import { UploaderProps } from "./types";
import { uploadFile } from "uploadFile";

const Uploader = ({
  id,
  axiosInstance,
  route,
  onUploaded,
  initialPath = false,
  removeFile,
  children,
  styles,
  ProgressBar,
  onError,
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

      const { path: newPath } = await uploadFile(
        currentFile,
        route,
        axiosInstance,
        setProgress
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
  }, [path, fileInput, uploadFile]);

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
      {uploading && ProgressBar && <ProgressBar percentage={progress} />}
      {!!path && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={path as string}
          className={!!styles && styles.link ? styles.link : ''}
        >
          {path}
        </a>
      )}
    </div>
  );
};

export default Uploader;
