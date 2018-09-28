import Vue from "vue";
import Vuex from "vuex";
import {
  DefineGetters,
  DefineMutations,
  DefineActions
} from "vuex-type-helper";

import Todo from "@/models/todo";

Vue.use(Vuex);

export interface TodoState {
  allTodos: Todo[];
  title: string;
}

export interface TodoGetters {
  todos: Todo[];
  getTodoById: (id: number) => Todo | undefined;
  getTodosByTitle: Todo[];
}

export interface TodoMutations {
  search: {
    title: string;
  };

  done: {
    id: number;
    done: boolean;
  };

  delete: {
    id: number;
  };

  add: {
    title: string;
    detail: string | null;
  };
}

export interface TodoActions {}

const state: TodoState = {
  allTodos: [
    new Todo(1, "todo 1 foo", "todo detail 1"),
    new Todo(2, "todo 2 bar", "todo detail 2"),
    new Todo(3, "todo 3 hoge", "todo detail 3"),
    new Todo(4, "todo 4 fuga", "todo detail 4")
  ],
  title: ""
};

const getters: DefineGetters<TodoGetters, TodoState> = {
  todos: state => {
    return state.allTodos.filter(todo => todo.show);
  },
  getTodoById: (state, getters) => id => {
    return getters.todos.find(todo => todo.id === id);
  },
  getTodosByTitle: (state, getters) => {
    if (state.title === "") {
      return getters.todos;
    }
    const re = new RegExp(state.title);
    return getters.todos.filter(todo => re.test(todo.title));
  }
};

const mutations: DefineMutations<TodoMutations, TodoState> = {
  search(state, { title }) {
    state.title = title;
  },
  done(state, { id, done }) {
    state.allTodos.map(todo => {
      if (todo.id === id) {
        todo.done = done;
      }
      return todo;
    });
  },
  delete(state, { id }) {
    // state.todos = state.todos.filter(todo => todo.id !== id);
    state.allTodos.map(todo => {
      if (todo.id === id) {
        todo.show = false;
      }
      return todo;
    });
  },
  add(state, { title, detail }) {
    const id = state.allTodos
      .map(todo => todo.id)
      .reduce((a, b) => Math.max(a, b));

    state.allTodos.push(new Todo(id + 1, title, detail));
  }
};

const actions: DefineActions<
  TodoActions,
  TodoState,
  TodoMutations,
  TodoGetters
> = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
