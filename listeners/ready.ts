import { useDispatch } from '@hooks';
import { initApplication } from 'core/store/actions';

async function onReady(): Promise<void> {
  const dispatch = useDispatch();
  dispatch(initApplication());
}

export default onReady;
