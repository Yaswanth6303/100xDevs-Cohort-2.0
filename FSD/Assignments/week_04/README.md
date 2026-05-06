You have been given the code of a purely frontend TODO app
You have to fill in the following functions - 
 - addTodo
 - removeTodo
 - updateTodo
 - updateState
 - renderTodo

These 4 functions comprise of what it means to create a library like React.
The goal is the following - 
1. Any time the updateState function is called with a new state, the updateState function calculates the diff between newTodos and oldTodos and call `addTodo`, `removeTodo` or `updateState` based on the calculated diff.
2. They id of a todo uniquely identifies it. If the title of a todo with the same id changes in two iterations, updateTodo should be called for it.
3. The structure of the state variable looks something like this - 
```js
    const todos = [{
        title: "Go to gym",
        description: "Go to gym from 7-8PM",
        id: 1
    }]
```