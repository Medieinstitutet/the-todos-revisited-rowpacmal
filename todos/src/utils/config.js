const config = {
  address: '0x29b71a5d443ff435DE15B8E105aEedD2Ff9B8cce',

  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'RemovedTodo',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'text',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'completed',
          type: 'bool',
        },
      ],
      name: 'TodoCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'completed',
          type: 'bool',
        },
      ],
      name: 'ToggleTodo',
      type: 'event',
    },
    {
      inputs: [],
      name: 'todoCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'todos',
      outputs: [
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'text',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'completed',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_content',
          type: 'string',
        },
      ],
      name: 'createTodo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      name: 'toggleTodo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      name: 'removeTodo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};

export default config;
