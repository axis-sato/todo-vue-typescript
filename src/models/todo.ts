export default class Todo {
  id: number;
  title: string;
  detail: string | null;
  done: boolean;
  show: boolean;

  constructor(
    id: number,
    title: string,
    detail: string | null = null,
    done = false,
    show = true
  ) {
    this.id = id;
    this.title = title;
    this.detail = detail;
    this.done = done;
    this.show = show;
  }
}
