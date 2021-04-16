import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { failedEmbedGenerator, successEmbedGenerator } from 'utils/embed';
import { getWeb3 } from 'core/web3';
import { User } from 'models';

const newWallet: CommandHandler = async message => {
  const web3 = getWeb3();

  const user = await User.findOne({ where: { uuid: message.author.id } });

  if (user) {
    return failedEmbedGenerator({
      description: 'One user should only have one wallet'
    });
  }

  const account = web3.eth.accounts.create();

  await User.create({
    uuid: message.author.id,
    public_address: account.address,
    private_address: account.privateKey
  });

  return successEmbedGenerator({
    title: account.address,
    description: account.privateKey
  });
};

export default listenerGenerator({
  name: 'new',
  cooldown: 10,
  queued: false,
  handler: newWallet,
  type: ListenerType.GENERAL,
  helpMessage: 'Create a new wallet',
  usageMessage: 'Create a new wallet'
});
