<template>
  <div class="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <LanguageButton @update:language="updateLanguage" />
    <div class="max-w-4xl w-full flex bg-black rounded-lg shadow-2xl overflow-hidden">
      <!-- Left side - Verification Form -->
      <div class="w-1/2 p-8">
        <h1 class="text-3xl text-white mb-4" data-lang data-ar="تأكيد البريد الإلكتروني" data-en="Email Verification">
          Email Verification
        </h1>
        <p class="text-gray-400 mb-4" data-lang data-ar="تم إرسال رمز التحقق إلى بريدك الإلكتروني" data-en="A verification code has been sent to your email">
          A verification code has been sent to your email
        </p>
        
        <form @submit.prevent="handleVerification" class="space-y-4" autocomplete="off">
          <div>
            <input
              type="text"
              v-model="verificationCode"
              class="input-primary"
              required
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              :placeholder="translations.verificationCode"
              maxlength="6"
            />
          </div>
          
          <div>
            <button type="submit" class="btn-primary w-full" data-lang data-ar="تأكيد" data-en="Verify">
              Verify
            </button>
          </div>

          <div class="text-center mt-4">
            <p class="text-gray-400 text-sm mb-2" data-lang data-ar="لم يصلك الرمز؟" data-en="Didn't receive the code?">
              Didn't receive the code?
            </p>
            <button 
              @click="resendCode" 
              type="button"
              class="text-blue-400 hover:text-blue-300 text-sm transition-all duration-300"
              data-lang
              data-ar="إعادة إرسال الرمز"
              data-en="Resend Code"
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>
      
      <!-- Right side -->
      <div class="w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
        <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          RSAR
        </div>
        <h2 class="text-2xl mb-4 mt-6" data-lang data-ar="تأكيد حسابك" data-en="Verify Your Account">Verify Your Account</h2>
        <p class="text-center" data-lang data-ar="نحتاج إلى التأكد من بريدك الإلكتروني" data-en="We need to verify your email address">
          We need to verify your email address
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import LanguageButton from '../components/LanguageButton.vue'

const router = useRouter()
const verificationCode = ref('')
const error = ref('')
const currentLanguage = ref(localStorage.getItem('language') || 'ar')

// الترجمات
const translations = computed(() => ({
  verificationCode: currentLanguage.value === 'ar' ? 'رمز التحقق' : 'Verification Code'
}))

onMounted(() => {
  updateLanguage(currentLanguage.value)
})

const updateLanguage = (lang) => {
  currentLanguage.value = lang
  localStorage.setItem('language', lang)
  
  document.querySelectorAll('[data-lang]').forEach(el => {
    const arText = el.getAttribute('data-ar')
    const enText = el.getAttribute('data-en')
    if (lang === 'ar' && arText) {
      el.textContent = arText
    } else if (lang === 'en' && enText) {
      el.textContent = enText
    }
  })
}

const handleVerification = async () => {
  try {
    const response = await axios.post('/api/auth/verify-email', {
      code: verificationCode.value
    })
    
    if (response.data.success) {
      router.push('/login')
    }
  } catch (err) {
    error.value = err.response?.data?.message || (currentLanguage.value === 'ar' ? 'حدث خطأ' : 'An error occurred')
  }
}

const resendCode = async () => {
  try {
    await axios.post('/api/auth/resend-verification')
    // Show success message
  } catch (err) {
    error.value = err.response?.data?.message || (currentLanguage.value === 'ar' ? 'حدث خطأ' : 'An error occurred')
  }
}
</script>

<style scoped>
input::placeholder {
  color: #4a5568;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px black inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
