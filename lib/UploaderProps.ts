interface UploadedFile {
  path: string;
}
type onProgress = (percent: number) => void;

interface RenderProps {
  path: string
  uploading: boolean
  progress: number
}
export interface UploaderProps {
  id: string
  children: (props: RenderProps) => React.ReactNode
  uploadFile: (file: File, onProgress?: onProgress) => Promise<UploadedFile>
  onError: (err: Error) => void
  initialPath?: string
  onUploaded?: (url: string) => void
}
