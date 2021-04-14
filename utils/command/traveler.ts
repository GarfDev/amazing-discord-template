import { Commands } from 'types';
import { getPrefix } from 'utils/messages';

export default function commandObjTraveler(
  commands: Commands,
  params: string[]
): [Commands, string[]] {
  let currentDepth = commands;
  const progressedParams = [...params];

  for (let i = 0; i <= params.length; i++) {
    let param = params[i];
    // Handle first param include  //
    // Application prefix          //
    if (i === 0) {
      param = param.replace(getPrefix(), '');
    }
    // Return if cannot find current param
    // In object. And use remain as function param
    // later
    if (!currentDepth[param]) {
      break;
    }

    currentDepth = currentDepth[param] as any;
    progressedParams.shift();
  }

  return [currentDepth, progressedParams];
}
