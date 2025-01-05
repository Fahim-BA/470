

const HeroSection = () => {

    return (
        <div className="w-full h-screen">
            <div className=" sm:px-10 bg-[#e1dae4] rounded-md relative">

                {/* header */}
                <header
                    className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10">

                    <div className="w-full lg:w-[45%]">

                        <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px] text-slate-500">
                            <span className="text-[#1701dc]">JobMadeEz</span> is here to help you find your dream job</h1>
                        <p className="mt-2 text-[1rem]">We are dedicated to connecting you with the best job opportunities available.</p>
                    </div>

                    <div className="w-full lg:w-[55%]">
                        <img src="https://i.ibb.co/syHFhNy/image.png" alt="Job search illustration" className="" />
                    </div>
                </header>

                <section className="px-8 pb-[30px]">
                    <h1 className="text-[1.3rem] font-semibold text-slate-600">Our Services</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%] text-slate-600">
                        <div>
                            <img src="https://i.ibb.co/z721j8b/Vector.png" alt="Branding icon" className="w-[30px]" />
                            <h4 className="text-[1.1rem] mt-3">Job Listings</h4>
                            <p className="text-[0.9rem] text-gray-500 mt-1">Browse through thousands of job listings from top companies.</p>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/Qn78BRJ/Ui-Design.png" alt="UI/UX icon" className="w-[30px]" />
                            <h4 className="text-[1.1rem] mt-3">Resume Building</h4>
                            <p className="text-[0.9rem] text-gray-500 mt-1">Create a professional resume with our easy-to-use tools.</p>
                        </div>
                        <div>
                            <img src="https://i.ibb.co/GcsvXxk/Product.png" alt="Product Design icon" className="w-[30px]" />
                            <h4 className="text-[1.1rem] mt-3">Career Advice</h4>
                            <p className="text-[0.9rem] text-gray-500 mt-1">Get expert advice on how to advance your career and land your dream job.</p>
                        </div>
                    </div>
                </section>

                {/* right blur shadow */}
                <div className="w-[100px] h-[100px] bg-[#DC0155] blur-[90px] absolute bottom-[80px] right-[80px]"></div>
            </div>
        </div>
    );
};

export default HeroSection;