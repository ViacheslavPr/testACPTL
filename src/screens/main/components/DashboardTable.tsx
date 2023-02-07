import TableHead from "./TableHead";
import Spinner from "./Spinner";
import RowEmployee from "./RowEmployee";
import {Table} from "../dashboard-page-styles";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDebouncedCallback} from "use-debounce";

import {getLoadingSelector, getUpdatedListSelector} from "../../../store/selectors/mainSelectors";
import * as ActionTypes from "../../../store/actions/mainActions";
import {TEmployee} from "../../../store/types/defaultsTypes";

interface IDashboardTable {
  handleOnOpenModal: () => void;
}
const DashboardTable: React.FC<IDashboardTable> = ({ handleOnOpenModal }): JSX.Element => {
  const dispatch = useDispatch();
  const updatedList = useSelector(getUpdatedListSelector);
  const loading = useSelector(getLoadingSelector);

  const onChangeSurgeryParams = useDebouncedCallback(() => {
    dispatch(ActionTypes.getListUpdated());
  }, 1000);

  const handleOnClickSort = (type: string) => {
    dispatch(ActionTypes.updateSortFilter({ sort: type }));
    onChangeSurgeryParams();
  };

  const handleOnDelete = useCallback((id: number) => {
    dispatch(ActionTypes.deleteEmployee(id));
  }, [dispatch])

  const handleOnSelectEmployee = useCallback((employee: TEmployee) => {
    dispatch(ActionTypes.selectEmployee(employee));
    handleOnOpenModal();
  }, [dispatch, handleOnOpenModal])
  return (
    <Table className="table table-borderless">
      <TableHead handleOnClickSort={handleOnClickSort} />
      <tbody>
      {loading ?
        <tr><td colSpan={3}><Spinner /></td></tr> :
        updatedList.map(employee =>
          <RowEmployee
            employee={employee}
            key={employee.employeeId}
            handleOnDelete={handleOnDelete}
            handleOnSelectEmployee={handleOnSelectEmployee}
          />
        )}
      </tbody>
    </Table>
  )
}

export default DashboardTable;