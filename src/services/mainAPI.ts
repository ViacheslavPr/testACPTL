import instance from './axiosConfig';

export const mainAPI = {
  getPhotos () {
    return instance.get(`/Employee`)
  },
}
