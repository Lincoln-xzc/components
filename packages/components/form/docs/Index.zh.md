---
category: components
type: 数据录入
title: Form
subtitle: 表单
order: 0
---

## API

### IxForm

#### FormProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 配置 `IxFormItem` 的 `colon` 默认值 | `boolean` | `false` | ✅ | - |
| `control` | 表单的控制器 | `string \| number \| AbstractControl` | - | - | 通常是配合 `useFormGroup` 使用 |
| `controlCol` | 配置 `IxFormItem` 的 `controlCol` 默认值 | `number \| ColProps` | - | - | - |
| `hasFeedback` | 配置 `IxFormItem` 的 `hasFeedback` 默认值 | `boolean` | `false` | - | - |
| `labelAlign` | 配置 `IxFormItem` 的 `labelAlign` 默认值 | `start \| end` | `end` | ✅ | - |
| `labelCol` | 配置 `IxFormItem` 的 `labelCol` 默认值 | `number \| ColProps` | - | - | - |
| `layout` | 表单布局 | `horizontal \| vertical \| inline` | `horizontal` | ✅ | - |
| `size` | 表单大小 | `sm \| md \| lg` | `md` | ✅ | - |

### IxFormItem

表单项组件，用于控制器的绑定、校验、布局等。

#### FormItemProps

> 除以下表格之外还支持 `IxRow` 组件的[所有属性](/components/grid/zh#IxRow)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `colonless` | 是否不显示 `label` 后面的冒号 | `boolean` | - | - | - |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl` | - | - | 默认取第 1 个子输入控件的 control，如果存在多个输入控件，建议手动指定，参考示例中的 `Phone Number`|
| `controlCol` | 配置表单控件的布局，同 `<IxCol>` 组件，设置 `span` `offset` 的值 | `number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `IxCol` 的 `span` 配置 |
| `extra` | 额外的提示信息 | `string \| #extra` | - | - | 当需要错误信息和提示文案同时出现时使用 |
| `hasFeedback` | 是否展示校验状态图标 | `boolean` | `false` | - | - |
| `label` | `label` 标签的文本| `string \| #label` | - | - | - |
| `labelAlign` | `label` 标签文本对齐方式 | `start \| end` | - | - | - |
| `labelCol` | `label` 标签布局，同 `<IxCol>` 组件，设置 `span` `offset` 的值  | `number \| ColProps` | - | - | 传入 `string` 或者 `number` 时，为 `IxCol` 的 `span` 配置 |
| `labelFor` | `label` 标签的 `for` 属性 | `string` | - | - | - |
| `labelTooltip` | 配置提示信息 | `sting \| #tooltip` | - | - | - |
| `required` | 必填样式设置 | `boolean` | `false` | - | 仅控制样式 |
| `message` | 手动指定表单项的校验提示 | `string \| (control?: AbstractControl) => string \| FormMessage` | - | - | 传入 `string` 时，为 `invalid` 状态的提示 |
| `status` | 手动指定表单项的校验状态 | `valid \| invalid \| validating` | - | - | - |

### IxFormWrapper

用于嵌套表单时, 简于子组件的 `control` 路径

#### FormWrapperProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 表单控件的控制器 | `string \| number \| AbstractControl` | - | - | - |

## FAQ

### 自定义表单组件

参考下列代码来自定义表单组件，实现 `control` 并与 `IxFormItem` 配合使用。

```html
<template>
  <input :value="valueRef" :disabled="isDisabled" @blur="onBlur" @change="onChange" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'

import { AbstractControl, useValueAccessor } from '@idux/cdk/forms'
import { useFormItemRegister } from '@idux/components/form'

export default defineComponent({
  name: 'CustomInput',
  props: {
    value: String,
    control: { type: [String, Object] as PropType<string | AbstractControl> },
    disabled: Boolean,
  },
  setup(_) {
    // 使用 valueAccessor 接管 props.value 的控制
    const { accessor, control } = useValueAccessor()
    // 在 IxFormItem 中注册 control
    useFormItemRegister(control)

    // 输入框绑定的值
    const valueRef = computed(() => accessor.valueRef.value)
    // 输入框禁用状态
    const isDisabled = computed(() => accessor.disabled.value)
    // 输入框 blur 状态
    const onBlur = () => {
      accessor.markAsBlurred()
    }
    // 输入框值发生变更后的回调
    const onChange = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement
      accessor.setValue(value)
    }

    return { valueRef, isDisabled, onBlur, onChange }
  },
})
</script>
```
