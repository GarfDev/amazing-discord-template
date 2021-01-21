enum ListenerType {
  EVERYONE = 'EVERYONE',
  ROLES_REQUIRED = 'ROLE_REQUIRED', // Currently this only available if have an database to store server inputted data
  PERMISSIONS_REQUIRED = 'PERMISSIONS_REQUIRED',
  DEVELOPER_REQUIRED = 'DEVELOPER_REQUIRED'
}

export default ListenerType;
