import {
  IconSquare,
  IconSquareCheckFilled,
  IconTrash,
} from '@tabler/icons-react';

const TodoList = ({ list, toggle, remove }) => {
  const todoItems = list.map((todo) => (
    <li
      key={todo.id}
      className="todo-item"
    >
      <button
        className="toggle-btn"
        onClick={() => toggle(todo.id)}
      >
        {todo.completed ? <IconSquareCheckFilled /> : <IconSquare />}
      </button>

      <span className={todo.completed ? 'done' : null}>{todo.text}</span>

      <button
        className="delete-btn"
        onClick={() => remove(todo.id)}
      >
        <IconTrash />
      </button>
    </li>
  ));

  const createList =
    list.length > 0 ? (
      todoItems
    ) : (
      <li className="todos-completed">
        You've completed all your tasks. Enjoy your well-deserved break!
      </li>
    );

  return <ul className="todo-list">{createList}</ul>;
};

export default TodoList;
