import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState, useCallback } from 'react';
import config from './utils/config';
import TodoList from './components/TodoList';
import { IconPlus } from '@tabler/icons-react';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error(
    'ether.js: web3 provider no found. please install a wallet with web3 support.'
  );
}

function App() {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [todos, setTodos] = useState([]);
  const [textInput, setTextInput] = useState('');

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5);
    return balance;
  };

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })
    );
    setWallet({ accounts, balance });
  };

  useEffect(() => {
    const setupProvider = async () => {
      const readSmartContract = new ethers.Contract(
        config.contractAddress,
        config.abi,
        window.provider
      );
      setReadContract(readSmartContract);

      const signer = await window.provider.getSigner();
      const writeSmartContract = new ethers.Contract(
        config.contractAddress,
        config.abi,
        signer
      );
      setWriteContract(writeSmartContract);

      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      updateWallet(accounts);
    };
    setupProvider();
  }, []);

  const updateTodos = useCallback(async () => {
    const indx = await readContract['todoCount']();
    const temp = [];
    for (let i = 0; i <= Number(indx); ++i) {
      const todo = await readContract['todos'](i);
      if (todo.id > 0) temp.push(todo);
    }
    setTodos(temp);
  }, [readContract]);

  useEffect(() => {
    if (wallet && readContract) {
      updateTodos();
    }
  }, [wallet, readContract, updateTodos]);

  const addTodo = async () => {
    try {
      const result = await writeContract.createTodo(textInput);
      await result.wait();
      updateTodos();
      updateWallet(wallet.accounts);
    } catch (error) {
      console.error(error);
    }
    setTextInput('');
  };

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

  return (
    <>
      <div>
        {wallet.accounts} - {wallet.balance} ETH
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
        <button>
          <IconPlus />
        </button>
      </form>
      <TodoList
        list={todos}
        toggle={completeTodo}
        remove={deleteTodo}
      />
    </>
  );
}

export default App;
