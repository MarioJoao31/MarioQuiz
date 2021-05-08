import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Admin = (props) => {
  return ( <Fragment>
    <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5'>
              <div className='flex flex-row items-center'>
                <div className='flex-shrink pr-4'>
                  <div className='rounded-full p-5 bg-green-600'>
                    <i className='fa fa-wallet fa-2x fa-inverse'></i>
                  </div>
                </div>
                <div className='flex-1 text-right md:text-center'>
                  <h5 className='font-bold uppercase text-gray-600'>
                    Total Revenue
                  </h5>
                  <h3 className='font-bold text-3xl'>
                    $3249
                    <span className='text-green-500'>
                      <i className='fas fa-caret-up'></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5'>
              <div className='flex flex-row items-center'>
                <div className='flex-shrink pr-4'>
                  <div className='rounded-full p-5 bg-pink-600'>
                    <i className='fas fa-users fa-2x fa-inverse'></i>
                  </div>
                </div>
                <div className='flex-1 text-right md:text-center'>
                  <h5 className='font-bold uppercase text-gray-600'>
                    Total Users
                  </h5>
                  <h3 className='font-bold text-3xl'>
                    249{" "}
                    <span className='text-pink-500'>
                      <i className='fas fa-exchange-alt'></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5'>
              <div className='flex flex-row items-center'>
                <div className='flex-shrink pr-4'>
                  <div className='rounded-full p-5 bg-yellow-600'>
                    <i className='fas fa-user-plus fa-2x fa-inverse'></i>
                  </div>
                </div>
                <div className='flex-1 text-right md:text-center'>
                  <h5 className='font-bold uppercase text-gray-600'>
                    New Users
                  </h5>
                  <h3 className='font-bold text-3xl'>
                    2{" "}
                    <span className='text-yellow-600'>
                      <i className='fas fa-caret-up'></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5'>
              <div className='flex flex-row items-center'>
                <div className='flex-shrink pr-4'>
                  <div className='rounded-full p-5 bg-blue-600'>
                    <i className='fas fa-server fa-2x fa-inverse'></i>
                  </div>
                </div>
                <div className='flex-1 text-right md:text-center'>
                  <h5 className='font-bold uppercase text-gray-600'>
                    Server Uptime
                  </h5>
                  <h3 className='font-bold text-3xl'>152 days</h3>
                </div>
              </div>
            </div>
          </div>
        
          <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
            <div className='bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5'>
              <div className='flex flex-row items-center'>
                <div className='flex-shrink pr-4'>
                  <div className='rounded-full p-5 bg-red-600'>
                    <i className='fas fa-inbox fa-2x fa-inverse'></i>
                  </div>
                </div>
                <div className='flex-1 text-right md:text-center'>
                  <h5 className='font-bold uppercase text-gray-600'>Issues</h5>
                  <h3 className='font-bold text-3xl'>
                    3{" "}
                    <span className='text-red-500'>
                      <i className='fas fa-caret-up'></i>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/2 xl:w-1/3 p-6'>
          <div className='bg-white border-transparent rounded-lg shadow-xl'>
            <div className='bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2'>
              <h5 className='font-bold uppercase text-gray-600'>Advert</h5>
            </div>
            <div className='p-5 text-center'>
              
            </div>
          </div>
        </div>
        </Fragment>
  );
};

Admin.propTypes = {};

export default Admin;
