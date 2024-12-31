<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="text-gray-600">Processing your login...</p>
      </div>
      
      <div v-if="error" class="space-y-4">
        <div class="text-red-500">
          <i class="fas fa-exclamation-circle text-4xl"></i>
        </div>
        <p class="text-red-600">{{ error }}</p>
        <button 
          @click="redirectToLogin" 
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Return to Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Get token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      throw new Error('No authentication token received');
    }

    // Store the token
    localStorage.setItem('token', token);

    // Redirect to dashboard
    router.push('/dashboard');
  } catch (err) {
    loading.value = false;
    error.value = err.message || 'Authentication failed';
  }
});

const redirectToLogin = () => {
  router.push('/login');
};
</script>
