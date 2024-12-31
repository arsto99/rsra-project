<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Data Deletion Instructions</h1>
      
      <div class="space-y-6 text-gray-600">
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">How to Delete Your Data</h2>
          <p class="mb-4">You have the right to request the deletion of your personal data from RSAR. Here's how you can do it:</p>
          
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p class="font-medium text-blue-700">Option 1: Through Your Account</p>
            <ol class="list-decimal pl-6 mt-2 space-y-2">
              <li>Log in to your RSAR account</li>
              <li>Go to Account Settings</li>
              <li>Click on "Delete Account"</li>
              <li>Confirm your decision</li>
            </ol>
          </div>

          <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p class="font-medium text-green-700">Option 2: Contact Us</p>
            <p class="mt-2">Send an email to <span class="font-medium">r.arsto99@gmail.com</span> with:</p>
            <ul class="list-disc pl-6 mt-2 space-y-2">
              <li>Subject line: "Data Deletion Request"</li>
              <li>Your registered email address</li>
              <li>Brief reason for deletion (optional)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">What Data Will Be Deleted</h2>
          <ul class="list-disc pl-6 space-y-2">
            <li>Account information (name, email, profile picture)</li>
            <li>Social media connections</li>
            <li>Usage history and preferences</li>
            <li>Any stored content or files</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Timeline</h2>
          <p class="mb-4">After receiving your request:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>We will process your request within 30 days</li>
            <li>You will receive a confirmation email once completed</li>
            <li>Some data may be retained for legal requirements</li>
          </ul>
        </section>

        <section class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h2 class="text-xl font-semibold text-yellow-800 mb-2">Important Note</h2>
          <p class="text-yellow-700">Data deletion is permanent and cannot be undone. Please make sure you want to proceed with the deletion before making the request.</p>
        </section>

        <section class="mt-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Need Help?</h2>
          <p>If you need assistance with data deletion or have any questions, please contact our support team:</p>
          <div class="mt-4">
            <p>Email: r.arsto99@gmail.com</p>
            <p>Response Time: Within 24-48 hours</p>
          </div>
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
