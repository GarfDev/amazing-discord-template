import getClient from 'core/client';

const checkFromSelf = (id: string): boolean => {
  const client = getClient();

  return id === client.user?.id;
};

export default checkFromSelf;
