import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState, useCallback } from 'react';
import config from './utils/config';
import AppHeader from './components/AppHeader';
import ConnectedWallet from './components/ConnectedWallet';
import AddNewTodo from './components/AddNewTodo';
import TodoList from './components/TodoList';
import AppFooter from './components/AppFooter';

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
    const balance = (parseInt(rawBalance) / Math.pow(10, 18)).toFixed(4);
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

  useEffect(() => {
    if (wallet && readContract) {
      updateTodos();
    }
  }, [wallet, readContract, updateTodos]);

  return (
    <>
      <AppHeader />

      <ConnectedWallet wallet={wallet} />

      <AddNewTodo
        input={textInput}
        setInput={setTextInput}
        wallet={wallet}
        writeContract={writeContract}
        updateTodos={updateTodos}
        updateWallet={updateWallet}
      />

      <TodoList
        list={todos}
        wallet={wallet}
        writeContract={writeContract}
        updateTodos={updateTodos}
        updateWallet={updateWallet}
      />

      <AppFooter />
    </>
  );
}

export default App;
