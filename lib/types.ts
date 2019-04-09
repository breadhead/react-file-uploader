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
  axiosInstance: AxiosInstance
  uploadFile: (file: File, onProgress?: onProgress) => Promise<UploadedFile>;
  onError: (err: Error) => void;
  route: string,
  initialPath?: string | boolean
  onUploaded?: (url: string) => void;
  styles?: Styles;
  removeFile?: () => void;
  children?: ReactNode;
  ProgressBar?: React.FC<{ percentage: number }> 
  percentage?: number;
}
