import apiSlice from "../api/apiSlice";

export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        Login: mutation({
            query: (credentials) => ({
                url: "/api/v1/user/login",
                method: "POST",
                body: { ...credentials }
            })
        })
    }),
})


export const { useLoginMutation } = apiAuthSlice;