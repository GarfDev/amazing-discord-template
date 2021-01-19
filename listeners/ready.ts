import { initApplication } from '@actions';
import { useDispatch } from 'hooks';

async function onReady() {
  const dispatch = useDispatch();
  // const client = getClient();

  dispatch(initApplication());
}

export default onReady;
