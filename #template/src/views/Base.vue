<template>
  <router-link to="/Home">Home</router-link>
  <router-link to="/About">About</router-link>
</template>

<script setup>
import { inject } from 'vue'
console.log(inject('$sharedStates'))
</script>