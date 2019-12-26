export default class Stack {
  constructor() {
    this.top = 0; // 栈的长度
    this.items = []
  }

  push (item) {
    this.top++;
    this.items.push(item) // 入栈
  }

  pop () {
    --this.top;
    return this.items.pop() // 出栈
  }

  peek () {
    return this.items[this.top - 1] // 查询栈顶元素
  }

}