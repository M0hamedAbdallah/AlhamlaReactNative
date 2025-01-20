import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: "https://alhamla-backend.vercel.app",
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState()?.auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers
    }
})

const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Auth', 'Category', 'Product', 'Governorates', 'State', 'Rate', 'Company', 'ProductCheck'],
    endpoints: ({ query, mutation }) => ({
        
    })
})

export default apiSlice