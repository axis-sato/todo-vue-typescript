<template>
  <div><button @click="$emit('add')">add</button></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Add extends Vue {}
</script>
