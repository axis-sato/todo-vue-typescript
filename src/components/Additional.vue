<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <ul class="error" v-if="errors.length">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>

            <div class="modal-header">
              <slot name="header">
                <label>
                  title
                  <input v-model="title" name="title" type="text">
                </label>
                <!--default header-->
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <label>
                  detail:
                  <input v-model="detail" name="detail" type="text">
                </label>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button @click="onAdd">
                  OK
                </button>
                <button @click="$emit('close')">
                  cancel
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

@Component
export default class Additional extends Vue {
  private title = "";
  private detail = "";
  private errors: string[] = [];

  onAdd(event: Event) {
    if (this.title.length === 0) {
      this.errors = ["titleを入力してください。"];
      return;
    }
    this.add(this.title, this.detail);
  }

  @Emit("add")
  add(title: string, detail: string | null) {}
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.error li {
  list-style-type: none;
  color: red;
}
</style>
