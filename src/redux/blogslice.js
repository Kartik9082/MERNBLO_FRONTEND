import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    singleBlog: {},
    comments: [],
    searchResults: [],
  },
  reducers: {
    getBlog: (state, action) => {
      state.blog = action.payload;
    },
    getSingleBlog: (state, action) => {
      state.singleBlog = action.payload;
    },
    addComment: (state, action) => {
      state.singleBlog.comments = action.payload;
    },
    searchBlogSuccess: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  getBlog,
  getBlogSuccess,
  getBlogError,
  getSingleBlog,
  addComment,
  searchBlogSuccess,
  clearSearchResults,
} = blogSlice.actions;

export default blogSlice.reducer;
