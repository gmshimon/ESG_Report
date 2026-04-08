import axiosSecure from "@/lib/Axios/axiosSecure";
import type { CreateESGInput } from "./emission.types";

export const createESGRequest = async(data:CreateESGInput) =>{
    const response = await axiosSecure.post('esg-reports/create', data)
    return response.data.data
}

export const fetchESGReportsRequest = async() =>{
    const response = await axiosSecure.get('esg-reports')
    return response.data.data
}