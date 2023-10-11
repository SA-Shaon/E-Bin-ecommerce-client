import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  // context
  const { auth } = useAuth();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle={"Admin Dashboard"}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
