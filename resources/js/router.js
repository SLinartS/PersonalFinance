import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "./components/pages/MainPage"
import BalancePage from "./components/pages/BalancePage"

import CategoriesPage from "./components/pages/CategoriesPage"
    import CategoriesExpenses from "./components/blocks/CategoriesExpenses";
    import CategoriesIncome from "./components/blocks/CategoriesIncome";

import HistoryPage from "./components/pages/HistoryPage"
import AnalyticsPage from "./components/pages/AnalyticsPage";
import BudgetPage from "./components/pages/BudgetPage";




const router = createRouter( {
    history: createWebHistory(),
    routes: [
        { path: "/", component: MainPage},
        { path: "/balance", component: BalancePage},
        { path: "/categories", component: CategoriesPage,
            children: [
                { path: "expenses", component: CategoriesExpenses },
                { path: "income", component: CategoriesIncome },
            ]
        },
        { path: "/history", component: HistoryPage},
        { path: "/analytics", component: AnalyticsPage},
        { path: "/budget", component: BudgetPage},
    ]
})

export default router;

