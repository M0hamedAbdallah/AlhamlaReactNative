import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllCategory: query({
            query: () => ({
                url: "/category/getAllCategories",
            })
        })
    }),
})


export const { useGetAllCategoryQuery } = apiAuthSlice;