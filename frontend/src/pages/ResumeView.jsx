import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResumeView = () => {
    const { id } = useParams();
    const [resumeText, setResumeText] = useState('');

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/applications/${id}/resume`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('Resume response:', response.data); // Add this line
                setResumeText(response.data.resumeText);
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        };

        fetchResume();
    }, [id]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Resume</h1>
            <pre className="whitespace-pre-wrap">{resumeText}</pre>
        </div>
    );
};

export default ResumeView;