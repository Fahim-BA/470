import express from 'express';
import { getAllApplications, acceptApplication, denyApplication } from '../controllers/applicationController.js';

const router = express.Router();

// Get all applications
router.get('/', getAllApplications);

// Accept application
router.put('/:id/accept', acceptApplication);

// Deny application
router.put('/:id/deny', denyApplication);

export default router;
