import { initApplication } from '@actions';
import getClient from 'core/client';
import { useDispatch } from 'hooks';

async function onReady() {
  const client = getClient();
  const dispatch = useDispatch();
  dispatch(initApplication());

  console.log(
    `${client.user?.username} is started to listen for new messages.`
  );
}

export default onReady;
