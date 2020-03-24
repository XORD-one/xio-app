import Dashboard from '../components/Dashboard'
import Stake from '../components/Stake'
import Withdraw from '../components/Withdraw'

export default [
    {
        component: Dashboard,
        path: '/',
        exact: true
    },
    {
        component: Stake,
        path: '/stake',
        exact: true

    },

    {
        component: Withdraw,
        path: '/unstake',
        exact: true

    }
  
  
   
]