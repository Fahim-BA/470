import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin, DollarSign, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    useEffect(() => {
        // Fetch all jobs
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/jobs/getjobs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        // Filter jobs based on search query and filter criteria
        const filtered = jobs.filter((job) => {
            const matchesSearchQuery =
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilterCriteria =
                filterCriteria === "all" ||
                (filterCriteria === "experience" && job.experience <= 2) ||
                (filterCriteria === "education" && job.educationLevel.toLowerCase().includes("bachelor"));

            return matchesSearchQuery && matchesFilterCriteria;
        });
        setFilteredJobs(filtered);
    }, [searchQuery, filterCriteria, jobs]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCriteria(event.target.value);
    };

    // Calculate the jobs to display based on the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen py-8">
            {/* Search Form */}
            <form className="max-w-md mx-auto mb-8">
                <label
                    htmlFor="job-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative flex items-center">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="job-search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border rounded-lg pl-10 bg-gray-50 outline-none"
                        placeholder="Search jobs..."
                    />
                    <select
                        value={filterCriteria}
                        onChange={handleFilterChange}
                        className="ml-4 px-4 py-2 border rounded-lg bg-gray-50 outline-none"
                    >
                        <option value="all">All</option>
                        <option value="experience">Experience less than or equal to 2 years</option>
                        <option value="education">Bachelor&apos;s Degree</option>
                    </select>
                </div>
            </form>

            {/* Job Listings */}
            <div className="container mx-auto px-4 py-10 sm:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentJobs.map((job) => (
                        <Link to={`/jobs/${job._id}`} key={job._id}>
                            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
                                    {job.title}
                                </h2>
                                <div className="flex gap-4 flex-wrap">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Briefcase className="w-4 h-4 mr-1" /> {job.company}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <MapPin className="w-4 h-4 mr-1" /> {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Workflow className="w-4 h-4 mr-1" /> {job.workType}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <DollarSign className="w-4 h-4" /> {job.salary} {job.currency}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Briefcase className="w-4 h-4 mr-1" /> {job.experience} years
                                    </div>
                                </div>
                                <Link to={`/apply/${job._id}`} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    Apply
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>
                {filteredJobs.length === 0 && (
                    <p className="text-center text-gray-500">No jobs found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="flex list-none">
                        {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, index) => (
                            <li key={index} className="mx-1">
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Jobs;
