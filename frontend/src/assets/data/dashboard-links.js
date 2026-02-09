import { account_type } from "../../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: account_type.Instructor,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: account_type.Instructor,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: account_type.Instructor,
    icon: "VscAdd",
  },
  {
     id: 8,
    name: "Wishlist",
    path: "/dashboard/cart",
    type: account_type.Student,
    icon: "VscBookmark",
    
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: account_type.Student,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: account_type.Student,
    icon: "VscHistory",
  },
  {
   id: 7,
    name: "Courses",
    path: "/dashboard/allcourses",
    type: account_type.Student,
    icon: "VscMortarBoard",
  }
];
