import { ReactNode, ComponentType } from "react";

interface Styles {
  container?: string;
  uploader?: string;
  label?: string;
  input?: string;
  button?: string;
  link?: string;
}

export interface UploadedFile {
  path: string;
}

type onProgress = (percent: number) => void;

export interface UploaderProps {
  id?: string;
  uploadFile: (file: File, onProgress?: onProgress) => Promise<UploadedFile>;
  onError: (err: Error) => void;
  route: string,
  initialPath?: string | boolean
  onUploaded?: (url: string) => void;
  styles?: Styles;
  removeFile?: () => void;
  children?: ReactNode;
  ProgressBar?: JSX.Element;
  percentage?: number;
}
