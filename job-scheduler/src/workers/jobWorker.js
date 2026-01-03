const { Worker } = require("bullmq");
const connection = require("../config/redis");

const worker = new Worker(
  "job-queue",
  async job => {
    console.log("Processing job:", job.name, job.data);
    await new Promise(r => setTimeout(r, 3000));
    return { success: true };
  },
  { connection }
);

worker.on("completed", job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job.id} failed`, err.message);
});
