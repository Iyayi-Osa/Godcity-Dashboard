// hooks/useRoutes.js
import { useAuth } from "context/AuthContext";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  DocumentIcon,
  PersonIcon,
} from "components/Icons/Icons";
import Dashboard from "views/Dashboard/Dashboard";
import Membership from "views/Dashboard/Members";
import Transaction from "views/Dashboard/Billing";
import Sermons from "views/Dashboard/Resources";
import Events from "views/Dashboard/Events";
import Requests from "views/Dashboard/Requests";
import Home from "views/Home/Home";
import Profile from "views/Dashboard/Profile";

const useRoutes = () => {
  const { isAdmin } = useAuth();

  const adminRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <HomeIcon color="inherit" />,
        component: Dashboard,
        layout: "/admin",
    },
    {
        path: "/members",
        name: "Members",
        icon: <StatsIcon color="inherit" />,
        component: Membership,
        layout: "/admin",
    },
    {
        path: "/transactions",
        name: "Transactions",
        icon: <CreditIcon color="inherit" />,
        component: Transaction,
        layout: "/admin",
    },
    {
        path: "/sermons",
        name: "Sermons",
        icon: <DocumentIcon color="inherit" />,
        component: Sermons,
        layout: "/admin",
    },
    {
        path: "/events",
        name: "Events",
        icon: <CreditIcon color="inherit" />,
        component: Events,
        layout: "/admin",
    },
    {
        path: "/requests",
        name: "Requests",
        icon: <CreditIcon color="inherit" />,
        component: Requests,
        layout: "/admin",
    },
    {
        name: "Account Management",
        category: "account",
        rtlName: "Pages",
        state: "pageCollapse",
        views: [
            {
                path: "/profile",
                name: "Profile",

                icon: <PersonIcon color="inherit" />,
                secondaryNavbar: true,
                component: Profile,
                layout: "/admin",
            },
        ],
    },
    {
        path: "/",
        name: "Home",
        icon: <HomeIcon color="inherit" />,
        component: Home,
        layout: "",
    },
];

const userRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <HomeIcon color="inherit" />,
        component: Dashboard,
        layout: "/admin",
    },
    {
        path: "/sermons",
        name: "Sermons",
        icon: <DocumentIcon color="inherit" />,
        component: Sermons,
        layout: "/admin",
    },
    {
        path: "/events",
        name: "Events",
        icon: <CreditIcon color="inherit" />,
        component: Events,
        layout: "/admin",
    },
    {
        path: "/requests",
        name: "Requests",
        icon: <CreditIcon color="inherit" />,
        component: Requests,
        layout: "/admin",
    },
    {
        name: "Account Management",
        category: "account",
        rtlName: "Pages",
        state: "pageCollapse",
        views: [
            {
                path: "/profile",
                name: "Profile",

                icon: <PersonIcon color="inherit" />,
                secondaryNavbar: true,
                component: Profile,
                layout: "/admin",
            },
        ],
    },
    {
        path: "/",
        name: "Home",
        icon: <HomeIcon color="inherit" />,
        component: Home,
        layout: "",
    },
];

  return isAdmin ? adminRoutes : userRoutes;
};

export default useRoutes;
