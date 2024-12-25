
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRouter.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import Header from './component/Header/Header.jsx'
import Home from './pages/Home.jsx'
import ProfilePage from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Signup.jsx'
import DonatePage from './pages/Donat.jsx'
import CommonPage from './pages/CommonPage.jsx'
import Transactions from './pages/TransactionPage.jsx'
import FAQ from './pages/Faq.jsx'
import LearningModule from './pages/LearningModule.jsx'
import RewardSystem from './pages/Reward.jsx'
import FeedbackForm from './pages/Feedback.jsx'


function App() {

  return (
    <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/CommonPage" element={<CommonPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/donate" element={<DonatePage/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/reward" element={<RewardSystem/>}/>
            <Route path="/learningModule" element={<LearningModule/>}/>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home/>}/>
              <Route path="/feedback" element={<FeedbackForm/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/transaction"element={<Transactions/>}/>
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
  )
}

export default App