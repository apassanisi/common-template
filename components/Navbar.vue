<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Artist Portfolio & Shop</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/artwork">Artwork</v-btn>
    <v-btn text to="/products">Products</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { VAppBar, VToolbarTitle, VSpacer, VBtn } from 'vuetify/components';
</script>
