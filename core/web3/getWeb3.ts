import Web3 from 'web3';

const web3StoreInitializer = () => {
  const httpProvider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
  const web3 = new Web3(httpProvider);
  return (): Web3 => web3;
};

export default web3StoreInitializer();
