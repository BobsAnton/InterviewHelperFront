import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/models/userType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';

interface UserState {
	username: string;
	email: string;
	status: Status;
	error: Error;
};

const initialState: UserState = {
	username: '',
	email: '',
	status: 'idle',
	error: null
};

export const signIn = createAsyncThunk('auth/signIn', async (user: User) => {
	return (await fetch('http://localhost:8081/auth/signin', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(user)
	})).json();
});

export const signUp = createAsyncThunk('auth/signUp', async (user: User) => {
	return (await fetch('http://localhost:8081/auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/json;charset=utf-8'
		},
		body: JSON.stringify(user)
	})).json();
});

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		parseToken: (state, action) => {
			var decoded: any = jwt_decode(action.payload);
			state.email = decoded.email;
			state.username = decoded.username;
        }
	},
	extraReducers(builder) {
		builder
			.addCase(signIn.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(signIn.fulfilled, (state, action) => {
				if (action.payload.message && action.payload.message.includes("Authentication failed")) {
					state.error = action.payload.message;
					state.status = 'failed';
				}
				else {
					state.error = null;
					state.status = 'succeeded';
					var decoded: any = jwt_decode(action.payload.token);
					state.email = decoded.email;
					state.username = decoded.username;
					localStorage.setItem("token", action.payload.token);
				}
			})
			.addCase(signIn.rejected, (state, action) => {
				state.error = action.error.message as string;
				state.status = 'failed';
			})
			.addCase(signUp.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'succeeded';
				var decoded: any = jwt_decode(action.payload.token);
				state.email = decoded.email;
				state.username = decoded.username;
				localStorage.setItem("token", action.payload.token);
			})
			.addCase(signUp.rejected, (state, action) => {
				state.error = action.error.message as string;
				state.status = 'failed';
			});
	}
});

export const selectCurrentEmail = (state: RootState) => state.auth.email;

export const { parseToken } = authSlice.actions;
export default authSlice.reducer;