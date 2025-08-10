<template>

  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta charset="utf-8" />
    <Meta name="theme-color" content="#1a202c" />
    <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <Link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  </Head>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Todo Application',
  },
  description: {
    type: String,
    default: 'A simple todo application built with Nuxt.js and Laravel.',
  },
});
</script>