import { axiosInstance } from './axios.js'

export const registerRequest = user => axiosInstance.post('/register', user)
export const loginRequest = user => axiosInstance.post('/login', user)
export const verifyTokenRequest = () => axiosInstance.get('/verify-token')
export const forgotPasswordRequest = email => axiosInstance.post('/forgot-password', email)
export const resetPasswordRequest = data => axiosInstance.post('/reset-password', data)