import Web3 from 'web3';

const getWeb3 = () => {
  const httpProvider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
  const web3 = new Web3(httpProvider);
  return () => web3;
};

export default getWeb3();
