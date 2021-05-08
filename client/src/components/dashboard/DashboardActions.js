import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edita o teu perfil
      </Link>
    </div>
  );
};
export default DashboardActions;
