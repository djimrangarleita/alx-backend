const createNotificationJob = (jobData, queue) => {
  const job = queue.create('push_notification_code_3', jobData);
  job.save((error) => {
    if (error) {
      console.log(`Job creation failed: ${error}`);
      return;
    }
    if (queue.testMode && !job.id) {
      job.id = queue.testMode.jobs.length + 1;
    }
    console.log(`Notification job created: ${job.id}`);

    job.on('complete', () => {
      console.log(`Notification job #${job.id} completed`);
    }).on('failed', (error) => {
      console.log(`Notification job #${job.id} failed: ${error}`);
    }).on('progress', (percentage) => {
      console.log(`Notification job #${job.id} ${percentage}% complete`);
    });
  });
};

const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((jobData) => {
    createNotificationJob(jobData, queue);
  });
};

export default createPushNotificationsJobs;
