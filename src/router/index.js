import Vue from 'vue'

import Router from 'vue-router'
import auth from '@/auth'

// Pages
import LoginPage from '@/pages/Login'
import SavedJobsPage from '@/pages/Saved'
import HomePage from '@/pages/Home'
import ErrorPage from '@/pages/Error'
import ProfilePage from '@/pages/Profile'
import ExploreChildhoodPage from '@/pages/Explore-Childhood'
import ExploreNowPage from '@/pages/Explore-Now'
import DetailsPage1 from '@/pages/details_1'
import DetailsPage2 from '@/pages/details_2'

Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active', // active class for non-exact links.
    linkExactActiveClass: 'active', // active class for *exact* links.
    routes: [{
            path: '/',
            component: HomePage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            name: 'saved-jobs',
            path: '/saved',
            component: SavedJobsPage
        },
        {
            name: 'explore-childhood',
            path: '/explore-childhood',
            component: ExploreChildhoodPage
        },
        {
            name: 'explore-now',
            path: '/explore-now',
            component: ExploreNowPage

        },
        {
            name: 'details1',
            path: '/details/sports',
            component: DetailsPage1

        },
        {
            name: 'details2',
            path: '/details/nature',
            component: DetailsPage2

        },
        {
            name: 'profile',
            path: '/profile',
            component: ProfilePage
        },
        {
            path: '*',
            component: ErrorPage
        }
    ]
})

router.beforeEach(function(to, from, next) {
    if (to.meta) {
        if (to.meta.requiresLogin) {
            if (!auth.isSignedIn()) {
                router.push({
                    name: 'login'
                })
                router.app.addNotification('Für diese Aktion musst du dich einloggen!', 'error')

                return;
            }
        }
        if (to.meta.ifLoginRedirectTo) {
            if (auth.isSignedIn()) {
                console.log('REDIRECT TO ' + to.meta.ifLoginRedirectTo)
                router.push({
                    path: to.meta.ifLoginRedirectTo
                })
                return;
            }
        }


        if (to.meta.bottomMenuIndex !== undefined && from.meta.bottomMenuIndex !== undefined) {
            router.app.$root.transitionName = to.meta.bottomMenuIndex < from.meta.bottomMenuIndex ? 'page-right' : 'page-left'
        }
        else {
            router.app.$root.transitionName = 'page-right'
        }
    }

    if (typeof router.app.setPageHeader === 'function') {
        router.app.setPageHeader(to.meta.pageHeader || 'working title')
    }

    next()
})

export default router
