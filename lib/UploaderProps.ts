import { ReactNode } from "react";

interface UploadedFile {
  path: string;
}
type onProgress = (percent: number) => void;
export interface UploaderProps {
  id?: string;
  uploadFile: (file: File, onProgress?: onProgress) => Promise<UploadedFile>;
  onError: (err: Error) => void;
  initialPath?: string
  onUploaded?: (url: string) => void;
  className?: ClassName;
  buttonText?: ButtonText;
  removeFile?: () => void;
  renderIcon?: () => ReactNode;
  renderProgressBar?: (percentage: number) => ReactNode 
}