import Modal from 'react-modal';
import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from "moment";

import { TEmployee } from "../../../store/types/defaultsTypes";
import * as ActionTypes from "../../../store/actions/mainActions";
import { FormErrorMessage, FormInput } from '../dashboard-page-styles';
import { getSelectedEmployeeSelector } from "../../../store/selectors/mainSelectors";

interface IModalCreateUpdateEmployee {
  isOpen: boolean;
  closeModal: () => void;
}
const ModalCreateUpdateEmployee: React.FC<IModalCreateUpdateEmployee> = (
  { isOpen, closeModal }
) => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(getSelectedEmployeeSelector);
  const defaultValues = useMemo(() => ({
    firstName: '',
    lastName: '',
    birthday: '',
    height: 0,
  }), []);

  const validationSchema = yup
    .object({
      firstName: yup.string().required('Обязательно поле'),
      lastName: yup.string().required('Обязательно поле'),
      birthday: yup.string().required('Обязательно поле'),
      height: yup.number().positive('Недопустимое значение').required('Обязательно поле'),
    })
    .required();

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const { handleSubmit, control, reset } = formMethods;

  const onSubmit = (values: Partial<TEmployee>) => {
    if (selectedEmployee) {
      dispatch(ActionTypes.changeEmployee(values as TEmployee));
    } else {
      dispatch(ActionTypes.createEmployee(values as TEmployee));
    }
    closeModal();
  };

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        ...selectedEmployee,
        birthday: moment(selectedEmployee.birthday).format('YYYY-MM-DD')
      });
    }
  }, [selectedEmployee, reset]);
  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset, defaultValues]);
  return <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="modal"
    contentLabel="ADD Modal"
    ariaHideApp={false}
  >
    <div>
      <h2>{selectedEmployee ? 'Изменить данные' : 'Добавить сотрудника'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <FormInput>
              <label>Имя</label>
              <input
                maxLength={55}
                placeholder="Введите имя"
                autoComplete="false"
                {...field}
              />
              {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormInput>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState: { error } }) => (
            <FormInput>
              <label>Фамилия</label>
              <input
                maxLength={55}
                placeholder="Введите фамилию"
                autoComplete="false"
                {...field}
              />
              {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormInput>
          )}
        />
        <Controller
          control={control}
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <FormInput>
              <label>Дата рождения</label>
              <input
                maxLength={55}
                placeholder=""
                autoComplete="false"
                type="date"
                {...field}
              />
              {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormInput>
          )}
        />
        <Controller
          control={control}
          name="height"
          render={({ field, fieldState: { error } }) => (
            <FormInput>
              <label>Рост</label>
              <input
                maxLength={55}
                placeholder="Введите рост"
                autoComplete="false"
                type="number"
                {...field}
              />
              {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormInput>
          )}
        />
        <button type="submit">{selectedEmployee ? 'Обновить' : 'Создать'}</button>
      </form>
    </div>
    <button onClick={closeModal}>close</button>
  </Modal>
}

export default ModalCreateUpdateEmployee;