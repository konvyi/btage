<script setup>
import { TYPE_LIGHT, TYPE_DARK, TYPE_SYSTEM } from '@/constants'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

// 构建渲染数据
const themeAry = [
  {
    id: 0,
    type: TYPE_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: TYPE_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 2,
    type: TYPE_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  },
]
const store = useStore()
const onItemClick = themeItem => {
  store.commit('changeThemeType', themeItem.type)
}

// 展示图标
const svgIconName = computed(() => {
  const findTheme = themeAry.find(item => {
    return item.type === store.getters.themeType
  })
  return findTheme?.icon || TYPE_LIGHT
});
</script>

<template>
  <m-popover placement="bottom_left">
    <template #reference>
      <m-svg-icon :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeAry" :key="item.id" @click="onItemClick(item)">
        <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300">
        </m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
        item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

// 1. 监听主题的切换行为
// 2. 根据行为保存当前所需要展示的主题到vuex
// 3. 根据vuex中保存的当前主题，展示 header-theme 下的显示图标
// 4. 根据vuex中保存的当前主题，修改html的class

<style>

</style>
