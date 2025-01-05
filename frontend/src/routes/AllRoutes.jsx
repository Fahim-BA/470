import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import Analytics from '../pages/Analytics';
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ProtectedRoutes from '../../utils/ProtectedRoutes'
import MainPage from '../pages/MainPage'
import Jobs from '../pages/Jobs'
import JobMain from '../pages/JobMain'
import JobApplication from '../pages/JobApplication';
import ApplicationStatus from '../pages/ApplicationStatus';
import Dashboard from '../pages/Dashboard';
import ResumeView from '../pages/ResumeView';

export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
                <Route path='/main' element={<MainPage />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/jobs/:id' element={<JobMain />} />
                <Route path='/apply/:jobId' element={<JobApplication />} />
                <Route path='/application-status' element={<ApplicationStatus />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/resume/:id' element={<ResumeView />} />
            </Route>
        </Routes>
    )
}
