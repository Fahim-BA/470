import express from 'express';
import { getAllApplications, acceptApplication, denyApplication, getResume } from '../controllers/applicationController.js';
import auth from '../middlewares/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// Get all applications
router.get('/', getAllApplications);

// Accept application
router.put('/:id/accept', acceptApplication);

// Deny application
router.put('/:id/deny', denyApplication);

// Get resume text by application ID
router.get('/:id/resume', auth, getResume);

export default router;
