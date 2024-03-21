import { IconPlus } from '@tabler/icons-react';

const AddTodo = ({ add, input, setInput }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        add();
      }}
      className="todo-form"
    >
      <input
        type="search"
        placeholder="Add new todo..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="text-input"
      />
      <button className="add-btn">
        <IconPlus size={'2.5rem'} />
      </button>
    </form>
  );
};

export default AddTodo;
