<template>
  <IxProLayout v-model:activeKey="activeKey" :menus="dataSource" type="both" :theme="theme">
    <template #logo>
      <div class="logo">Logo</div>
    </template>

    <div class="layout-content">
      <IxSpace>
        <div>whole: <IxSelect v-model:value="wholeTheme" :options="wholdThemeOptionss"></IxSelect></div>
        <template v-if="wholeTheme === 'separate'">
          <div>header: <IxSelect v-model:value="separateTheme.header" :options="themesOptions"></IxSelect></div>
          <div>sider: <IxSelect v-model:value="separateTheme.sider" :options="themesOptions"></IxSelect></div>
        </template>
      </IxSpace>
    </div>
  </IxProLayout>
</template>

<script setup lang="ts">
import type { ProLayoutMenuData } from '@idux/pro/layout'

import { computed, reactive, ref } from 'vue'
const activeKey = ref()
const wholeTheme = ref('light')
const themesOptions = [
  { key: 'light', label: 'light', value: 'light' },
  { key: 'dark', label: 'dark', value: 'dark' },
]
const wholdThemeOptionss = [...themesOptions, { key: 'separate', label: 'separate', value: 'separate' }]
const separateTheme = reactive({
  header: 'light',
  sider: 'light',
})
const theme = computed(() => {
  if (wholeTheme.value === 'separate') {
    return {
      header: separateTheme.header,
      sider: separateTheme.sider,
    }
  }
  return wholeTheme.value
})
const dataSource: ProLayoutMenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      { type: 'item', key: 'item4', label: 'Item 4', icon: 'setting' },
      { type: 'item', key: 'item5', label: 'Item 5', icon: 'setting' },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        icon: 'setting',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        icon: 'setting',
        label: 'Menu Sub 3',
        children: [
          { type: 'item', key: 'item8', label: 'Item 8' },
          { type: 'item', key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub4',
    icon: 'github',
    label: 'Menu Sub 4',
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
]
</script>

<style lang="less" scoped>
.logo {
  padding-left: 24px;
  font-weight: bold;
  font-size: 24px;
}

.layout-content {
  padding: 48px;
}
</style>
