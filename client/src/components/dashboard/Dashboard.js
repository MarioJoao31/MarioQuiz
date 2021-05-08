import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import DashboardActions from "../dashboard/DashboardActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import TopPosts from "./TopPosts"
import { getTopPosts } from "../../actions/post";

const Dashboard = ({
  getTopPosts, 
  post: { posts },
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {

  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

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


      <h1>Top 3 perguntas com mais likes!</h1>
      <br></br>
    <div className="grid grid-cols-3 gap-4">
      
      {posts.map((post) => (
          <TopPosts key={post._id} post={post} />
          
        ))}
    </div>



  

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
  getTopPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getTopPosts })(
  Dashboard
);
