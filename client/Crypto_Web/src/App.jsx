import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage, RegisterPage, PracticaCeroPage, ForgotPasswordPage, ResetPasswordPage, HomePage } from './pages'
import { AuthProvider } from './context'
import { NavBarv2 } from './components'
import { ProtectedRoutes } from './ProtectedRoutes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className='container mx-auto'>
          <NavBarv2 />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              {/* Practica_Cero_Corrimiento */}
              <Route path="/PracticaCero:Corrimiento" element={<PracticaCeroPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App