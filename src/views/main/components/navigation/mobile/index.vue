<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!--滑块-->
      <li ref="sliderTarget" :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"></li>

      <!--汉堡按钮-->
      <li @click="onShawPopup"
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger" />
      </li>

      <!--item-->
      <li :ref="setItemRef" :class="{ 'text-zinc-100' : $store.getters.currentCategoryIndex === index }"
        @click="onItemClick(item)" v-for="(item, index) in $store.getters.categorys" :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4">{{
        item.name }}</li>
    </ul>

    <m-popup v-model="isVisable">
      <Menu @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onBeforeUpdate, watch, ref } from 'vue'
import { useScroll } from '@vueuse/core'
import Menu from '@/views/main/components/menu/index.vue'

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

let itemRefs = []

const setItemRef = el => {
  if (el) {
    itemRefs.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs = []
})

const store = useStore()

const ulTarget = ref(null)
// 通过 vueuse -> useScroll 获取响应式scroll
const { x: ulScrollLeft } = useScroll(ulTarget)

// watch监听
watch(() => store.getters.currentCategoryIndex, val => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    // 滑块的位置 = ul 横向滚动的位置 + 当前元素的left
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})

const onItemClick = item => {
  store.commit('changeCurrentCategory', item)
  // currentCategoryIndex.value = index
  isVisable.value = false
}

// 控制popup显示与隐藏
const isVisable = ref(false)
const onShawPopup = () => {
  isVisable.value = true
}
</script>
