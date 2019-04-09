# react-file-uploader

## Instalation

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
  renderIcon={() => <svg />}
  renderProgressBar={(percentage: number) => <div percentage={percentage} />}
  className={uploaderClassName}
  buttonText={uploaderButtonText}
/>

const uploaderClassName = {
  container: 'container'
  uploader: 'uploader'
  label: 'label'
  input: 'input'
  button: 'button'
  link: 'link'
}

const uploaderButtonText = {
  upload: 'upload file',
  remove: 'remove file',
  update: 'update file',
}
```
