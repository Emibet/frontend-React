import axios from 'axios';

class JobService {
  constructor() {
    this.job = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  listAllJobs() {
    return this.job.get('/jobs/all').then(({ data }) => data);
  }
}

const jobService = new JobService();

export default jobService;
