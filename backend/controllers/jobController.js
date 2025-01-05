import jobModel from "../models/job.model.js";
import applicationModel from "../models/application.model.js";
import { notifyJobseekers } from "../sendemail/sendemail.js";

export async function createJob(req, res) {
    const {
        title,
        description,
        company,
        location,
        workType,
        salary,
        skills,
        applicationDeadline,
        experience,
        educationLevel,
        category
    } = req.body;

    try {
        // Convert salary and experience to numbers
        const salaryNumber = Number(salary);
        const experienceNumber = Number(experience);
        const postedBy = req.user._id

        // Create new job
        const newJob = new jobModel({
            title,
            description,
            company,
            location,
            workType,
            salary: salaryNumber,
            skills,
            applicationDeadline,
            experience: experienceNumber,
            educationLevel,
            postedBy: postedBy,
            category,
            status: 'Approved'
        });

        console.log("body: ", req.body);


        // Save job to database
        const savedJob = await newJob.save();

        // Notify jobseekers about the new job
        await notifyJobseekers(savedJob); // Add this line

        // Send response
        res.status(201).json({
            message: "Job created successfully",
            data: savedJob
        });
    } catch (error) {
        console.error("Error saving job draft:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error",
                details: error.errors
            });
        }
        res.status(500).json({
            message: "Failed to save job draft",
            error: error.message
        });
    }
}

export async function getJobs(req, res) {
    try {
        const jobs = await jobModel.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export async function getJobDetails(req, res) {
    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
}


export async function editJobDetails(req, res) {
    const { id } = req.params

    const {
        title,
        description,
        company,
        location,
        workType,
        salary,
        skills,
        applicationDeadline,
    } = req.body

    console.log("req.body: ", req.body);


    try {
        const salaryNumber = Number(salary);

        const job = await jobModel.findByIdAndUpdate(id, {
            title,
            description,
            company,
            location,
            workType,
            salary: salaryNumber,
            skills,
            applicationDeadline,
        }, { new: true })

        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json({
            message: "Job updated successfully",
            data: job
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}


export async function deleteJob(req, res) {
    const { id } = req.params

    try {
        const job = await jobModel.findByIdAndDelete(id)

        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json({
            message: "Job deleted successfully",
            data: job
        })


    }
    catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export async function saveJobDraft(req, res) {
    console.log("api called")
    const {
        title,
        description,
        company,
        location,
        workType,
        salary,
        skills,
        applicationDeadline,
        experience,
        educationLevel,
        category
    } = req.body;

    try {
        // Convert salary and experience to numbers
        const salaryNumber = Number(salary);
        const experienceNumber = Number(experience);
        const postedBy = req.user._id;

        // Create new job draft
        const newJob = new jobModel({
            title,
            description,
            company,
            location,
            workType,
            salary: salaryNumber,
            skills,
            applicationDeadline,
            experience: experienceNumber,
            educationLevel,
            postedBy,
            category,
            status: 'Pending'
        });

        // Save job draft to database
        const savedJob = await newJob.save();

        // Send response
        res.status(201).json({
            message: "Job draft saved successfully",
            data: savedJob
        });
    } catch (error) {
        console.error("Detailed error saving job draft:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            errors: error.errors
        });
        res.status(500).json({
            message: "Failed to save job draft",
            error: {
                message: error.message,
                details: error.errors || error
            }
        });
    }
}

export async function submitApplication(req, res) {
    console.log("API Connected to Submit Application");
    const { name, email, resume } = req.body;
    const jobId = req.params.id;

    // Check if user is authenticated and job ID is valid
    if (!req.user || !jobId) {
        return res.status(400).json({ message: "Invalid user or job ID" });
    }

    try {
        // Get the job details
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the applicant is the job poster
        if (job.postedBy.toString() === req.user._id.toString()) {
            return res.status(403).json({
                message: "You can not apply for your own posted job"
            });
        }

        console.log('Request body:', req.body);
        console.log('Job ID:', jobId);

        // Create a new application document
        const newApplication = new applicationModel({
            name,
            email,
            resume,
            job: jobId,
            applicant: req.user._id,
        });

        // Save application to the database
        const savedApplication = await newApplication.save();
        console.log("Application saved successfully:", savedApplication);

        res.status(201).json({
            message: "Application submitted successfully",
            data: savedApplication,
        });
    } catch (error) {
        console.error("Error saving application:", error);
        res.status(500).json({ message: "Server error", error });
    }
}