import { createContext, useContext, useState } from "react";
import service from "../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context;
}

const UserProvider = ({ children }) => {
    const initialValue = {
        token: '',
        username: '',
        email: '',
        isLoggedIn: false,
        fullName: '',
        profilePicture: '',
        userMessage: '',
        bioText: '',
        linkGroups: [],
    }

    const [user, setUser] = useState(initialValue)
    const navigate = useNavigate()

    const login = (username, password) => {
        service.post('/auth/login', {
            username: username,
            password: password
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username', username)
                setUser({
                    isLoggedIn: true,
                    token: res.data.token,
                })
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log("err", err);
                toast.error("Username or password is wrong")
            })
    }


    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setUser(initialValue)
    }

    const getUser = () => {
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('token')
        if (!username || !token) {
            navigate('/login')
        }
        return service.get(`/user/${username}`).then((res) => {
                setUser({
                    ...user,
                    ...res.data,
                    isLoggedIn: true,
                })
            }).catch((err) => {
                console.log("err", err);
            })
    }

    return <UserContext.Provider value={{ user, setUser, login, getUser, logout }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider, useUserContext }