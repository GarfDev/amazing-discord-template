import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { failedEmbedGenerator, successEmbedGenerator } from 'utils/embed';
import { getContract } from 'core/web3';
import { User } from 'models';

const balance: CommandHandler = async message => {
  const user = await User.findOne({ where: { uuid: message.author.id } });

  if (!user) {
    return failedEmbedGenerator({
      description: 'You need to create your wallet first'
    });
  }

  const contract = getContract();
  const result = await contract.methods
    .getBalance((user as any).public_address)
    .call();

  return successEmbedGenerator({
    description: result
  });
  return;
};

export default listenerGenerator({
  name: 'new',
  cooldown: 10,
  queued: false,
  handler: balance,
  type: ListenerType.GENERAL,
  helpMessage: 'Create a new wallet',
  usageMessage: 'Create a new wallet'
});
