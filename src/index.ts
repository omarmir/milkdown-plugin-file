import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import { $remark } from '@milkdown/kit/utils'
import directive from 'remark-directive'
import { filePickerRemarkPlugin } from './transformer'
import { filePickerConfig } from './component/config'
import { filePickerViewGenerator } from './component/view'
import { clearContentAndAddBlockType } from './md-utils'

import {
  fileAttr,
  fileBlockPickerRule,
  filePickerBlockTextRule,
  filePickerNode,
  filePickerNodeBlock,
  filePickerRule,
  filePickerTextRule
} from './schema'

const filePickerremarkDirective = $remark('file-picker', () => directive)

const filePicker: MilkdownPlugin[] = [
  fileAttr,
  filePickerremarkDirective,
  filePickerNode,
  filePickerTextRule,
  filePickerRule,
  fileBlockPickerRule,
  filePickerBlockTextRule,
  filePickerRemarkPlugin,
  filePickerConfig,
  filePickerViewGenerator(filePickerNode.node),
  filePickerViewGenerator(filePickerNodeBlock.node),
  filePickerNodeBlock
].flat()

export { filePicker, filePickerremarkDirective, clearContentAndAddBlockType, filePickerNodeBlock, filePickerConfig }
