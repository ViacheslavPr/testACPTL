import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useDebouncedCallback} from 'use-debounce';
import * as ActionTypes from "../../store/actions/mainActions";
import Spinner from "./components/Spinner";
import RowEmployee from "./components/RowEmployee";
import {ContainerFilters, ContainerTitle, Table} from "./dashboard-page-styles";
import { getLoadingSelector, getUpdatedListSelector } from "../../store/selectors/mainSelectors";
import TableHead from "./components/TableHead";

const heightList = Array.from({ length: 100 }, (v, k) => k + 100)
const ageList = Array.from({ length: 100 }, (v, k) => k)

const DashboardPage:React.FC = () => {
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

  const handleOnChangeAgeFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ActionTypes.updateSortFilter({ filter: { age: Number(value.target.value) } }));
  }
  const handleOnChangeHeightFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ActionTypes.updateSortFilter({ filter: { height: Number(value.target.value) } }));
  }

  useEffect(() => {
    dispatch(ActionTypes.getList())
  }, [dispatch])
  return (
    <>
      <ContainerTitle>
        Список сотрудников
      </ContainerTitle>
      <ContainerFilters>
        <span>
          <div>Возраст</div>
          <select name="age" id="age" onChange={handleOnChangeAgeFilter}>
            <option disabled>Выберите возраст</option>
            {ageList.map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </span>
        <span>
          <div>Рост</div>
          <select name="height" id="height" onChange={handleOnChangeHeightFilter}>
            <option disabled>Выберите рост</option>
            {heightList.map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </span>
      </ContainerFilters>
      <Table className="table table-borderless">
        <TableHead handleOnClickSort={handleOnClickSort} />
        <tbody>
          {loading ?
            <tr><td colSpan={3}><Spinner /></td></tr> :
            updatedList.map(employee => <RowEmployee employee={employee} key={employee.employeeId} />)}
        </tbody>
      </Table>
    </>
  )
}

export default DashboardPage