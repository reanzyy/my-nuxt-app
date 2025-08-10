<template>
  <MetaTags title="Sign Up" description="Sign Up to your account" />
  <div>
    <AuthForm formType="signup" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
</script>
