enum ListenerType {
  GENERAL = 'GENERAL',
  DEVELOPER = 'DEVELOPER'
}

/////////////////////////////

export const ListenerTypeLabel = {
  [ListenerType.DEVELOPER]: 'Developer only access Commands',
  [ListenerType.GENERAL]: 'General Commands'
};

export default ListenerType;
