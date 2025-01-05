import express from 'express';
import { SignUp, SignIn , GetUserProfile, getAllUsers, getApplicationCount } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { rateLimit } from 'express-rate-limit'

//ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const router = express.Router();

router.post('/signup', limiter, SignUp);
router.post('/signin', limiter, SignIn);
router.get('/profile' , authMiddleware, GetUserProfile)
router.get('/users', authMiddleware, getAllUsers); 
router.get('/applications/count', authMiddleware, getApplicationCount);

export default router;