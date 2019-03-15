
var app = new Vue ({
  el: '#app',
  beforeMount(){
    current = new Date();
    current = current.getTime();

    var todos = JSON.parse(localStorage.getItem("todoData"));
    for (var i=todos.length - 1; i >= 0; i--){
      console.log(i);
      var oldDate = Date(todos[i].doneTime);
      if (oldDate === null) continue;

      var timeDiff = current - oldDate;
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      // If the checklist item was completed more than 24 hours ago it is removed from the list
      if ( diffDays > 0 ){
        todos.splice(i, 1);
      }
    }
    localStorage.setItem("todoData", JSON.stringify(todos));
    addContentButtonListeners();
    addLinkButtonListeners();
  },
  data: {
    todos: JSON.parse(localStorage.getItem("todoData")),
    todoInput: ""
  },
  methods: {
    addTodo: function() {
      var input = this.todoInput;
      console.log(this.todoInput)
      console.log(this.todos)
      var todos = this.todos;
      this.todoInput = "";
      var newTodo = {
        time: new Date(),
        text: input, 
        doneTime: null
      };
      if(!todos) todos = []
      todos.push(newTodo);
      localStorage.setItem("todoData", JSON.stringify(todos));
    },

    removeTodo: function(index) {
      var todos = this.todos;

      todos.splice(index,1);
      localStorage.setItem("todoData", JSON.stringify(todos));
      console.log(this.todos);
    },

    toggleDone: function(index) {
      var todos = this.todos

      if (todos[index].doneTime === null){
        todos[index].doneTime = new Date();
        todos[index].doneTime = todos[index].doneTime.getTime()
      }
      else{
        todos[index].doneTime = null;
      }
      localStorage.setItem("todoData", JSON.stringify(todos));
    }
  }
})


