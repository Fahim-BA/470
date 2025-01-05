import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function MainPage() {
    //getting from context
    const { isLoading } = useUserContext()

    const [job, setJob] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        workType: '',
        salary: '',
        skills: '',
        applicationDeadline: '',
        experience: '',
        educationLevel: '',
        category: ''
    });
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({
            ...job,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/jobs/createjob', job, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            setJobs([...jobs, response.data.job]);
            setIsModalOpen(false);
            toast.success('Job created successfully');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const saveJobDraft = async () => {
        try {
            const response = await axios.post('http://localhost:3000/jobs/save-draft', job, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Job draft saved successfully');
        } catch (error) {
            console.error('Error saving job draft:', error);
            toast.error('Failed to save job draft');
        }
    };



    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Reviewed':
                return 'bg-blue-100 text-blue-800';
            case 'Shortlisted':
                return 'bg-green-100 text-green-800';
            case 'Interview':
                return 'bg-purple-100 text-purple-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                console.log('Fetching applications...');
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('http://localhost:3000/applications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Applications response:', response);
                if (!response.data || !response.data.success || !response.data.data) {
                    throw new Error('Invalid response format from server');
                }

                setApplications(response.data.data);
            } catch (err) {
                console.error('Error fetching applications:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                }
                setError(err.message || 'Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="bg-[#e1dae4] min-h-screen flex flex-col items-center py-10">
            <div className="bg-white/60 p-6 rounded-2xl shadow-xl w-full max-w-4xl mb-5 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-700 mb-6">Post a Job</h2>
                <input
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Job Title"
                    className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                    Continue
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Job</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {currentStep === 1 && (
                                <>
                                    <div>
                                        <label className="block text-gray-600 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={job.description}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 mb-2">Company</label>
                                        <input
                                            name="company"
                                            value={job.company}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 mb-2">Location</label>
                                        <input
                                            name="location"
                                            value={job.location}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold "
                                    >
                                        Next
                                    </button>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <div>
                                        <label className="block text-gray-600 mb-2">Work Type</label>
                                        <select
                                            name="workType"
                                            value={job.workType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                                            required
                                        >
                                            <option value="">Select Work Type</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 mb-2">Salary</label>
                                        <input
                                            name="salary"
                                            value={job.salary}
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/60"
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:shadow-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Additional Steps */}

                            {currentStep === 3 && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Skills</label>
                                        <input
                                            name="skills"
                                            value={job.skills}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Application Deadline</label>
                                        <input
                                            name="applicationDeadline"
                                            value={job.applicationDeadline}
                                            onChange={handleChange}
                                            type="date"
                                            className="w-full px-3 py-2 border rounded-lg bg-black/10 text-gray-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Experience</label>
                                        <input
                                            name="experience"
                                            value={job.experience}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                            required
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:shadow-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                            {currentStep === 4 && (
                                <>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Education Level</label>
                                        <select
                                            name="educationLevel"
                                            value={job.educationLevel}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                            required
                                        >
                                            <option value="">Select Education Level</option>
                                            <option value="Any">Any</option>
                                            <option value="High School">High School</option>
                                            <option value="Bachelor">Bachelor</option>
                                            <option value="Master">Master</option>
                                            <option value="PhD">PhD</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Category</label>
                                        <select
                                            name="category"
                                            value={job.category}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Human Resources">Human Resources</option>
                                            <option value="IT">IT</option>
                                            <option value="Customer Service">Customer Service</option>
                                        </select>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:shadow-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            onClick={saveJobDraft}
                                            className="flex-1 bg-yellow-500 text-white py-3 rounded-lg hover:shadow-lg hover:bg-yellow-600 transition-all duration-300 font-semibold"
                                        >
                                            Save Job Draft
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:shadow-lg hover:bg-red-600 transition-all duration-300 font-semibold mt-4"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl mb-8">
                <Link to="/jobs">
                    <button
                        className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg hover:shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 font-semibold"
                    >
                        View All Jobs
                    </button>
                </Link>
            </div>

            {/* Application Status Section */}
            <div className="bg-white/60 p-6 rounded-2xl shadow-xl w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-700 mb-6">Your Applications</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((application) => (
                                <tr key={application._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {application.job?.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(application.appliedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}