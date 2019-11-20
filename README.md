# Emibet

## Description

Emibet is an application made for Nurses and Companies, with the purpose of manage Job offers and their applications.

## User Stories

- **404:** As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **Signup:** As a user I want to sign up on the webpage so that I can see my private Zone and interact with the App.
- **Signup:** The Signup is made separate for Nurses, and Companies.
- **Login:** As a user I want to be able to log in on the webpage so that I can get back to my account.
- **Logout:** As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Homepage:** As a user I want to be able to access the homepage so that I can see the basic info of the Job Offers.
- **Edit Nurse Profile:** As a nurse I can edit the information on my profile and submit my basic CV.
- **Edit Company Profile:** As a company I can edit the information on my profile.
- **Company Jobs New:** As a company I want to create new Job Offers.
- **Company Jobs List:** As a company I want to be able to manage the Job Offers, I can view the Applicants info, and decide if I want to assign the job or I want to decline the application.
- **Available Jobs:** As a nurse I want to view the list of the available Job offers, and view the detail and decide if I want to apply the offer.
- **Applied Jobs:** As a nurse I want to view the list of my applied Job offers, and view the status of the application.

## Backlog

Users:

- Send messages and chat between the candidates and the company.
- Map and locate the Job offers.
- Search in the Job offers.
- Once the job is assign, the user is able to manage if the job is done.

## Pages

| url                              | public | Functionality                                                                                                         |
| -------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `/`                              | true   | landing page                                                                                                          |
| `/signup-employee`               | true   | Signup employee                                                                                                       |
| `/signup-contractor`             | true   | Signup contractor                                                                                                     |
| `/login`                         | true   | login user                                                                                                            |
| `/private`                       | false  | My info based on you r type of user                                                                                   |
| `/private/nurse/profile/edit`    | false  | Edit nurse profile                                                                                                    |
| `/private/company/profile/edit`  | false  | Edit company profile                                                                                                  |
| `/private/CV`                    | false  | Edit nurse CV                                                                                                         |
| `/private/jobs/available`        | false  | List of available Jobs                                                                                                |
| `/private/jobs/:id/detail`       | false  | Job detail and option to apply or cancel the application and view the status                                          |
| `/private/jobs/applied`          | false  | List of applied Jobs                                                                                                  |
| `/private/company/jobs`          | false  | List of Jobs created by the company                                                                                   |
| `/private/company/jobs/:id`      | false  | Job detail where the company can manage the Job, with options for view applicants and assign or decline the applicant |
| `/private/company/jobs/:id/edit` | false  | Job info edit                                                                                                         |
| `/private/company/job/new`       | false  | Create new job offer                                                                                                  |

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

* Company Service

  - company.updateUserCompany(user)

* Job Service

  - job.listAllJobs()
  - job.listCompanyJobs(username)
  - job.jobDetail(jobId)
  - job.applytoJob(jobId, userId)
  - job.confirmJob(jobId, userId, ApplicId)
  - job.cancelJob(jobId, userId)
  - job.declineJob(jobId, userId)
  - job.pendingJob(jobId, userId)
  - job.cancelApplytoJob(jobId, userId)
  - job.addNewJob(job, username)
  - job.updateJob(jobId, job)

* User Service

  - user.updateUserNurse(user)
  - user.infoUserNurse(nurseId)

### Contexts

- AuthContext

  - handleLogin
  - handleSignup
  - userData
  - handleLogout

# Server

## Models

Company model

```
    company: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    contactName: String,
    email: String,
    location: String,
    address: String,
    phone: Number,
    NIF: String,
    description: String,
    jobs: [{ type: ObjectId, ref: 'Job' }],


```

Job model

```

    title: String,
    description: String,
    location: String,
    contractType: String,
    salaryMin: Number,
    salaryMax: Number,
    experienceMin: String,
    workDay: String,
    study: String,
    author: { type: ObjectId, ref: 'Company' },
    requirementMin: String,
    urgent: { type: Boolean, default: false },
    employee: { type: ObjectId, ref: 'User' },
    done: { type: Boolean, default: false },
    applicants: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
        },
        status: { type: String, default: 'Pending' },
      },
    ],

},

```

User model

