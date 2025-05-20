<script lang="ts" setup>
definePageMeta({
  title: '图片预加载',
})

const [isShowPreload, toggleIsShowPreload] = useToggle(false)
const imgList = [
  'https://images.dog.ceo/breeds/collie-border/n02106166_2685.jpg',
  'https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_981.jpg',
  'https://images.dog.ceo/breeds/vizsla/n02100583_3309.jpg',
  'https://images.dog.ceo/breeds/wolfhound-irish/n02090721_984.jpg',
  'https://images.dog.ceo/breeds/spaniel-sussex/n02102480_1965.jpg',
  'https://images.dog.ceo/breeds/doberman/n02107142_9362.jpg',
  'https://images.dog.ceo/breeds/spaniel-cocker/n02102318_9670.jpg',
  'https://images.dog.ceo/breeds/schipperke/n02104365_8630.jpg',
  'https://images.dog.ceo/breeds/shihtzu/n02086240_134.jpg',
]

const toast = useToast()

const { status, start, successCount, errorCount } = usePreloadImg(imgList)

watch(status, () => {
  if (status.value === 'FINISHED') {
    toast.add({
      title: '预加载完成',
      description: '加载成功:' + successCount.value + ',加载失败:' + errorCount.value,
      color: 'success',
    })
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div>图片预加载</div>
    {{ status }}
    <UButton @click="start()">
      开始预加载
    </UButton>
    <UButton @click="toggleIsShowPreload()">
      显示预加载图片
    </UButton>
    <div
      v-if="isShowPreload"
      class="grid grid-cols-3 gap-2 w-[80vw]"
    >
      <img
        v-for="item in imgList"
        :key="item"
        :src="item"
        class="w-full h-full object-cover"
        alt=""
      >
    </div>
  </div>
</template>
