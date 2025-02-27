# milkdown-plugin-file

A [Milkdown](https://milkdown.dev/) plugin for handling file uploads and selections.

## Introduction

This plugin provides a way to integrate file picking and handling into your Milkdown editor. It includes nodes and commands for inserting files, along with a remark plugin for parsing markdown directives related to file handling.

## Features

- **File Picker Node**: Adds a `filePickerNode` to the Milkdown schema, allowing you to represent files within the editor.
- **Remark Directive**: Uses `remark-directive` (type `::file` or `::fileBLock`) to parse markdown directives for file picking.
- **Customizable Configuration**: Provides a `filePickerConfig` for configuring the file picker, such as upload endpoints.
- **Block and Text Rules**: Supports both block and text-based file picker rules.

## Installation

```bash
pnpm install milkdown-plugin-file
```

(or yarn/npm)

## Usage

```ts
import { Editor } from "@milkdown/core"
import { filePicker } from "milkdown-plugin-file"
import { commonmark } from "@milkdown/preset-commonmark"

const editor = await Editor.make().use(commonmark).use(filePicker).create()
```

And then anywhere in your text type `::file` for inline file upload or `::fileBlock` for a block (new line) or add it to the `slash`

### Inline

![Screenshot](/screenshots/inline.png?raw=true "Inline screenshot")

### Block

![Screenshot](/screenshots/block.png?raw=true "Block screenshot")

### Slash

![Screenshot](/screenshots/crepe.png?raw=true "Slash screenshot")

## Configuration

### onUpload

Give it a function for onUpload

### uploadingHTML

Give it a some HTML for what to show for progress

### proxyDomURL

Whether to proxy the image link to another URL when rendering.
The value should be a string or promise string.

### interface

```ts
export interface FilePickerConfig {
  uploadingHTML: () => ReturnType<typeof html>
  onUpload: (file: File) => Promise<string>
  proxyDomURL?: (url: string) => Promise<string> | string
}
```

### example

```ts
export const defaultFilePickerConfig: FilePickerConfig = {
  uploadingHTML: () => html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style="display:inline">
      <path
        fill="currentColor"
        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
        opacity="0.5" />
      <path
        fill="currentColor"
        d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 12 12"
          repeatCount="indefinite"
          to="360 12 12"
          type="rotate" />
      </path>
    </svg>
  `,
  onUpload: (file) => Promise.resolve(URL.createObjectURL(file)),
}
```

## Slash integration

Example of adding it into the advanced group

Remember to also import `clearContentAndAddBlockType`

```ts
featureConfigs: {
      'block-edit': {
        buildMenu: (builder) => {
          const advanced = builder.getGroup('advanced')
          advanced.addItem('file', {
            label: 'Attachment',
            icon: html`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.324 8.436L9.495 12.19c-.364.36-.564.852-.556 1.369a2 2 0 0 0 .6 1.387c.375.371.88.584 1.403.593a1.92 1.92 0 0 0 1.386-.55l3.828-3.754a3.75 3.75 0 0 0 1.112-2.738a4 4 0 0 0-1.198-2.775a4.1 4.1 0 0 0-2.808-1.185a3.85 3.85 0 0 0-2.77 1.098L6.661 9.39a5.63 5.63 0 0 0-1.667 4.107a6 6 0 0 0 1.798 4.161a6.15 6.15 0 0 0 4.21 1.778a5.77 5.77 0 0 0 4.157-1.646l3.829-3.756" />
              </svg>
            `,
            onRun: (ctx) => {
              const view = ctx.get(editorViewCtx)
              const { dispatch, state } = view
              const command = clearContentAndAddBlockType(filePickerNodeBlock.type(ctx))
              command(state, dispatch)
            }
          })
        }
      }
    }
```
