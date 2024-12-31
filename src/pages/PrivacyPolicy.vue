<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
      
      <div class="space-y-6 text-gray-600">
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <p class="mb-4">When you use RSAR, we collect the following types of information:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Account information (name, email, profile picture)</li>
            <li>Authentication data when you login with social media</li>
            <li>Usage information and interaction with our services</li>
            <li>Device information and IP address</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p class="mb-4">We use the collected information to:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about our services</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
          <p class="mb-4">We do not sell your personal information. We may share your information with:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">4. Your Rights</h2>
          <p class="mb-4">You have the right to:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of certain data collection</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p class="mt-2">Email: r.arsto99@gmail.com</p>
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
