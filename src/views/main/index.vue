<template>
  <div ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-80 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation-vue />

    <div class=" max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue />
    </div>
  </div>

  <!-- 移动端下的tabbar -->
  <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
    <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">
      首页
    </m-trigger-menu-item>
    <m-trigger-menu-item v-if="$store.getters.token" @click="onVipClick" icon="vip"
      textClass="text-zinc-400 dark:text-zinc-500" iconClass="fill-zinc-400 dark:fill-zinc-500">
      vip
    </m-trigger-menu-item>
    <m-trigger-menu-item icon="profile" @click="onMyClick" iconClass="fill-zinc-400 dark:fill-zinc-500">
      {{ $store.getters.token ? '我的' : '去登录' }}
    </m-trigger-menu-item>
  </m-trigger-menu>
</template>

<script>
export default {
  name: 'home'
}
</script>

<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '../../utils/flexible'
import { useStore } from 'vuex';
import getters from '@/store/getters';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useScroll } from '@vueuse/core';
import { onActivated } from '@vue/runtime-core'

const store = useStore()
const router = useRouter()
const containerTarget = ref(null)

// 记录滚动
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见时
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})

// vip click
const onVipClick = () => {
  // 移动端路由跳转动画
  store.commit('changeRouteType', 'push')
  if (store.getters.token) {
    router.push('/member')
  } else {
    router.push('/login')
  }
}
const onMyClick = () => {
  // 移动端路由跳转动画
  store.commit('changeRouteType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>

<style>

</style>
