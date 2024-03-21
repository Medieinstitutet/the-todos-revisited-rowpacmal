import { IconPlus } from '@tabler/icons-react';

const AddNewTodo = ({
  input,
  setInput,
  wallet,
  writeContract,
  updateTodos,
  updateWallet,
}) => {
  const addTodo = async () => {
    try {
      const result = await writeContract.createTodo(input);
      await result.wait();
      updateTodos();
      updateWallet(wallet.accounts);
    } catch (error) {
      console.error(error);
    }
    setInput('');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
      className="todo-form"
    >
      <input
        type="search"
        placeholder="Add a new todo..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="text-input"
      />
      <div>
        <button className="add-btn">
          <IconPlus size={'2.5rem'} />
        </button>
      </div>
    </form>
  );
};

export default AddNewTodo;
