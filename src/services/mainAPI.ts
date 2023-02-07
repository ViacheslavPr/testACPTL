import instance from './axiosConfig';
import { TEmployee } from "../store/types/defaultsTypes";

export const mainAPI = {
  getEmployees (): Promise<Array<TEmployee>> {
    return instance.get(`/Employee`)
  },
  changeEmployee (employee: TEmployee) {
    return instance.put(`/Employee`, employee)
  },
  createEmployee (employee: TEmployee) {
    return instance.post(`/Employee`, employee)
  },
  deleteEmployee (id: number) {
    return instance.delete(`/Employee/${id}`)
  },
}
