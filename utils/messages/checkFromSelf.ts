import getClient from 'core/client';

const checkFromSelf = (id: string) => {
  const client = getClient();

  return id === client.user?.id;
};

export default checkFromSelf;
