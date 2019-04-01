# react-file-uploader

## Instalation

`yarn add --dev @breadhead/react-file-uploader`

## Usage

```js
import * as React from "react";
import Uploader from "@breadhead/react-file-uploader";

const uploaderStyles = {
  container: 'container'
  uploader: 'uploader'
  label: 'label'
  input: 'input'
  button: 'button'
  link: 'link'
}

<Uploader
  id="id"
  onUploaded={(url: string) => void}
  onError={(err: Error) => void}
  removeFile={() => void}
  ProgressBar={<div />}
  styles={uploaderStyles}
/>

```
