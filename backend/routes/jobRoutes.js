import express from 'express';
import { createJob, getJobs, getJobDetails, editJobDetails, deleteJob, submitApplication, saveJobDraft } from '../controllers/jobController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/createjob', authMiddleware, createJob)
router.get('/getjobs', authMiddleware, getJobs)
router.get('/jobdetails/:id', authMiddleware, getJobDetails)
router.post('/edit/:id', authMiddleware, editJobDetails)
router.delete('/delete/:id', authMiddleware, deleteJob)

router.route('/apply/:id').post(authMiddleware, submitApplication)
router.post('/save-draft', authMiddleware, saveJobDraft)



export default router
