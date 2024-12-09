import React, { useState } from 'react';
import { useUser } from '../context/authUser';
import ProfileIcon from '../Image/Profile.png'
import { NavLink } from 'react-router-dom';

function Profile() {
    const { user } = useUser();
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleUpdateProfile = () => {
        setIsModelOpen(true)
    }

    const handelSaveProfile = () => {

    }
    const handleCloseModel = () => {
        setIsModelOpen(false);
    }
    return (
        <>
            <div className="mt-5 px-5 sm:px-5 sm:py-5 flex justify-center items-center">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col mt-10 items-center pb-5">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src={ProfileIcon}
                            alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.displayName}</h5>
                        <span className="text-sm text-green-600 dark:text-gray-400">Email: {user?.email}</span>

                        <span className="text-sm text-blue-500 dark:text-green-400">Account On:{user?.metadata?.
                            creationTime
                        }</span>
                        <div className="flex mt-4 md:mt-6">
                            <p className="inline-flex items-center cursor-pointer
                            px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleUpdateProfile}
                            >
                                Update Profile
                            </p>

                            <a
                                href="#"
                             >
                               
                            </a>

                              <NavLink
                                  to="/Manageproduct"
                              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        
                              >
                              Maname Product
                              </NavLink>
                        </div>
                    </div>

                    {isModelOpen &&
                        <div>
                            <div className='px-6 sm:px mt-5 mb-5'>
                                <form className="max-w-md z-0 mx-auto">

                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="floating_first_name" id="floating_first_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                     dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600
                      peer" placeholder=" " required />
                                            <label htmlFor="floating_first_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                    transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                     peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                      peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm
                     text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                      dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" " required />
                                            <label htmlFor="floating_last_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                    peer-focus:-translate-y-6">Last name</label>
                                        </div>
                                    </div>

                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm
                 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 
                  peer" placeholder=" " required />
                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                   peer-focus:scale-75 peer-focus:-translate-y-6"
                
                   >Email</label>
                                    </div>

                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900
                 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                  peer-focus:-translate-y-6">Password</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                 border-gray-300 
                appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0
                 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600
                 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                 peer-focus:-translate-y-6">Confirm password</label>
                                    </div>

                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="tel"
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                name="floating_phone"
                                                id="floating_phone"
                                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                maxLength={10}
                                                required />
                                            <label
                                                htmlFor="floating_phone"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                     peer-focus:-translate-y-6"
                                            >Phone number</label>
                                        </div>
                                        <div
                                            className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="floating_company"
                                                id="floating_company"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" " required />
                                            <label
                                                htmlFor="floating_company"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Company (Ex. Google)
                                            </label>
                                        </div>
                                    </div>



                                    <div className="flex justify-center items-center">
                                        <p className="inline-flex items-center cursor-pointer
                            px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={handelSaveProfile}
                                        >
                                            Save
                                        </p>

                                        <p
                                            onClick={handleCloseModel}
                                            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            Cancel

                                        </p>
                                    </div>


                                </form>

                            </div>
                        </div>}




                </div>
            </div>

        </>
    );
}

export default Profile;
