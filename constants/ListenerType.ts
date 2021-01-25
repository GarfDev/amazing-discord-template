enum ListenerType {
  GENERAL = 'GENERAL',
  DEVELOPER = 'DEVELOPER',
  MANAGE = 'MANAGE'
}

/////////////////////////////

export const ListenerTypeLabel = {
  [ListenerType.DEVELOPER]: 'Developer only access Commands',
  [ListenerType.MANAGE]: 'Bot Management Commands',
  [ListenerType.GENERAL]: 'General Commands'
};

export default ListenerType;
