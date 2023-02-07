import React, {useCallback, useEffect, useState} from "react";
import { useDispatch } from "react-redux";

import * as ActionTypes from "../../store/actions/mainActions";
import { ButtonAdd, ButtonContainer, ContainerFilters, ContainerTitle } from "./dashboard-page-styles";
import ModalCreateUpdateEmployee from "./components/ModalCreateUpdateEmployee";
import DashboardTable from "./components/DashboardTable";

const heightList = Array.from({ length: 100 }, (v, k) => k + 100)
const ageList = Array.from({ length: 100 }, (v, k) => k)

const DashboardPage:React.FC = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleOnChangeAgeFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ActionTypes.updateSortFilter({ filter: { age: Number(value.target.value) } }));
  }
  const handleOnChangeHeightFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ActionTypes.updateSortFilter({ filter: { height: Number(value.target.value) } }));
  }

  const handleOnOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [])

  const handleOnCloseModal = () => {
    setOpenModal(false);
    dispatch(ActionTypes.clearSelectEmployee());
  }

  useEffect(() => {
    dispatch(ActionTypes.getList());
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
            <option>не выбрано</option>
            {ageList.map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </span>
        <span>
          <div>Рост</div>
          <select name="height" id="height" onChange={handleOnChangeHeightFilter}>
            <option disabled>Выберите рост</option>
            <option>не выбрано</option>
            {heightList.map(val => <option key={val} value={val}>{val}</option>)}
          </select>
        </span>
        <ButtonContainer>
          <ButtonAdd onClick={handleOnOpenModal}>Добавить</ButtonAdd>
        </ButtonContainer>
      </ContainerFilters>
      <DashboardTable handleOnOpenModal={handleOnOpenModal} />
      <ModalCreateUpdateEmployee isOpen={openModal} closeModal={handleOnCloseModal} />
    </>
  )
}

export default DashboardPage