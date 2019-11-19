import axios from 'axios';

class CompanyService {
  constructor() {
    this.company = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  updateUserCompany(user) {
    const { contactName, email, location, address, phone, NIF, description } = user;
    return this.company
      .put('/companies/profile/edit', { contactName, email, location, address, phone, NIF, description })
      .then(({ data }) => data);
  }

  // listAllJobs() {
  //   return this.job.get('/jobs/all').then(({ data }) => data);
  // }
}

const companyService = new CompanyService();

export default companyService;
