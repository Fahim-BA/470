import nodemailer from 'nodemailer';
import userModel from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Rate limiter implemented
const rateLimiter = {
    emailCount: 0,
    lastReset: new Date(),
    
    async checkLimit() {
        const now = new Date();
        if (now.getDate() !== this.lastReset.getDate()) {
            this.emailCount = 0;
            this.lastReset = now;
        }
        
        if (this.emailCount >= 450) {
            throw new Error('Daily email limit reached');
        }
        this.emailCount++;
    }
};

// Email queue
const emailQueue = [];
let isProcessingQueue = false;

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(email, subject, msg) {
    try {
        await rateLimiter.checkLimit();
        await transporter.sendMail({
            to: email,
            subject: subject,
            html: msg
        });
    } catch (error) {
        if (error.message === 'Daily email limit reached') {
            // Add to queue
            emailQueue.push({ email, subject, msg });
            if (!isProcessingQueue) {
                processQueue();
            }
        } else {
            console.error('Error sending email:', error);
        }
    }
}

async function processQueue() {
    if (isProcessingQueue || emailQueue.length === 0) return;
    
    isProcessingQueue = true;
    
    while (emailQueue.length > 0) {
        const { email, subject, msg } = emailQueue[0];
        
        try {
            await rateLimiter.checkLimit();
            await transporter.sendMail({
                to: email,
                subject: subject,
                html: msg
            });
            emailQueue.shift();
        } catch (error) {
            if (error.message === 'Daily email limit reached') {
                // Wait until next day
                await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000));
            } else {
                console.error('Error processing queue:', error);
                emailQueue.shift(); 
            }
        }
    }
    
    isProcessingQueue = false;
}

export async function notifyJobseekers(newJob) {
    try {
        const jobseekers = await userModel.getUsersWithRole('jobSeeker');
        for (const user of jobseekers) {
            await sendMail(
                user.email, 
                'New Job Posted', 
                `<h1>A new job has been posted: ${newJob.title}</h1><p>${newJob.description}</p>`
            );
        }
    } catch (error) {
        console.error('Error sending email notifications:', error);
    }
}
