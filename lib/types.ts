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

interface Api {
  uploadFile(
    file: File,
    onProgress?: (precent: number) => void
  ): Promise<UploadedFile>;
}

export interface UploaderProps {
  id?: string;
  api: Api;
  onError: (err: Error) => void;
  initialValue?: string;
  onUploaded?: (url: string) => void;
  styles?: Styles;
  removeFile?: () => void;
  children?: ReactNode;
  ProgressBar?: JSX.Element;
  percentage?: number
}
