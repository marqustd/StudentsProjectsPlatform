// 20[00-49]
export const Errors = {
  SUBJECT_EDIT_NAME_CONFLICT: { code: 2000, message: 'Given subject name is already taken' },
  SUBJECT_ADD_NAME_CONFLICT: { code: 2001, message: 'Given subject name is already taken' },
};

// 20[50-99]
export const Infos = {
  SUBJECT_FETCHED: { code: 2050, message: 'Subject was fetched' },
  SUBJECT_UPDATED: { code: 2051, message: 'Subject was updated' },
  SUBJECT_OBSOLETED: { code: 2052, message: 'Subject was obsoleted' },
  SUBJECT_RESTORED: { code: 2053, message: 'Subject was restored' },
};
