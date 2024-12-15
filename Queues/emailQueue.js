const { Worker } = require("bullmq")

async function mockSendEmail(paylaod){
    const { from, to, subject, body } = paylaod
    return new Promise((resolve, reject) =>  {
        console.log(`Sending Email to ${to}...`);
        setTimeout(() => resolve(1), 2 * 1000)
    })

}

const emailWorker = new Worker('email-queue', async (job) => {
    const data = job.data
    console.log('Job Rec...', job.id);
    

    await mockSendEmail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        body: data.body
    })
}, {
    connection: {
        host: "caching-3a2b61d1-mossawer786-7bd5.f.aivencloud.com",
        port: 16147,
        username: "default",
        password: process.env.AVIEN_PASSWORD
      },
      limiter: {
        max: 50,
        duration: 10 * 1000
      }
})

module.exports = emailWorker