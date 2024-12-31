<template>
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
