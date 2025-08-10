<template>
  <MetaTags title="Sign In" description="Sign in to your account" />
  <div>
    <AuthForm />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
</script>
