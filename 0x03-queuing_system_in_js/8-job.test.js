import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

describe('#createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should throw an error if arg jobs is not an array', (done) => {
    const jobs = {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account',
    };

    expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
    done();
  });

  it('should return the correct job type', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    done();
  });

  it('should create 3 jobs with correct data', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
      {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(3);
    queue.testMode.jobs.forEach((job, idx) => {
      expect(job.data).to.deep.equal(jobs[idx]);
    });
    done();
  });
});
