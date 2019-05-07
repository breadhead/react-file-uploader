# react-file-uploader

## Installation

`yarn add --dev @breadhead/react-file-uploader`

## Usage

```js
import * as React from "react";
import { Uploader } from "@breadhead/react-file-uploader";

  <Uploader
    id="my-uploader"
    uploadFile={(file: File, onProgress?: onProgress) => Promise<UploadedFile>}
    onError={(err: Error) => void}
    onUploaded={(url: string) => void}
  >
    {({ path, uploading, progress }: RenderProps) => (
      <>
        <ProgressBar progress={progress} />
        {!!uploading && <p>file is uploaded from {path}</p>}
      </>
    )}
  </Uploader>

  interface RenderProps {
    path: string
    uploading: boolean
    progress: number
  }

```
