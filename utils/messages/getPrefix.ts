import { metadataSelector } from 'core/store/selectors';
import { useSelector } from '@hooks';

const getPrefix = (): string => {
  const metaData = useSelector(metadataSelector);
  return metaData.defaultPrefix;
};

export default getPrefix;
