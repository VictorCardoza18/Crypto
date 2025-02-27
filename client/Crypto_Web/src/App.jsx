import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage, RegisterPage, PracticaCeroPage } from './pages'
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
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutes />}>
              {/* Practica_Cero_Corrimiento */}
              <Route path="/PracticaCero: Corrimiento" element={<PracticaCeroPage />} />

            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
