<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
      
      <div class="space-y-6 text-gray-600">
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p class="mb-4">By accessing and using RSAR, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
          <p class="mb-4">Permission is granted to temporarily access RSAR for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
          <p class="mb-4">To access certain features of RSAR, you may be required to create an account. You agree to:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Not share your account credentials</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">4. Limitations</h2>
          <p class="mb-4">In no event shall RSAR or its suppliers be liable for any damages arising out of the use or inability to use the materials on RSAR, even if RSAR or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">5. Governing Law</h2>
          <p class="mb-4">These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
          <p class="mb-4">RSAR reserves the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        </section>

        <div class="mt-8 text-sm text-gray-500">
          <p>Last updated: {{ currentDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
</script>

<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>
