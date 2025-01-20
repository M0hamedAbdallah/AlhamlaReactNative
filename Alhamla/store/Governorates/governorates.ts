import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllGoveronorates: query({
            query: () => ({
                url: "/goveronorate/getAllGoveronorates",
            })
        }),
        addGoveronorate: mutation({
            query: (credentials) => ({
                url: "/goveronorate/createGoveronorate",
                method: "POST",
                body: { ...credentials }
            })
        }),
        updateGoveronorate: mutation({
            query: ({ credentials, id }) => ({
                url: "/goveronorate/updateGoveronorate/" + id,
                method: "PUT",

                body: { ...credentials }
            }),
        }),
        deleteGoveronorate: mutation({
            query: (id: string) => ({
                url: "/goveronorate/deleteGoveronorate/" + id,
                method: "DELETE",
            }),
        })
    }),
})


export const {
    useGetAllGoveronoratesQuery,
    useAddGoveronorateMutation,
    useUpdateGoveronorateMutation,
    useDeleteGoveronorateMutation
} = apiAuthSlice;