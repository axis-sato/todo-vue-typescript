<template>
  <div class="home">
    <Search :title="title" @search="search" />
    <Add @add="showAdditional = true" />
    <div v-for="todo in getTodosByTitle" :key="todo.id">
      <TodoComponent :todo="todo" @done="doneTodo" @delete="deleteTodo" />
    </div>

    <Additional v-if="showAdditional" @add="addTodo" @close="showAdditional = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue";
import Add from "@/components/Add.vue";
import TodoComponent from "@/components/Todo.vue";
import Additional from "@/components/Additional.vue";
import Todo from "@/models/Todo";
import { Dispatcher } from "vuex-type-helper";
import { TodoMutations } from "@/store";

@Component({
  components: {
    HelloWorld,
    Search,
    Add,
    TodoComponent,
    Additional
  }
})
export default class Home extends Vue {
  @State
  private title!: string;

  private showAdditional = false;

  @Getter
  getTodosByTitle!: Todo[];

  search(title: string) {
    this.$store.commit<Dispatcher<TodoMutations>>({
      type: "search",
      title: title
    });
  }

  doneTodo(id: number, done: boolean) {
    this.$store.commit<Dispatcher<TodoMutations>>({
      type: "done",
      id: id,
      done: done
    });
  }

  deleteTodo(id: number) {
    this.$store.commit<Dispatcher<TodoMutations>>({
      type: "delete",
      id: id
    });
  }

  addTodo(title: string, detail: string | null) {
    this.showAdditional = false;
    this.$store.commit<Dispatcher<TodoMutations>>({
      type: "add",
      title: title,
      detail: detail
    });
  }
}
</script>
