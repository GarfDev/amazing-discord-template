enum ListenerType {
  GENERAL = 'GENERAL',
  DEVELOPER = 'DEVELOPER',
  MANAGE = 'MANAGE'
}

/////////////////////////////

export const ListenerTypeLabel = {
  [ListenerType.GENERAL]: 'General Commands',
  [ListenerType.MANAGE]: 'Bot Management Commands',
  [ListenerType.DEVELOPER]: 'Developer only access Commands'
};

export default ListenerType;
