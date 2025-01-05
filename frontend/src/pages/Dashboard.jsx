import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [users, setUsers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [applicationCount, setApplicationCount] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/jobs/getjobs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/applications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setApplications(response.data.data);
                setApplicationCount(response.data.data.length);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchJobs();
        fetchUsers();
        fetchApplications();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.put(`http://localhost:3000/applications/${id}/accept`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setApplications(applications.map(app => app._id === id ? { ...app, status: 'Accepted' } : app));
        } catch (error) {
            console.error('Error accepting application:', error);
        }
    };

    const handleDeny = async (id) => {
        try {
            await axios.put(`http://localhost:3000/applications/${id}/deny`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setApplications(applications.map(app => app._id === id ? { ...app, status: 'Denied' } : app));
        } catch (error) {
            console.error('Error denying application:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
                    <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total Applications</h2>
                    <p className="text-2xl font-bold text-gray-900">{applicationCount}</p>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Applications</h1>
                <ul className="space-y-4">
                    {applications.map(application => (
                        <li key={application._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                            <p className="text-gray-700"><strong>Job Title:</strong> {application.job?.title}</p>
                            <p className="text-gray-700"><strong>Applicant:</strong> {application.name}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {application.email}</p>
                            <p className="text-gray-700">
                                <strong>Resume:</strong>{' '}
                                <Link to={`/resume/${application._id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    View Resume
                                </Link>
                            </p>
                            <p className="text-gray-700"><strong>Status:</strong> {application.status}</p>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleAccept(application._id)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDeny(application._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Deny
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
