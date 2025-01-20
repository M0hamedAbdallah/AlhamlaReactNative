import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllCompany: query({
            query: () => ({
                url: "/company/getCompanies",
            })
        }),
        createCompany: mutation({
            query: (credentials) => ({
                url: "/company/addCompany",
                method: "POST",
                body: { ...credentials }
            })
        }),
        updateCompany: mutation({
            query: ({ credentials, id }) => ({
                url: "/company/updateCompanyById/" + id,
                method: "PUT",
                body: { ...credentials }
            }),
        }),
        deleteCompany: mutation({
            query: (id: string) => ({
                url: "/company/deleteCompany/" + id,
                method: "DELETE",
            }),
        })
    }),
})


export const { useGetAllCompanyQuery , useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation} = apiAuthSlice;