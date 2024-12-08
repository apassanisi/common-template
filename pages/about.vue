<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-4xl font-bold mb-4">About Us</h1>
        <p class="text-lg mb-8">Learn more about our journey and mission.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="text-lg">
          We are passionate about art and e-commerce. Our mission is to provide a platform for artists to showcase and sell their work. We believe in the power of creativity and strive to support artists in their journey.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  h1 {
    font-size: 3rem;
  }
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
}
</style>
