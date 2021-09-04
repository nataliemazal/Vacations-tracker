

import UserModel from "../Models/UserModel"

enum isAdminCheck {
    true = 1,
    false = 0
}
// Auth State:
export class AuthState {
    public user: UserModel | null | undefined;
    public isAdmin: isAdminCheck | null;
    public isLoggedIn: boolean
    public constructor() {
        const storageUser: string | null = localStorage.getItem("user");
        const user = storageUser ? JSON.parse(storageUser) : null;
        if (user) {
            this.user = user;
            this.isAdmin = user.isAdmin
            this.isLoggedIn = true
        }
    }
}


// Auth Action types:
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut",
}

// Auth Action:
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// Auth Action Creators:
export function createUserRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}

export function createUserLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}

export function createUserLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}

// Auth Reducer:
export function authReducer(
    currentState: AuthState = new AuthState(),
    action: AuthAction
): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            newState.isAdmin = action.payload.isAdmin
            localStorage.setItem("user", JSON.stringify(newState.user));
            newState.isLoggedIn = true
           
            
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = undefined;
            localStorage.removeItem("user");
            newState.isLoggedIn = false
            newState.isAdmin = 0
            break;
    }

    return newState;
}