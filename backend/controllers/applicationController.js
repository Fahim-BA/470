import Application from '../models/application.model.js';

// Get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('job', 'title')
            .sort({ appliedAt: -1 });

        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch applications',
            error: error.message
        });
    }
};

// Accept application
export const acceptApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to accept application', error: error.message });
    }
};

// Deny application
export const denyApplication = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findByIdAndUpdate(id, { status: 'Denied' }, { new: true });

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to deny application', error: error.message });
    }
};

// Get resume text by application ID
export const getResume = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.status(200).json({ success: true, resumeText: application.resume });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch resume', error: error.message });
    }
};