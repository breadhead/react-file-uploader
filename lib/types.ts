import { ReactNode } from "react";
import { AxiosInstance } from "axios";

interface Styles {
  container?: string;
  uploader?: string;
  label?: string;
  input?: string;
  button?: string;
  link?: string;
}

type onProgress = (percent: number) => void;

export interface UploadedFile {
  path: string;
}
export interface UploaderProps {
  id?: string;
  uploadFile: (file: File, onProgress?: onProgress) => Promise<UploadedFile>;
  onError: (err: Error) => void;
  initialPath?: string
  onUploaded?: (url: string) => void;
  styles?: Styles;
  removeFile?: () => void;
  renderIcon?: () => ReactNode;
  renderProgressBar?: (percentage: number) => ReactNode 
}

