import { MountingOptions, VueWrapper, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Checkbox from '../src/Checkbox'
import { CheckboxInstance, CheckboxProps } from '../src/types'

describe('Checkbox', () => {
  const CheckboxMount = (options?: MountingOptions<Partial<CheckboxProps>>) =>
    mount(Checkbox, { ...options }) as VueWrapper<CheckboxInstance>

  renderWork<CheckboxProps>(Checkbox)

  test('v-model:checked work', async () => {
    const onUpdateChecked = jest.fn()
    const wrapper = CheckboxMount({ props: { checked: true, 'onUpdate:checked': onUpdateChecked } })

    expect(wrapper.classes()).toContain('ix-checkbox-checked')

    await wrapper.setProps({ checked: false })

    expect(wrapper.classes()).not.toContain('ix-checkbox-checked')

    await wrapper.find('input').setValue(true)

    expect(onUpdateChecked).toBeCalledWith(true)
  })

  test('label work', async () => {
    let label = 'checkbox'
    const wrapper = CheckboxMount({ props: { label } })

    expect(wrapper.find('.ix-checkbox-label').text()).toBe(label)

    label = 'checkbox2'
    await wrapper.setProps({ label })

    expect(wrapper.find('.ix-checkbox-label').text()).toBe(label)
  })

  test('default slot work', async () => {
    const label = 'radio'
    const defaultSlot = 'checkbox slot'
    const wrapper = CheckboxMount({
      props: { label },
      slots: { default: () => defaultSlot },
    })

    expect(wrapper.find('.ix-checkbox-label').text()).toBe(defaultSlot)
  })

  test('trueValue and falseValue work', async () => {
    const wrapper = CheckboxMount({
      props: {
        checked: 'yes',
        trueValue: 'yes',
        falseValue: 'no',
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-checked')

    await wrapper.setProps({ checked: 'no' })

    expect(wrapper.classes()).not.toContain('ix-checkbox-checked')
  })

  test('buttoned work', async () => {
    const wrapper = CheckboxMount({
      props: {
        buttoned: true,
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-button')
  })

  test('size work', async () => {
    const wrapper = CheckboxMount({
      props: { size: 'sm' },
    })

    expect(wrapper.classes()).not.toContain('ix-checkbox-sm')

    await wrapper.setProps({ buttoned: true })

    expect(wrapper.classes()).toContain('ix-checkbox-sm')
  })

  test('disabled work', async () => {
    const onChange = jest.fn()
    const wrapper = CheckboxMount({
      props: {
        disabled: false,
        onChange,
      },
    })

    expect(wrapper.classes()).not.toContain('ix-checkbox-disabled')

    await wrapper.setProps({ disabled: true })

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')

    await wrapper.find('input').setValue(true)

    expect(wrapper.classes()).toContain('ix-checkbox-disabled')
    expect(onChange).toBeCalledTimes(0)
  })

  test('indeterminate work', async () => {
    const wrapper = CheckboxMount({
      props: {
        checked: true,
        indeterminate: true,
      },
    })

    expect(wrapper.classes()).toContain('ix-checkbox-indeterminate')
    expect(wrapper.classes()).not.toContain('ix-checkbox-checked')

    await wrapper.setProps({ indeterminate: false })

    expect(wrapper.classes()).not.toContain('ix-checkbox-indeterminate')
    expect(wrapper.classes()).toContain('ix-checkbox-checked')
  })

  test('onChange work', async () => {
    const mockFn = jest.fn()
    const wrapper = CheckboxMount({
      props: {
        onChange: mockFn,
      },
    })

    expect(mockFn).toBeCalledTimes(0)

    await wrapper.find('input').setValue(true)

    expect(mockFn).toBeCalledTimes(1)
  })

  test('original checkbox attributes work', async () => {
    const wrapper = CheckboxMount({
      props: {
        name: 'checkboxName',
        value: 'checkboxValue',
        tabindex: 1,
        class: 'test-checkox',
        style: 'color: red',
      },
    })

    const checkboxWrapper = wrapper.find('.ix-checkbox')
    const originalInput = wrapper.find('input')

    expect(checkboxWrapper.classes()).toContain('test-checkox')
    expect(checkboxWrapper.attributes()['style']).toEqual('color: red;')
    expect(checkboxWrapper.attributes()['name']).not.toBeDefined()
    expect(checkboxWrapper.attributes()['value']).not.toBeDefined()
    expect(checkboxWrapper.attributes()['tabindex']).not.toBeDefined()

    expect(originalInput.attributes()['name']).toEqual('checkboxName')
    expect(originalInput.attributes()['value']).toEqual('checkboxValue')
    expect(originalInput.classes()).not.toContain('test-checkox')
    expect(originalInput.attributes()['style']).not.toEqual('color: red')

    expect(wrapper.find('.ix-checkbox-input-box').attributes()['tabindex']).toEqual('1')
  })

  test('focus & blur method work', async () => {
    const focusFn = jest.fn()
    const blurFn = jest.fn()
    const wrapper = CheckboxMount({
      props: {
        ref: 'component',
        onFocus: focusFn,
        onBlur: blurFn,
      },
      attachTo: 'body',
    })

    await wrapper.vm.focus()

    expect(focusFn).toBeCalledTimes(1)

    await wrapper.vm.blur()

    expect(blurFn).toBeCalledTimes(1)
  })
})
