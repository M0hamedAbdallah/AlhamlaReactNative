import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllRates: query({
            query: () => ({
                url: "/rate/getAllRatings",
            })
        }),
        getAllRatesByProduct: query({
            query: ({ id, page, limit }) => ({
                url: `/rate/getAllRatings/${id}`,
                params: { page, limit }
            }),
            providesTags: ["Rate"]
        }),
        addRate: mutation({
            query: (credentials) => ({
                url: "/rate/createRating",
                method: "POST",
                body: { ...credentials }
            }),
            invalidatesTags: ["Rate", "Product"]
        }),
        updateRate: mutation({
            query: ({ credentials, id }) => ({
                url: "/rate/updateRating/" + id,
                method: "PUT",
                body: { ...credentials }
            }),
            invalidatesTags: ["Rate", "Product"]
        }),
        deleteRate: mutation({
            query: (id: string) => ({
                url: "/rate/deleteRating/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Rate", "Product"]
        })
    }),
})


export const {
    useGetAllRatesQuery,
    useGetAllRatesByProductQuery,
    useAddRateMutation,
    useUpdateRateMutation,
    useDeleteRateMutation
} = apiAuthSlice;