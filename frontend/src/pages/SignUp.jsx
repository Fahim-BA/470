import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'jobSeeker',
        profile: {
            firstName: '',
            lastName: '',
            contactNumber: '',
            location: '',
            resume: ''
        }
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in user.profile) {
            setUser({
                ...user,
                profile: {
                    ...user.profile,
                    [name]: value
                }
            });
        } else {
            setUser({
                ...user,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await axios.post('http://localhost:3000/api/signup', user);
            console.log(response.data);
            if (response.data.success) {
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <div className="hero bg-[#e1dae4] min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left text-black/60">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Join our job portal and find your dream job today!
                        </p>
                    </div>
                    <div className="card bg-[#9389bd] w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Username</span>
                                </label>
                                <input name='username' onChange={handleChange} type="text" placeholder="username" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Email</span>
                                </label>
                                <input name='email' onChange={handleChange} type="email" placeholder="email" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Password</span>
                                </label>
                                <input name='password' onChange={handleChange} type="password" placeholder="password" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">First Name</span>
                                </label>
                                <input name='firstName' onChange={handleChange} type="text" placeholder="first name" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Last Name</span>
                                </label>
                                <input name='lastName' onChange={handleChange} type="text" placeholder="last name" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Contact Number</span>
                                </label>
                                <input name='contactNumber' onChange={handleChange} type="text" placeholder="contact number" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Location</span>
                                </label>
                                <input name='location' onChange={handleChange} type="text" placeholder="location" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Resume (URL)</span>
                                </label>
                                <input name='resume' onChange={handleChange} type="text" placeholder="resume URL" className="input input-bordered bg-white text-black/60" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary text-white">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}