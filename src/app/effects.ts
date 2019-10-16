import page from 'page';
import { Todo } from './state';

export const storage = {
  saveTodos(todos: { [id: string]: Todo }) {
    localStorage.setItem('todos', JSON.stringify(todos));
  },
  getTodos(): { [id: string]: Todo } {
    try {
      const data = JSON.parse(localStorage.getItem('todos') || '{}');
      return data;
    } catch (e) {
      return {};
    }
  },
};

export const router = {
  initialize(routes: { [url: string]: (params: object) => void }) {
    Object.keys(routes).forEach(url => {
      page(url, ({ params }) => routes[url](params));
    });
    page.start();
  },
  goTo(url: string) {
    page.show(url);
  },
};

export const ids = {
  create(): string {
    return Date.now().toString();
  },
};
