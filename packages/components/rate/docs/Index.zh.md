---
category: components
type: 数据录入
title: Rate
subtitle: 评分
---

## API

### IxRate

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 高亮的数目（分数） | `number` | - | - | - |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `allowHalf` | 支持半分（选） | `boolean` | `false` | ✅ | - |
| `clearable` | 二次点击元素后清除选择 | `boolean` | `false` | ✅ |-|
| `count` | 图标数目 | `number` | `5` | ✅ | - |
| `disabled` | 禁用状态 | `boolean` | `false` | - | - |
| `icon` | 自定义图标 | `string \| #icon={disabled, focused, index}` | `'star-filled'` | ✅ | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `tooltips` | 悬浮提示信息数组 | `string[]` | `[]` | - | - |
| `onChange` | 值发生改变时的回调 | `(value: number) => void` | - | - | - |
