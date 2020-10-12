/* eslint-disable import/prefer-default-export */
export const parseQuery = (params) => Object.entries(params)
  .reduce((acumString, [key, value]) => `${acumString}${key}=${value}&`, '?').slice(0, -1);
