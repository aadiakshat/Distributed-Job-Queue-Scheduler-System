const jobQueue = require("./queues/jobQueue");

const getJobStatus = async (req, res) => {
  const job = await jobQueue.getJob(String(req.params.id));

  if (!job) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    id: job.id,
    state: await job.getState(),
    attempts: job.attemptsMade,
    data: job.data
  });
};

module.exports = { getJobStatus };
