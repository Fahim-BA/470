import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

function JobMain() {
    const { id } = useParams();
    const { user } = useUserContext();
    const navigate = useNavigate()

    const [jobDetails, setJobDetails] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedJobDetails, setEditedJobDetails] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/jobs/jobdetails/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setJobDetails(response.data);
                setEditedJobDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchDetails();
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedJobDetails({
            ...editedJobDetails,
            [name]: value,
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/jobs/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Job deleted successfully");
            navigate("/jobs");
            console.log("Job deleted successfully");
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/jobs/edit/${id}`, editedJobDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setJobDetails(response.data.data);
            setIsEditModalOpen(false);
            toast.success("Job updated successfully");
            console.log("Job updated successfully:");
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };


    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };





    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">{jobDetails.title || "Job Details"}</h1>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Job ID:</span> {id}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Description:</span> {jobDetails.description || "No description available."}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Company:</span> {jobDetails.company || "Not specified"}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Location:</span> {jobDetails.location || "Not specified"}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Work Type:</span> {jobDetails.workType || "Not specified"}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Salary:</span> {jobDetails.salary || "Not specified"} {jobDetails.currency || ""}
                    </p>

                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Skills Required:</span> {jobDetails.skills || "Not specified"}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <span className="font-medium">Application Deadline:</span> {new Date(jobDetails.applicationDeadline).toLocaleDateString() || "Not specified"}
                    </p>


                    {user && user._id === jobDetails.postedBy && (
                        <div className="flex gap-4 mt-6">
                            <button onClick={handleDelete} className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                                <Trash size={16} /> Delete
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                <Edit size={16} /> Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Edit Job</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    name="title"
                                    value={editedJobDetails.title}
                                    onChange={handleEditChange}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={editedJobDetails.description}
                                    onChange={handleEditChange}
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company</label>
                                <input
                                    name="company"
                                    value={editedJobDetails.company}
                                    onChange={handleEditChange}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location</label>
                                <input
                                    name="location"
                                    value={editedJobDetails.location}
                                    onChange={handleEditChange}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Work Type</label>
                                <select
                                    name="workType"
                                    value={jobDetails.workType}
                                    onChange={handleEditChange}
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
                            <div className="mb-4">
                                <label className="block text-gray-700">Salary</label>
                                <input
                                    name="salary"
                                    value={editedJobDetails.salary}
                                    onChange={handleEditChange}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Skills</label>
                                <input
                                    name="skills"
                                    value={editedJobDetails.skills}
                                    onChange={handleEditChange}
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-white/60"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Application Deadline</label>
                                <input
                                    name="applicationDeadline"
                                    value={formatDateForInput(editedJobDetails.applicationDeadline)}
                                    onChange={handleEditChange}
                                    type="date"
                                    className="w-full px-3 py-2 border rounded-lg bg-black/10 text-black/60"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-2"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobMain;