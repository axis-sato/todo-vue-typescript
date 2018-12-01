<template>
  <div class="detail">
    <div v-if="isValid">
      <h2>{{ todo.title }}</h2>
      {{ todo.detail }}
    </div>

    <router-link to="/"> 戻る </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Todo from "@/models/todo";

@Component
export default class Detail extends Vue {
  @Getter
  getTodoById!: (id: number) => Todo | undefined;

  get todo(): Todo | undefined {
    const id = Number(this.$route.params.id);
    return this.getTodoById(id);
  }

  get isValid(): boolean {
    return this.todo !== undefined;
  }
}
</script>
