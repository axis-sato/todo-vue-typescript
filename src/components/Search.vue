<template>
  <div>
    <label>
      <input :value="title" @input="onChangeSearch" name="search" type="text">
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  @Prop()
  private readonly title!: string;

  onChangeSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search(target.value);
  }

  @Emit("search")
  search(title: string) {}
}
</script>
