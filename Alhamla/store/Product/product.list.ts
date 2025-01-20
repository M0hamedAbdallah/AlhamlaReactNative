import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllProductChecks: query({
            query: ({ page, limit }) => ({
                url: `/productCheck/getAllProductCheck`,
                params: { page, limit },
            })
        }),
        addProductCheck: mutation({
            query: (credentials) => ({
                url: "/productCheck/createProductCheck",
                method: "POST",
                body: { ...credentials }
            })
        }),
        updateProductCheck: mutation({
            query: ({ credentials, id }) => ({
                url: "/productCheck/updateProductCheck/" + id,
                method: "PUT",
                body: { ...credentials }
            })
        }),
        deleteProductCheck: mutation({
            query: (id) => ({
                url: "/productCheck/deleteProductCheck/" + id,
                method: "DELETE",
            })
        })
    }),
});

export const {
    useGetAllProductChecksQuery,
    useAddProductCheckMutation,
    useUpdateProductCheckMutation,
    useDeleteProductCheckMutation,
} = apiAuthSlice;
