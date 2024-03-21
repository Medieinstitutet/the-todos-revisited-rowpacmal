import {
  IconCoins,
  IconCurrencyEthereum,
  IconWallet,
} from '@tabler/icons-react';

const ConnectedWallet = ({ wallet }) => {
  return (
    <div className="wallet-wrapper">
      <section className="wallet">
        <h4 className="align-icons highlighted-text">
          <IconWallet />
          Wallet Address
        </h4>
        <span>{wallet.accounts}</span>
      </section>

      <section className="wallet">
        <h4 className="align-icons highlighted-text">
          <IconCoins />
          Balance
        </h4>
        <span className="align-icons">
          <IconCurrencyEthereum />
          {wallet.balance} ETH
        </span>
      </section>
    </div>
  );
};

export default ConnectedWallet;
