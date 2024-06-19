import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode:"light",//dark-light
    user:null,
    token:null,
    posts:[],
};

export const authSlice = createSlice({
    name:"auth",
    initialState,//passing all the initial states into authslice
    reducers:{//change the initialslice
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setFriends:(state,action)=>{
            if(state.user){//if user already exists
                state.user.friends = action.payload.friends;
            }else{
                console.error("User friends non-existent :(")
            }
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post_id) return action.payload.posts; //if backend ki post._id se match hua hamara sent post_id then return that relevent post
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;