<template>
  <div class="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full flex bg-black rounded-lg shadow-2xl overflow-hidden">
      <!-- Left side - Form -->
      <div class="w-1/2 p-8">
        <h1 class="text-3xl text-white mb-4">Verify Email</h1>
        <p class="text-gray-400 mb-8">
          We've sent a verification code to {{ maskedEmail }}.
          Please enter the code below.
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="flex justify-between gap-2">
            <input
              v-for="(digit, index) in 6"
              :key="index"
              type="text"
              v-model="code[index]"
              maxlength="1"
              class="w-12 h-12 text-center text-2xl font-bold bg-transparent border-2 border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              :ref="el => codeInputs[index] = el"
              @input="handleInput($event, index)"
              @keydown="handleKeydown($event, index)"
              @paste="handlePaste"
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              class="btn-primary w-full" 
              :disabled="isLoading || !isCodeComplete"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
              <span v-else>Verify Code</span>
            </button>
          </div>

          <div class="flex justify-between text-sm text-gray-400">
            <button 
              type="button" 
              @click="resendCode" 
              class="hover:text-blue-400 transition-all duration-300"
              :disabled="resendCountdown > 0"
            >
              {{ resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : 'Resend code' }}
            </button>
            <router-link to="/forgot-password" class="hover:text-blue-400 transition-all duration-300">
              Change email
            </router-link>
          </div>

          <div v-if="error" class="mt-4 text-center text-sm text-red-500">
            {{ error }}
          </div>
        </form>
      </div>
      
      <!-- Right side - Info Section -->
      <div class="w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
        <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-6">
          RASAR
        </div>
        <h2 class="text-2xl mb-4">Email Verification</h2>
        <ul class="text-sm space-y-2 text-white/80">
          <li class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Check your email inbox
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Enter the 6-digit code
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Code expires in 10 minutes
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref(localStorage.getItem('resetEmail') || '')
const code = ref(Array(6).fill(''))
const codeInputs = ref([])
const error = ref('')
const isLoading = ref(false)
const resendCountdown = ref(0)
let countdownInterval = null

// Redirect if no email is stored
if (!email.value) {
  router.push('/forgot-password')
}

const maskedEmail = computed(() => {
  if (!email.value) return ''
  const [username, domain] = email.value.split('@')
  return `${username[0]}${username[1]}****@${domain}`
})

const isCodeComplete = computed(() => {
  return code.value.every(digit => digit !== '')
})

const handleInput = (event, index) => {
  const value = event.target.value
  if (value && index < 5) {
    codeInputs.value[index + 1]?.focus()
  }
}

const handleKeydown = (event, index) => {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    codeInputs.value[index - 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedText = event.clipboardData.getData('text')
  const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('')
  code.value = [...digits, ...Array(6 - digits.length).fill('')]
  if (digits.length) {
    codeInputs.value[Math.min(digits.length, 5)]?.focus()
  }
}

const startResendCountdown = () => {
  resendCountdown.value = 60
  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--
    } else {
      clearInterval(countdownInterval)
    }
  }, 1000)
}

const resendCode = async () => {
  if (resendCountdown.value > 0) return
  
  try {
    await axios.post('/api/auth/resend-reset-code', {
      email: email.value
    })
    startResendCountdown()
  } catch (err) {
    error.value = 'Failed to resend code. Please try again.'
  }
}

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const response = await axios.post('/api/auth/verify-reset-code', {
      email: email.value,
      code: code.value.join('')
    })
    
    // Store verification token and redirect to reset password page
    localStorage.setItem('resetToken', response.data.token)
    router.push(`/reset-password/${response.data.token}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid code. Please try again.'
    code.value = Array(6).fill('')
    codeInputs.value[0]?.focus()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  codeInputs.value[0]?.focus()
  startResendCountdown()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
