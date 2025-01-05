import React, { useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

const JobApplication = () => {
    const { jobId } = useParams(); // Extract jobId from URL parameters
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            resume: formData.resume,
        };

        try {
            console.log("Form data being sent:", data);
            console.log("Job ID:", jobId);

            const response = await axios.post(`http://localhost:3000/jobs/apply/${jobId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log("Server response:", response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error submitting application:', error.response || error.message);
            const errorMessage = error.response?.data?.message || 'Failed to submit application. Please try again.';
            alert(errorMessage);
        }
    };


    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-4">Job Application</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                    <textarea id="resume" name="resume" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit Application</button>
            </form>
        </div>
    );
};

export default JobApplication;