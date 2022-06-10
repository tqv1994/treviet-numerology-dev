import Login from './views/public/login.svelte'
import PublicIndex from './views/public/index.svelte'
import PublicLayout from './views/public/layout.svelte'
import Lock from "./views/public/lock.svelte";
import Register from "./views/public/register.svelte";
import Pricing from "./views/public/pricing.svelte";
import ResetPassword from "./views/public/resetPassword.svelte";
import LostPassword from "./views/public/lostPassword.svelte";
import Policy from "./views/public/policy.svelte";

// Dashboard Agent
import ListReport from "./views/Dashboard/DashboardAgent/ListReport.svelte";
import CreateReport from "./views/Dashboard/DashboardAgent/CreateReport.svelte";
import TransferReport from "./views/Dashboard/DashboardAgent/TransferReport.svelte";
import UserAgent from "./views/Dashboard/DashboardAgent/UserAgent.svelte";
import MapPublishing from "./views/Dashboard/DashBoardAgent/MapPublishing.svelte";
import MapTransactionHistory from "./views/Dashboard/DashBoardAgent/MapTransactionHistory.svelte";
import CaseSystem from "./views/Dashboard/DashBoardAgent/CaseSystem.svelte";
import Settings from "./views/Dashboard/DashBoardAgent/Settings.svelte";
import Supports from "./views/Dashboard/DashBoardAgent/Supports.svelte";

//Dashboard Admin
import DashboardAdmin from "./views/Dashboard/DashboardAdmin/Dashboard.svelte";
import AdminListReport from "./views/Dashboard/DashboardAdmin/ListReport.svelte";
import AdminListAgent from "./views/Dashboard/DashboardAdmin/ListAgent.svelte";
import AdminMapTransactionHistory from "./views/Dashboard/DashboardAdmin/MapTransactionHistory.svelte";

// Category
import ListCategories from "./views/Dashboard/Admin/Categories/List.svelte"; 
import UpdateCategory from "./views/Dashboard/Admin/Categories/Update.svelte";
import CreateCategory from "./views/Dashboard/Admin/Categories/Create.svelte";

// Category Number
import ListCategoryNumber from "./views/Dashboard/Admin/CategoryNumbers/List.svelte"; 
import UpdateCategoryNumber from "./views/Dashboard/Admin/CategoryNumbers/Update.svelte";
import CreateCategoryNumber from "./views/Dashboard/Admin/CategoryNumbers/Create.svelte";

// Dashboard
import DashboardLayout from "./views/Dashboard/layout.svelte";
import DashboardIndex from "./views/Dashboard/index.svelte";

//404 page
import NotFoundPage from "./views/Dashboard/NotFoundPage.svelte";
const routes = [{
        name: '/',
        component: PublicLayout,
        nestedRoutes: [
            { name: 'index', component: PublicIndex }
        ]
    },
    { name: 'login', component: Login, layout: PublicLayout },
    { name: 'lock', component: Lock, layout: PublicLayout },
    { name: 'register', component: Register, layout: PublicLayout },
    { name: 'pricing', component: Pricing, layout: PublicLayout },
    { name: 'lost-password', component: LostPassword, layout: PublicLayout },
    { name: 'reset-password', component: ResetPassword, layout: PublicLayout },
    { name: 'policy', component: Policy, layout: PublicLayout },
    { name: '404', path: '404', component: NotFoundPage, layout: PublicLayout },
    // Agent
    {
        name: 'agent',
        component: DashboardLayout,
        nestedRoutes: [
            // Agent
            { name: 'index', component: DashboardIndex },
            { name: 'list-reports', component: ListReport },
            { name: 'create-reports', component: CreateReport },
            { name: 'transfer-reports', component: TransferReport },
            { name: 'user', component: UserAgent },
            { name: 'map-publishing-page', component: MapPublishing },
            { name: 'map-transaction-history', component: MapTransactionHistory },
            { name: 'case-system', component: CaseSystem },
            { name: 'settings', component: Settings },
            { name: 'supports', component: Supports },
        ]
    },

    {
        name: 'admin',
        component: DashboardLayout,
        nestedRoutes: [
            // Admin
            { name: 'index', component: DashboardAdmin },
            { name: 'list-report', component: AdminListReport },
            { name: 'list-agent', component: AdminListAgent },
            { name: 'map-transaction-history', component: AdminMapTransactionHistory },
            
            // Category
            { name: 'categories', component: ListCategories },
            { name: 'categories/update/:id', component: UpdateCategory },
            { name: 'categories/create', component: CreateCategory },

            // Category Number
            { name: 'category-numbers', component: ListCategoryNumber },
            { name: 'category-numbers/update/:id', component: UpdateCategoryNumber },
            { name: 'category-numbers/create', component: CreateCategoryNumber }
        ]
    }
]

export { routes }
