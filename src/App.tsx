import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact'
import AboutMe from './pages/AboutMe'
import './App.css'



function App() {


  return (
    <>
    <Router basename='/Balong_Aptech_Final_Exam'>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path='/aboutme' element={<AboutMe />} />
        <Route path='/contact' element={<Contact />}/>
      </Routes>
    </Router>

    </>
  )
}

export default App



 