import React from "react"

const noop = () => {}

export const AuthContext = React.createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
})