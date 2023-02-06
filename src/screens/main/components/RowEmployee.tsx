import React, { memo } from "react";
import moment from "moment/moment";
import {TEmployee} from "../../../store/types/defaultsTypes";

interface IRowEmployee {
  employee: TEmployee;
}
const RowEmployee = ({ employee }: IRowEmployee): JSX.Element => {
  return <tr key={employee.employeeId}>
    <td>{`${employee.firstName} ${employee.lastName}`}</td>
    <td>{moment(employee.birthday).format('Do MMM YYYY')}</td>
    <td>{employee.height}</td>
  </tr>
}

export default memo(RowEmployee);