```

    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    // type: {
    //   superAdmin: { type: Boolean, default: false },
    //   nurse: { type: Boolean, default: false },
    //   company: { type: Boolean, default: false },
    // },
    nurse: {
      name: String,
      surname: String,
      email: String,
      location: String,
      address: String,
      phone: Number,
      speciality: String,
      birthday: Date,
      dni: String,
      candidateTo: [{ type: ObjectId, ref: 'Job' }],
      jobs: [{ type: ObjectId, ref: 'Job' }],
      driverLicense: { type: Boolean, default: false },
      car: { type: Boolean, default: false },
      resume: {
        freelance: { type: Boolean, default: false },
        licenseNumber: Number,
        nurseDegree: {
          year: Date,
        },
        experience: [
          {
            company: String,
            job: String,
            currentJob: { type: Boolean, default: false },
            startDate: Date,
            endDate: Date,
            jobDescription: String,
          },
        ],
        studies: [
          {
            title: String,
            startDate: Date,
            endDate: Date,
            academy: String,
          },
        ],
        languages: [
          {
            name: String,
            speak: {
              type: String,
              enum: ['Basic', 'Intermediate', 'Advance', 'Native'],
              default: 'Basic',
            },
            write: {
              type: String,
              enum: ['Basic', 'Intermediate', 'Advance', 'Native'],
              default: 'Basic',
            },
            read: {
              type: String,
              enum: ['Basic', 'Intermediate', 'Advance', 'Native'],
              default: 'Basic',
            },
          },
        ],
      },
    },
    avatar: String,

},

```

## API Endpoints (backend routes)

## API routes:

### auth

| Method | Route           | Functionality                                                                 |
| ------ | --------------- | ----------------------------------------------------------------------------- |
| GET    | api/auth/me     | Check session status                                                          |
| POST   | api/auth/signup | Log in user to app and set user to session (Body: username, email, password)  |
| POST   | api/auth/login  | Register user to app and set user to session (Body: username, mail, password) |
| GET    | api/auth/logout | Log out user from app and remove session                                      |

### companies

| Method | Route                           | Functionality                 |
| ------ | ------------------------------- | ----------------------------- |
| GET    | api/companies/all               | View all companies            |
| GET    | api/companies/:companyId/detail | view the COMPANY Detail by Id |
| PUT    | api/companies//profile/edit     | to update COMPANY PROFILE     |

### jobs

| Method | Route                                           | Functionality                                 |
| ------ | ----------------------------------------------- | --------------------------------------------- |
| GET    | api/jobs/:username/new'                         | to create a new Job                           |
| GET    | api/jobs//all                                   | to view all JOBS                              |
| GET    | api/jobs/:username/all                          | to view all JOBS Posted by a specific Company |
| GET    | api/jobs/:jobId/detail                          | to view the JOB Detail by Id                  |
| PUT    | api/jobs/:jobId                                 | to update a specidifc JOB                     |
| PUT    | api/jobs/:jobId/:userId/add                     | to put a USER in applicants ARRAY             |
| PUT    | api/jobs/:jobId/:userId/cancel                  | to quit a USER in applicants ARRAY            |
| PUT    | api/jobs/:jobId/:nurseId/:applicationId/assign' | to assign a USER to JOB                       |
| PUT    | api/jobs/:jobId/:nurseId/cancelAssign'          | to CANCEL assign a USER to JOB                |
| PUT    | api/jobs/:jobId/:nurseId/declineAssign'         | to DECLINE the Job petition                   |
| PUT    | api/jobs/:jobId/:nurseId/pendingAssign'         | to PENDIG the Job petition                    |
| DELETE | api/jobs/:jobId'                                | to delete a specific JOB                      |

### nurse

| Method | Route                     | Functionality                  |
| ------ | ------------------------- | ------------------------------ |
| GET    | api/nurse/all             | to view all NURSES             |
| PUT    | api/nurse/:nurseId/detail | to view the NURSE Detail by Id |
| PUT    | api/nurse/profile/edit    | to update NURSE PROFILE        |

## Links

### Git

[Client repository Link](https://github.com/Emibet/frontend-React)

[Server repository Link](https://github.com/Emibet/backend-server)

[Deploy Link Backend](http://emibet.herokuapp.com/)

[Deploy Link Frontend](https://emibet.netlify.com/)

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/xavigallardo/emibet)

```

```
