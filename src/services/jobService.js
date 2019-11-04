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

  listCompanyJobs(username) {
    return this.job.get(`/jobs/${username}/all`).then(({ data }) => data);
  }

  jobDetail(jobId) {
    return this.job.get(`/jobs/${jobId}/detail`).then(({ data }) => data);
  }

  addNewJob(job, username) {
    const {
      title,
      location,
      contractType,
      salaryMin,
      salaryMax,
      experienceMin,
      workDay,
      study,
      requirementMin,
      urgent,
      description,
    } = job;
    return this.job
      .post(`/jobs/${username}/new`, {
        title,
        location,
        contractType,
        salaryMin,
        salaryMax,
        experienceMin,
        workDay,
        study,
        requirementMin,
        urgent,
        description,
      })
      .then(({ data }) => data);
  }
}

const jobService = new JobService();

export default jobService;
