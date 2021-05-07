import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "../dashboard/DashboardActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Menu principal</h1>
      <p className='lead'>
        <i className='fas fa-user'> Bem vindo {user && user.name}</i>
      </p>



      <a class="block rounded w-full lg:flex mb-10" href=".">
             <div class="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75" style={{backgroundImage: 'asd'}} >
             </div>
             <div class="bg-white rounded px-4 py-4 flex flex-col justify-between leading-normal shadow">
               <div>
                 <div class="mt-3 md:mt-0 text-gray-700 font-bold text-3xl mb-2">
                   Aliquam venenatis nisl id purus rhoncus, in efficitur sem hendrerit.
                 </div>
               </div>
               <div class="flex mt-3">
                 <img alt="" src="https://randomuser.me/api/portraits/men/11.jpg" class="h-10 w-10 rounded-full mr-2 object-cover" />
                 <div>
                   <p class="font-semibold text-gray-700 text-sm capitalize"> eduard franz </p>
                   <p class="text-gray-600 text-xs"> 14 Aug </p>
                 </div>
               </div>
             </div>
           </a>





      {profile !== null ? (
        <Fragment>
          <DashboardActions />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Ainda não tens perfil, adiciona as tuas informaçoes aqui</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Criar Perfil
          </Link>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
