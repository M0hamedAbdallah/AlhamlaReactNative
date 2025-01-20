import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllStates: query({
            query: () => ({
                url: "/state/getAllStates",
            })
        }),
        addState: mutation({
            query: (credentials) => ({
                url: "/state/createState",
                method: "POST",
                body: { ...credentials }
            })
        }),
        updateState: mutation({
            query: ({ credentials, id }) => ({
                url: "/state/updateStateById/" + id,
                method: "PUT",
                
                body: { ...credentials }
            }),
        }),
        deleteState: mutation({
            query: (id: string) => ({
                url: "/state/deleteStateById/" + id,
                method: "DELETE",
            }),
        })
    }),
})


export const { useGetAllStatesQuery, useAddStateMutation, useUpdateStateMutation, useDeleteStateMutation } = apiAuthSlice;