import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "./components/pages/MainPage"
import BalancePage from "./components/pages/BalancePage"

import CategoriesPage from "./components/pages/CategoriesPage"
    import CategoriesExpenses from "./components/blocks/CategoriesExpenses";
    import CategoriesIncome from "./components/blocks/CategoriesIncome";

import OperationsPage from "./components/pages/OperationsPage"
import AnalyticsPage from "./components/pages/AnalyticsPage";


const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: "/", name: "main", component: MainPage},
        { path: "/balance", component: BalancePage},
        { path: "/categories", component: CategoriesPage,
            children: [
                { path: "expenses", component: CategoriesExpenses },
                { path: "income", component: CategoriesIncome },
            ]
        },
        { path: "/operations", component: OperationsPage},
        { path: "/analytics", component: AnalyticsPage},
    ]
})

export default router;

