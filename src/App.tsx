import { Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layouts'
import { Login, Register, ForgotPassword, ResetPassword } from './pages/auth'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}

export default App
