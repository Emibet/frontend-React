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

  applytoJob(jobId, userId) {
    return this.job.put(`/jobs/${jobId}/${userId}/add`).then(({ data }) => data);
  }

  confirmJob(jobId, userId, ApplicId) {
    return this.job.put(`/jobs/${jobId}/${userId}/${ApplicId}/assign`).then(({ data }) => data);
  }

  cancelJob(jobId, userId) {
    return this.job.put(`/jobs/${jobId}/${userId}/cancelAssign`).then(({ data }) => data);
  }

  declineJob(jobId, userId) {
    return this.job.put(`/jobs/${jobId}/${userId}/declineAssign`).then(({ data }) => data);
  }

  pendingJob(jobId, userId) {
    return this.job.put(`/jobs/${jobId}/${userId}/pendingAssign`).then(({ data }) => data);
  }

  cancelApplytoJob(jobId, userId) {
    return this.job.put(`/jobs/${jobId}/${userId}/cancel`).then(({ data }) => data);
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

  updateJob(jobId, job) {
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
      description,
    } = job;
    return this.job
      .put(`/jobs/${jobId}`, {
        title,
        location,
        contractType,
        salaryMin,
        salaryMax,
        experienceMin,
        workDay,
        study,
        requirementMin,
        description,
      })
      .then(({ data }) => data);
  }
}

const jobService = new JobService();

export default jobService;
