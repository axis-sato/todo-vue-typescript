<template>
  <div>
    <label>
      <input name="done" type="checkbox" :checked="todo.done" @change="onChangeDone" >
    </label>
    <span v-bind:class="{ done: todo.done }">
    <router-link :to="{ name: 'detail', params: { id: todo.id } }">
      {{ todo.title }}
    </router-link>
    </span>
    <button @click="onDelete">delete</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import TodoModel from "@/models/todo";

@Component
export default class Todo extends Vue {
  @Prop()
  private readonly todo!: TodoModel;

  onChangeDone(event: Event) {
    const target = event.target as HTMLInputElement;
    this.done(this.todo.id, target.checked);
  }

  @Emit("done")
  done(id: number, done: boolean) {}

  onDelete(event: Event) {
    this.delete(this.todo.id);
  }

  @Emit("delete")
  delete(id: number) {}
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
