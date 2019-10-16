import { Action } from 'overmind';
import { Filter } from './state';

export const changeNewTodoTitle: Action<string> = ({ state }, title) => {
  state.newTodoTitle = title;
};

export const addTodo: Action = ({ state, effects }) => {
  const id = effects.ids.create();

  state.todos[id] = {
    id,
    title: state.newTodoTitle,
    completed: false,
  };

  state.newTodoTitle = '';

  if (state.filter === 'completed') {
    effects.router.goTo('/active');
  }
};

export const toggleTodo: Action<string> = ({ state }, todoId) => {
  state.todos[todoId].completed = !state.todos[todoId].completed;
};

export const toggleAllTodos: Action = ({ state }) => {
  const isAllChecked = state.isAllTodosChecked;

  state.currentTodos.forEach(todo => {
    todo.completed = !isAllChecked;
  });
};

export const removeTodo: Action<string> = ({ state }, todoId) => {
  delete state.todos[todoId];
};

export const clearCompleted: Action = ({ state }) => {
  Object.values(state.todos).forEach(todo => {
    if (todo.completed) {
      delete state.todos[todo.id];
    }
  });
};

export const changeEditingTodoTitle: Action<string> = ({ state }, title) => {
  state.editingTodoTitle = title;
};

export const saveEditingTodoTitle: Action = ({ state }) => {
  if (state.editingTodoTitle) {
    state.todos[state.editingTodoId].title = state.editingTodoTitle;
    state.editingTodoId = null;
  }
};

export const editTodo: Action<string> = ({ state }, todoId) => {
  state.editingTodoId = todoId;
  state.editingTodoTitle = state.todos[todoId].title;
};

export const cancelEditingTodo: Action = ({ state }) => {
  state.editingTodoId = null;
};

export const changeFilter: Action<Filter> = ({ state }, filter) => {
  state.filter = filter;
};
