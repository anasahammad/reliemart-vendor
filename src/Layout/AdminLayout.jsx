import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector ,useDispatch } from "react-redux";

import { RxCross2 } from "react-icons/rx";


import AdminSiteNavBar from "../AdminDashboard/AdminDashboard/common/AdminSidebar";
import AdminDashboardHeader from "../AdminDashboard/AdminDashboard/common/AdminHeader";
import { logout } from "../store/actions/userLogout";
import { toast } from "react-toastify";




const AdminLayout = () => {

  const router = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const userId = userState?.userInfo?.data?.user?._id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

const [expanded, setExpanded] = useState(null); // For dropdown toggles

const toggleExpand = (index) => {
  setExpanded(expanded === index ? null : index);
};



const location = useLocation()
// Ensure hooks are not conditionally used
useEffect(() => {
  const checkAdminStatus = async () => {
    try {
      if (userState?.userInfo?.user && userState?.userInfo?.user?.role === "vendor" ) {
        setIsAdmin(true);
      } else {
        navigate("/");
        toast.error("You are not allowed to access the admin panel.");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
      toast.error("Failed to check admin status.");
    } finally {
      setLoading(false);
    }
  };

  checkAdminStatus();
}, [userState, navigate]);

const logoutHandler = () => {
  dispatch(logout());
  navigate("/");
};


  const handleMouseEnter = () => {
    setIsHovered(true);
};

const handleMouseLeave = () => {
    if (!isManual) {
        setIsHovered(false);
    }
};

const toggleHover = () => {
    setIsManual(prev => !prev);
    if (!isManual) {
        setIsHovered(true);
    } else {
        setIsHovered(false);
    }
};

const toggleMobileSidebar = () => {
    setIsMobileOpen(prev => !prev);
};

const handleLinkClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const [isSmallScreen, setIsSmallScreen] = useState(false);
const [callNav, setCallNav] = useState(false);

// Toggle sidebar
const handleCallNav = (data) => {
  setCallNav(data);
};
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check the screen size initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       <h3 className="text-2xl text-slate-700">Loading...</h3>
  //     </div>
  //   );
  // }

  // if (!isAdmin) {
  //   return null;
  // }


  return (
    <>

<div className="bg-gray-100 shadow-md relative w-full flex h-screen">
      <div
        className={`w-full ${
          callNav ? "left-0" : "-left-[100%]"
        } absolute md:static z-[999999999] min-w-[260px] sm:max-w-[275px] border-0 sm:border-r bg-white min-h-screen overflow-y-auto`}
      >
        <span
          onClick={() => handleCallNav(false)}
          className="p-1 block md:hidden cursor-pointer rounded-md absolute top-2 right-2 border"
        >
          <RxCross2 />
        </span>
        <AdminSiteNavBar logoutHandler={logoutHandler} handleCallNav={handleCallNav} />
      </div>
      <div className="w-full flex flex-col">
        <AdminDashboardHeader handleCallNav={handleCallNav} />
        <div className="w-full h-[calc(100vh-90px)] overflow-y-auto p-3">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>


    </>

  );
};

export default AdminLayout;