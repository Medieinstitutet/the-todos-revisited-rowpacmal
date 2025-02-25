import { ethers } from 'ethers';
import config from '../utils/config';

class TodoServices {
  #contractAddress;
  #abi;

  constructor() {
    this.#contractAddress = config.contractAddress;
    this.#abi = config.abi;
  }

  readSmartContract(provider) {
    return new ethers.Contract(this.#contractAddress, this.#abi, provider);
  }

  writeSmartContract(signer) {
    return new ethers.Contract(this.#contractAddress, this.#abi, signer);
  }
}

export default TodoServices;
