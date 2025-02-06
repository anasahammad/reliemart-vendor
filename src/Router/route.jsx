import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import AdminLayout from "../Layout/AdminLayout";
import AdminReferrals from "../AdminDashboard/AdminDashboard/common/AdminReferrals";
import AdminUpdate from "../AdminDashboard/AdminDashboard/common/AdminUpdate";
import AdminProductRequest from "../AdminDashboard/AdminDashboard/common/AdminProductRequest";
import AdminOrderTracking from "../AdminDashboard/AdminDashboard/common/AdminOrderTacking";
import AdminDashboard from "../AdminDashboard/AdminDashboard/AdminDashboard";
import AdminProfile from "../AdminDashboard/AdminDashboard/common/AdminDemoPage";
import ResllersList from "../AdminDashboard/AdminDashboard/seller/SellersList";
import AdminResellerTeamRanking from "../AdminDashboard/AdminDashboard/common/TopTeam";
import AdminProductPage from "../AdminDashboard/AdminDashboard/common/AllAdminProduct";
import ProductDetails from "../AdminDashboard/AdminDashboard/common/ProductDetails";
import WithdrawRequestsTable from "../AdminDashboard/AdminDashboard/WithDrawReq";
import ResellerRequestsTable from "../AdminDashboard/AdminDashboard/ResllerReq";
import ResellerAddForm from "../AdminDashboard/AdminDashboard/common/AddReseller";
import AdminBalance from "../AdminDashboard/AdminDashboard/common/AdminBalance";
import AdminWithdrawForm from "../AdminDashboard/AdminDashboard/common/AdminWithdraw";
import AdminCustomerChecker from "../AdminDashboard/AdminDashboard/common/AdminCustomerChecker";
import AdminSettings from "../AdminDashboard/AdminDashboard/common/AdminSetting";
import AdminService from "../AdminDashboard/AdminDashboard/common/AdminServices";
import AdminSupport from "../AdminDashboard/AdminDashboard/common/AdminSupport";
import AdminLogin from "../AdminDashboard/AdminDashboard/common/VendorLogin";
import AdminCategories from "../AdminDashboard/AdminDashboard/common/products/AdminCategories";
import SubcategoryManager from "../AdminDashboard/AdminDashboard/common/products/AdminSubCat";
import BrandManager from "../AdminDashboard/AdminDashboard/common/products/AdminBrands";
import CreateUpdateProduct from "../AdminDashboard/AdminDashboard/common/products/ProductManager";
import ResellerOrders from "../AdminDashboard/AdminDashboard/seller/ResellerOrders";
import SellerOrderDetailsPage from "../AdminDashboard/AdminDashboard/seller/SellerOrderDetailsPage";
import SellerDetails from "../AdminDashboard/AdminDashboard/seller/SellerDetails";
import NoticePage from "../AdminDashboard/NoticePage";
import CustomerList from "../AdminDashboard/AdminDashboard/common/CustomerList";
import CustomerDetails from "../AdminDashboard/AdminDashboard/common/CustomerDetails";
import CustomerOrders from "../AdminDashboard/AdminDashboard/common/CustomerOrders";
import WholesaleRequests from "../AdminDashboard/AdminDashboard/common/WholesaleRequests";
import CustomerSupport from "../AdminDashboard/AdminDashboard/common/Support";
import LoginBanner from "../AdminDashboard/AdminDashboard/common/LoginBanner";
import CustomerBanner from "../AdminDashboard/AdminDashboard/common/CustomerBanner";
import ResellerBanner from "../AdminDashboard/AdminDashboard/common/ResellerBanner";
import TeamManagement from "../AdminDashboard/TeamManagement";
import CustomerOrderDetails from "../AdminDashboard/AdminDashboard/common/CustomerOrderDetails";
import VideosManagement from "../AdminDashboard/VideoManagement";
import WholesaleOrders from "../AdminDashboard/WholesaleOrders";
import CustomerBannerRight from "../AdminDashboard/AdminDashboard/common/CustommerBannerRight";
import InventoryManagement from "../AdminDashboard/AdminDashboard/InventoryManagement";
import CustomerInventory from "../AdminDashboard/AdminDashboard/CustomerInventory";
import VendorAuth from "../AdminDashboard/AdminDashboard/VendorAuth";







  const router = createBrowserRouter([
  
    {
      path: "/",
      element:  <VendorAuth/>,
      // errorElement: <ErrorPage />,
    },

    {
      path: "/product/cat",
      elementL: <AdminCategories></AdminCategories>
    },


    {
      path: "/vendor",
      element: <AdminLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/vendor/dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/vendor/profile",
          element:  <AdminProfile/>,
        },
        // {
        //   path: "/admin/notice",
        //   element:  <NoticePage/>,
        // },
        // {
        //   path: "/admin/team",
        //   element:  <TeamManagement/>,
        // },
        // {
        //   path: "/admin/learning",
        //   element:  <VideosManagement/>,
        // },
        // {
        //   path: "/admin/wholesale-orders",
        //   element:  <WholesaleOrders/>,
        // },
        // {
        //   path: "/admin/product/cat",
        //   element: <AdminCategories></AdminCategories>
        // },
        // {
        //   path: "/admin/product/sub-cat",
        //   element: <SubcategoryManager></SubcategoryManager>
        // },
        // {
        //   path: "/admin/product/brands",
        //   element: <BrandManager></BrandManager>
        // },
        {
          path: "/vendor/product",
          element: <CreateUpdateProduct></CreateUpdateProduct>
        },
   
        
        {
          path: "/vendor/all-product",
          element: <AdminProductPage />,
        },
        {
          path: "/vendor/product-details",
          element: <ProductDetails />,
        },
      
        // {
        //   path: "/vendor/team-ranking",
        //   element: <AdminResellerTeamRanking />

        // },
        // {
        //   path: "/vendor/balance",
        //   element: <AdminBalance/>,
        // },
        // {
        //   path: "/vendor/withdraw",
        //   element:  <AdminWithdrawForm/>,
        //  },
        //     {
        //       path: "/admin/withdraw/req",
        //       element: <WithdrawRequestsTable />,
        //     },
        // {
        //   path: "/admin/resellers",
        //   element: <ResllersList />, // Main Reseller Management page
        // },
        //     {
        //       path: "/admin/resellers/all",
        //       element: <ResllersList />, // All Resellers page
        //     },
        //     {
        //       path: "/admin/resellers/details/:id",
        //       element:  <SellerDetails/>,
        //     },
        //     {
        //       path: "/admin/resellers/orders",
        //       element: <ResellerOrders />, // All Resellers page
        //     },
        //     {
        //       path: "/admin/resellers/requests",
        //       element: <ResellerRequestsTable />, // Reseller Requests page
        //     },
        //     {
        //       path: "/admin/resellers/referrals",
        //       element: <AdminReferrals/>, // Reseller Referrals page
        //     },
        //     {
        //       path: "/admin/resellers/update",
        //       element: <AdminUpdate/>, // Update Reseller page
        //     },
        
        // {
        //       path: "/admin/resellers/add",
        //       element: <ResellerAddForm />, // Add Reseller page
        //     },


            // Customer routes

// {
//   path: "/admin/customer/all",
//   element: <CustomerList />, // All Customers page
// },
// {
//   path: "/admin/customer/details/:id",
//   element: <CustomerDetails />, // Customer Details page
// },
// {
//   path: "/admin/customer/orders",
//   element: <CustomerOrders />, // Customer Orders page
// },
// {
//   path: "/admin/customer/order-details/:orderId",
//   element: <CustomerOrderDetails />, // 
// },
// {
//   path: "/admin/customer/requests",
//   element: <WholesaleRequests />, // Wholesale Requests page
// },
// {
//   path: "/admin/customer/referrals",
//   element: <CustomerSupport />, // Customer Support page
// },



// Photo routes

// {
//   path: "/admin/photo/login",
//   element: <LoginBanner />, // Login Banner page
// },
// {
//   path: "/admin/photo/customer",
//   element: <CustomerBanner />, // Customer Banner page
// },
// {
//   path:"/admin/photo/right",
//   element: <CustomerBannerRight />, // Reseller Banner page
// },
// {
//   path: "/admin/inventory",
//   element: <InventoryManagement/>  
// },
// {
//   path: "/admin/inventory/reseller",
//   element: <InventoryManagement/>
// },
// {
//   path: "/admin/inventory/customer",
//   element: <CustomerInventory />
// },
// {
//   path: "/admin/photo/reseller",
//   element: <ResellerBanner />, // Reseller Banner page
// },




        // {
        //   path: "/admin/order-tracking",
        //   element: <AdminOrderTracking/>,
        // },
        // {
        //   path: "/admin/customer-checker",
        //   element:  <AdminCustomerChecker/>,
        // },
        // {
        //   path: "/admin/product-request",
        //   element:  <AdminProductRequest/>,
        // },
        // {
        //   path: "/admin/seller-review",
        //   element: <AdminProfile />,
        // },
        // {
        //   path: "/admin/settings",
        //   element:  <AdminSettings/>,
        // },
        // {
        //   path: "/admin/service",
        //   element:  <AdminService/>,
        // },
        // {
        //   path: "/admin/support",
        //   element:  <AdminSupport/>,
        // },
        // {
        //   path: "/admin/reseller/order/:id",
        //   element:  <SellerOrderDetailsPage/>,
        // },
       
      ],
    },
  
  ]);


  export default router;
