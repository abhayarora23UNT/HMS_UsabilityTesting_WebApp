
export enum Constants {
  RegexPatternAlphaNumeric = '^[a-zA-Z0-9 ]+$',
  RegexPatternOnlyNumeric = '^[0-9]*$',
  RegexPatternVarCharDataType = '^[a-zA-Z0-9_.\/-]*$',
  RegexPatternNumberDataType = '[0-9]+',
  RegexPatternCodeValue = '^[9, 0-9]*$',
  RegexPatternExponential = '^[0-9]+([eE][-+]?[0-9]+)?$',


  AccessToken = 'access_token',
  UnauthorizedAccessEvent = 'unAuthorizedAccess',
  IsAuthenticated = 'authenticated',
  IsUserLoggedIn = 'loggedIn',
  ConnectionTimeoutErrorEvent = 'connectionTimeoutError',
  FormValid = 'VALID',
  FormInvalid = 'INVALID',
  FormDisabled = 'DISABLED',
  LoggedInUserData = 'loggedInUserData',
  SessionStorage = 'sessionStorage',
  Max_Length_1 = 1,
  Max_Length_2 = 2,
  Max_Length_3 = 3,
  Max_Length_4 = 4,
  Max_Length_5 = 5,
  Max_Length_6 = 6,
  Max_Length_10 = 10,
  Max_Length_11 = 11,
  Max_Length_22 = 22,
  Max_Length_30 = 30,
  Max_Length_50 = 50,
  Max_Length_100 = 100,
  Max_Length_200 = 200,
  Max_Length_255 = 255,

  DefaultDateTimeFormat = 'MM/DD/YYYY HH:mm:ss A',

  // --idle/keep-alive - constants -- //
  IdleTimeout = 1200, // 20 mins
  ForceTimeout = 120, // 2min

  DateFormat = 'MM/dd/yyyy',
  TimeFormat = 'hh:mm a',

  DefaultToastTimeout=5000,
}

export const ModuleConstants = {
  timeDelay: 500,
  exportTime: 5000,
  apiTimeout: 120000,  // 2 min
  userRoles: [{ key: 'Admin', value: 'Admin' }, { key: 'Doctor', value: 'Doctor' }, { key: 'Patient', value: 'Patient' }, { key: 'Staff', value: 'Staff' }],
};


