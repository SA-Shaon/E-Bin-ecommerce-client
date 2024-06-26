import { Outlet } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/nav/UserMenu";

const UserDashboard = () => {
  // context
  const { auth } = useAuth();
  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle={"user Dashboard"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* <div className="p-3 mt-2 mb-2 h4 bg-light">User Information</div>
            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
            </ul> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
