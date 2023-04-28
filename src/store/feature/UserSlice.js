import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    token: '',
    avatar: '',
    address: '',
    role: '',
    refId: ''
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = { ...action.payload };
        },

        setUserLogin: (state, action) => {
            if (action.payload.result && action.payload.result.user) {
                const { user, accessToken, refId } = action.payload.result;
                state.id = user._id;
                state.fullName = user.firstName + ' ' + user.lastName;
                state.firstName = user.firstName;
                state.lastName = user.lastName;
                state.token = accessToken;
                state.avatar = user.avatar;
                state.address = user.address;
                state.role = user.role;
                state.refId = refId;
            }
        },

        setToken: (state, action) => {
            state.token = action.payload.newAccessToken;
        },

        resetUserState: (state) => initialState

    }
});

// Action creators are generated for each case reducer function
export const { setUser, setUserLogin, setToken, resetUserState } = UserSlice.actions;

export default UserSlice.reducer;
