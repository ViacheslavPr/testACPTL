import React, { memo } from "react";
import moment from "moment/moment";
import {TEmployee} from "../../../store/types/defaultsTypes";
import CloseIcon from "../../../assets/cross.svg";
import { ActionIcon } from "../dashboard-page-styles";

interface IRowEmployee {
  employee: TEmployee;
  handleOnDelete: (id: number) => void;
  handleOnSelectEmployee: (employee: TEmployee) => void;
}
const RowEmployee = ({ employee, handleOnDelete, handleOnSelectEmployee }: IRowEmployee): JSX.Element => {
  return <tr key={employee.employeeId}>
    <td>
      <span onClick={() => handleOnSelectEmployee(employee)}>{`${employee.firstName} ${employee.lastName}`}</span>
    </td>
    <td>{moment(employee.birthday).format('Do MMM YYYY')}</td>
    <td>{employee.height}</td>
    <td className="cell-right cell-action">
      <ActionIcon src={CloseIcon} alt="" onClick={() => handleOnDelete(employee.employeeId)}/>
    </td>
  </tr>
}

export default memo(RowEmployee);