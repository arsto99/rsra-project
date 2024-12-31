<template>
  <button 
    @click="toggleLanguage" 
    class="absolute top-4 right-4 px-4 py-2 bg-transparent border-2 border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all duration-300"
  >
    {{ $t('common.switchLanguage') }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  localStorage.setItem('language', locale.value)
}</script>
