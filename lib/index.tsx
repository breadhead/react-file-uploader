import * as React from "react";
import { useCallback, useRef, useState } from "react";

import { UploaderProps } from "./types";
import { head } from "head";

const Uploader = ({
  id,
  uploadFile,
  onUploaded,
  initialPath = null,
  removeFile,
  renderIcon,
  styles = {},
  renderProgressBar,
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
        setProgress,
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
          {renderIcon && renderIcon()}
          {!!path ? "Изменить файл" : "Загрузить файл"}
        </label>
        {!!path && removeFile && (
          <button className={styles.button} onClick={removeFile}>
            Удалить
          </button>
        )}
      </div>
      {uploading && renderProgressBar && renderProgressBar(progress)}
      {!!path && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={path || ''}
          className={styles.link}
        >
          {path}
        </a>
      )}
    </div>
  );
};

export default Uploader;
