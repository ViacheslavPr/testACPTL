export type TEmployee = {
  "employeeId": number,
  "firstName": string,
  "lastName": string,
  "birthday": string,
  "height": number,
}

export enum ESortBy {
  NAME = 'NAME',
  BIRTHDAY = 'BIRTHDAY',
  HEIGHT = 'HEIGHT',
}

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}