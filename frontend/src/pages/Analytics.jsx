import React, { useState } from "react";

const Analytics = () => {
    // Mock data for jobs
    const mockJobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp",
            location: "Remote",
            workType: "Full-time",
            salary: "5000",
            currency: "USD",
            applicationDeadline: "2025-02-15",
            status: "Active",
        },
        {
            id: 2,
            title: "Backend Developer",
            company: "Innovate Ltd",
            location: "New York",
            workType: "Part-time",
            salary: "3000",
            currency: "USD",
            applicationDeadline: "2025-01-30",
            status: "Active",
        },
        {
            id: 3,
            title: "Project Manager",
            company: "BuildIt Inc.",
            location: "San Francisco",
            workType: "Contract",
            salary: "7000",
            currency: "USD",
            applicationDeadline: "2024-12-31",
            status: "Expired",
        },
    ];

    // Compute analytics from mock data
    const totalJobs = 60;
    const activeJobs = 60;
    const expiredJobs = "N/a";

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">Analytics Overview</h1>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Total Jobs:</span> {totalJobs}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Active Jobs:</span> {activeJobs}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Expired Jobs:</span> {expiredJobs}
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Jobs</h2>
                    {mockJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockJobs.map((job) => (
                                <div key={job.id} className="bg-white shadow-md rounded-lg p-4">
                                    <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Company:</span> {job.company}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Location:</span> {job.location}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Work Type:</span> {job.workType}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Salary:</span> {job.salary} {job.currency}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Application Deadline:</span>{" "}
                                        {new Date(job.applicationDeadline).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-medium">Status:</span> {job.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-700 text-lg">No job details available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
