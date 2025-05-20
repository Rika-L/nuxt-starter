function preloadImg(src: string) {
  return new Promise<'SUCCESS' | 'ERROR'>((resolve) => {
    const img = new Image()
    img.onload = () => resolve('SUCCESS')
    img.onerror = () => resolve('ERROR')
    img.src = src
  })
}

export default function usePreloadImg(imgList: string[], options: { concurrencyLimit: number } = { concurrencyLimit: 3 }) {
  const status = ref<'PENDING' | 'FINISHED'>('PENDING')
  const result = ref<('SUCCESS' | 'ERROR')[]>([])
  const successCount = computed(() => result.value.filter(item => item === 'SUCCESS').length)
  const errorCount = computed(() => result.value.filter(item => item === 'ERROR').length)

  function start() {
    const concurrencyLimit = options.concurrencyLimit // 最大并发
    let concurrency = 0 // 当前并发
    const queue = [...imgList]

    function loadNextImg() {
      if (queue.length === 0 && concurrency === 0 && result.value.length === imgList.length) {
        status.value = 'FINISHED'
        return
      }

      if (queue.length > 0 && concurrency < concurrencyLimit) {
        const img = queue.shift()!
        concurrency++

        preloadImg(img).then((res) => {
          result.value.push(res)
          concurrency--
          loadNextImg()
        })

        if (concurrency < concurrencyLimit && queue.length > 0) {
          loadNextImg()
        }
      }
    }

    // 开始加载图片
    loadNextImg()
  }

  return {
    status,
    start,
    successCount,
    errorCount,
  }
}
