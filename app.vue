<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UIcon
      name="i-lucide-lightbulb"
      class="size-5"
    />

    {{ aas }}
  </UApp>
</template>

<script setup lang="ts">
// sd
const aas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>
