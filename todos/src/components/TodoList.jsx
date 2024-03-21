import {
  IconSquare,
  IconSquareCheckFilled,
  IconTrash,
} from '@tabler/icons-react';

const TodoList = ({
  list,
  wallet,
  writeContract,
  updateTodos,
  updateWallet,
}) => {
  const completeTodo = async (id) => {
    try {
      const result = await writeContract.toggleTodo(id);
      await result.wait();
      updateTodos();
      updateWallet(wallet.accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const result = await writeContract.removeTodo(id);
      await result.wait();
      updateTodos();
      updateWallet(wallet.accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const todoItems = list.map((todo) => (
    <li
      key={todo.id}
      className="todo-item"
    >
      <button
        className="toggle-btn"
        onClick={() => completeTodo(todo.id)}
      >
        {todo.completed ? <IconSquareCheckFilled /> : <IconSquare />}
      </button>

      <span className={todo.completed ? 'done' : null}>{todo.text}</span>

      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
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
        You&apos;ve completed all your tasks. Enjoy your well-deserved break!
      </li>
    );

  return <ul className="todo-list">{createList}</ul>;
};

export default TodoList;
