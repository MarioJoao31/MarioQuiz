import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import DashboardActions from "../dashboard/DashboardActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import TopPosts from "./TopPosts";
import TopQuizes from "./TopQuizes";
import { getTopPosts } from "../../actions/post";
import { getTopQuizes } from "../../actions/quiz";

const Dashboard = ({
  getTopPosts,
  post: { posts },
  getTopQuizes,
  quiz: { quizes },
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getTopQuizes();
  }, [getTopQuizes]);

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
      <h1 className="large text-primary">Menu principal</h1>
      <p className="lead">
        <i className="fas fa-user"> Bem vindo {user && user.name}</i>
      </p>

      <h1>Top 3 perguntas com mais likes!</h1>
      <div className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-1">
        {posts.map((post) => (
          <TopPosts key={post._id} post={post} />
        ))}
      </div>

      <h1>Top 10 Quiz com mais Interações!</h1>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h3 className="text-xs text-red-500 tracking-widest font-medium title-font ">
              Atenção
            </h3>
            <h1 className="sm:text-3xl text-2xl font-medium title-font font-bold mb-4 text-gray-900">
              Respeita e cresce
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Estes quizes foram feito por pessoas da comunidade, por isso não leves a mal se não vires tudo 
              como tu achares que deve estar! Faz o máximo de quizes para aumentares a tua cultura.
            </p>
          </div>
        </div>

        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap">
            {quizes.map((quiz) => (
              <TopQuizes key={quiz._id} quiz={quiz} showActions={true} />
            ))}
          </div>
        </div>
      </section>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />

          <div className="my-1">
            <button
              className="btn btn-danger dash-buttons"
              onClick={() => deleteAccount()}
            >
              <i className="fas fa-user-minus" /> Eliminar a minha conta
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Ainda não tens perfil, adiciona as tuas informaçoes aqui</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
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

  getTopQuizes: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,

  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getTopPosts,
  getTopQuizes,
})(Dashboard);
