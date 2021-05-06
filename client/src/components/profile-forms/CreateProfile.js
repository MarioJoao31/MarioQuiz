import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createProfile } from "../../actions/profile";


const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    status: "",
    location: "",
    bio: "",
    company: "",
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: "",
    skills: "",
    website: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    status,
    location,
    bio,
    company,
    youtube,
    twitter,
    facebook,
    instagram,
    skills,
    website,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Cria o teu perfil </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Escreve sobre ti e sobre o que gostas
      </p>
      <small>* = Campos Obrigatorios</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <select name='status' value={status} onChange={onChange}>
            <option value='0'>* Seleciona o teu estatuto</option>
            <option value='Professor'>Professor</option>
            <option value='Aluno'>Aluno</option>
            <option value='Animal'>Animal</option>
            <option value='GenderLess'>GenderLess</option>
          </select>
          <small className='form-text'>Em que ano estas?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Empresa'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Trabalhas para alguma empresa?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            O vosso proprio website ou um website favorito
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Localização'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Cidade ou Freguesia (ex: Braga, )
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Habilidades'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Por favor user virgulas para separar as vossas habilidades
            (Futebol ,matemática ,história...)
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          />
          <small className='form-text'>Fala algo sobre ti!</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Adiciona as tuas redes socias
          </button>
          <span>Opcional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          voltar atrás
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
