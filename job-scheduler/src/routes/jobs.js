const express = require("express");
const jobQueue = require("../queues/jobQueue");

const router = express.Router();

router.post("/enqueue", async (req, res) => {
  const job = await jobQueue.add(
    "background-task",
    req.body,
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 }
    }
  );

  res.json({ jobId: job.id });
});

module.exports = router;
