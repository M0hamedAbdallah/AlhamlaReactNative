import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllProducts: query({
            query: ({ page, limit, blocked }) => ({
                url: "/product/getAllProducts",
                params: { page, limit, blocked }
            }),
            providesTags: ["Product"]
        }),
        getOneProduct: query({
            query: (id) => ({
                url: "/product/getProductById/" + id
            }),
            providesTags: ["Product"]
        }),
        addProduct: mutation({
            query: (credentials) => ({
                url: "/product/createProduct",
                method: "POST",
                body: { ...credentials }
            })
        }),
        updateProduct: mutation({
            query: ({ credentials, id }) => ({
                url: "/product/updateProductById/" + id,
                method: "PUT",

                body: { ...credentials }
            }),
        }),
        deleteProduct: mutation({
            query: (id: string) => ({
                url: "/product/deleteProductById/" + id,
                method: "DELETE",
            }),
        })
    }),
})


export const { useGetAllProductsQuery, useGetOneProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = apiAuthSlice;