import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  updateUserNurse(user) {
    const { nurse } = user;
    return this.user.put('/nurses/profile/edit', { nurse }).then(({ data }) => data);
  }

  infoUserNurse(nurseId) {
    return this.user.get(`/nurses/${nurseId}/detail`).then(({ data }) => data);
  }

  // listAllJobs() {
  //   return this.job.get('/jobs/all').then(({ data }) => data);
  // }
}

const userService = new UserService();

export default userService;
