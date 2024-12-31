<template>
  <button 
    @click="toggleLanguage" 
    class="absolute top-4 right-4 px-4 py-2 bg-transparent border-2 border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all duration-300"
  >
    {{ currentLanguage === 'ar' ? 'English' : 'العربية' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:language'])
const currentLanguage = ref(localStorage.getItem('language') || 'ar')

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'ar' ? 'en' : 'ar'
  currentLanguage.value = newLang
  localStorage.setItem('language', newLang)
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  
  // تحديث النصوص
  const elements = document.querySelectorAll('[data-lang]')
  elements.forEach(el => {
    const arText = el.getAttribute('data-ar')
    const enText = el.getAttribute('data-en')
    el.textContent = currentLanguage.value === 'ar' ? arText : enText
  })

  emit('update:language', newLang)
}
</script>
