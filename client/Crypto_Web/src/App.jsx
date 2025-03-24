import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage, RegisterPage, PracticaCeroPage,PracticaCifradoAffin } from './pages'
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
<<<<<<< Updated upstream
              <Route path="/PracticaCero: Corrimiento" element={<PracticaCeroPage />} />

=======
              <Route path="/PracticaCero:Corrimiento" element={<PracticaCeroPage />} />
              <Route path="/PracticaCifradoAffin" element={<PracticaCifradoAffin />} />
              
>>>>>>> Stashed changes
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
