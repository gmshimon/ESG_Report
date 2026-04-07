import axiosSecure from "@/lib/Axios/axiosSecure";
import type { LoginInfo, SignupInfo } from "./auth.types";
import api from '../../Axios/axios'

export const signupRequest = async (data: SignupInfo) =>{
    const response = await api.post('/auth/signup', data)
    return response.data.data
}

export const loginRequest = async (data: LoginInfo) =>{
    const response = await api.post('/auth/login', data)
    return response.data.data
}

export const fetchRequest = async()=>{
    const response = await axiosSecure.get('/auth/me')
    return response.data.data
}