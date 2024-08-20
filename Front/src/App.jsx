import { Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { Login } from "./Components/Login"
import { Signup } from "./Components/Signup"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"
import "./App.css"
import { Dashboard } from "./Components/Dashboard"
import { Viewproj } from "./Components/Viewproj"

function App() {

  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login/> } />
          <Route path="/signup" element={<Signup/> } />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/viewproject/:id"  element={<Viewproj/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
