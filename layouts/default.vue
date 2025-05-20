<script lang="ts" setup>
const router = useRouter()
const routes = router.getRoutes()
const titleList = computed(() => {
  return routes.filter(route => route.meta.title).map(route => ({ title: route.meta.title, path: route.path }))
})
</script>

<template>
  <div>
    <header class="flex items-center justify-center h-16 sticky top-0 z-10 border-b dark:border-gray-200 border-gray-800">
      <NuxtLink
        v-for="item in titleList"
        :key="item.path"
        :to="item.path"
        class="px-4"
      >{{ item.title }}</NuxtLink>
      <ColorModeButton />
    </header>
    <slot />
  </div>
</template>
