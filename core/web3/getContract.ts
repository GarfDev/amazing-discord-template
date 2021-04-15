import { Contract } from 'web3-eth-contract';
import Metacoin from '../../build/contracts/MetaCoin.json';
import getWeb3 from './getWeb3';

const contractStoreInitializer = () => {
  const web3 = getWeb3();
  const contract = new web3.eth.Contract(
    Metacoin.abi as any,
    process.env.CONTRACT_ADDRESS
  );

  return (): Contract => contract;
};

export default contractStoreInitializer();
