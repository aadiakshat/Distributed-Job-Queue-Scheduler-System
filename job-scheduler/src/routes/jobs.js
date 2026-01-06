const express = require("express");
const jobQueue  = require("../queues/jobQueue");
const router = express.Router();

router.post("/enqueue", async (req, res) => {
  const {
    type,
    payload,
    priority = 1,
    delay = 0
  } = req.body;

  if (!type || !payload) {
    return res.status(400).json({ error: "type and payload are required" });
  }

  const job = await jobQueue.add(
    type,                    // job name = type
    payload,
    {
      priority,
      delay,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000
      },
      removeOnComplete: false,
      removeOnFail: false
    }
  );

  res.json({
    jobId: job.id,
    status: "queued"
  });
});

router.get("/:id", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  const job = await jobQueue.getJob(req.params.id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  await job.remove();
  res.json({ message: "Job removed successfully" });
});

router.get("/", async (req, res) => {
  const jobs = await jobQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed"
  ]);

  const formatted = jobs.map(job => ({
    id: job.id,
    name: job.name,
    status: job.finishedOn
      ? "completed"
      : job.failedReason
      ? "failed"
      : job.processedOn
      ? "active"
      : "queued",
    attemptsMade: job.attemptsMade,
    priority: job.opts.priority,
    delay: job.opts.delay
  }));

  res.json(formatted);
});

router.get("/failed/jobs", async (req, res) => {
  const failedJobs = await jobQueue.getFailed();

  res.json(
    failedJobs.map(job => ({
      id: job.id,
      name: job.name,
      error: job.failedReason,
      attempts: job.attemptsMade
    }))
  );
});



module.exports = router;
