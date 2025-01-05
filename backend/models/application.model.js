import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    // applicant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Shortlisted', 'Interview', 'Rejected'],
        default: 'Pending'
    },
    interviewDetails: {
        date: Date,
        mode: {
            type: String,
            enum: ['Online', 'Offline', 'Phone']
        },
        notes: String

    },
    additionalDocuments: [{
        name: String,
        url: String

    }],
    appliedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Ensure unique application per job per user
// ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const applicationModel = mongoose.model('Application', ApplicationSchema);

export default applicationModel;