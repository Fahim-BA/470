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
        <div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Total Jobs</h2>
                <p className="text-gray-700 text-lg">{jobs.length}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Total Users</h2>
                <p className="text-gray-700 text-lg">{users.length}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Total Applications</h2>
                <p className="text-gray-700 text-lg">{applicationCount}</p>
            </div>
            <div>
                <h1 className="text-2xl font-bold mt-4 mb-2">Applications</h1>
                <ul className="list-disc pl-5">
                    {applications.map(application => (
                        <li key={application._id} className="text-lg text-gray-800 mb-2">
                            <p>Job Title: {application.job?.title}</p>
                            <p>Applicant: {application.name}</p>
                            <p>Email: {application.email}</p>
                            <p>Resume: <Link to={`/resume/${application._id}`} target="_blank" rel="noopener noreferrer">View Resume</Link></p>
                            <p>Status: {application.status}</p>
                            <button
                                onClick={() => handleAccept(application._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleDeny(application._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Deny
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;