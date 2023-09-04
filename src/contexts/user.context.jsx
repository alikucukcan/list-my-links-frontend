import { createContext, useContext, useEffect, useState } from "react";
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

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token')
        return {
            headers: {
                Authorization: `${token}`
            }
        }
    }

    const updateUser = (data) => {

        let modifiedData = data;
        delete modifiedData.username;
        delete modifiedData.email;
        delete modifiedData.token;
        delete modifiedData.isLoggedIn;
        delete modifiedData.password
        delete modifiedData.profilePicture


        modifiedData.linkGroups = modifiedData.linkGroups.map((linkGroup) => {
            return {
                ...linkGroup,
                _id: undefined,
                links: linkGroup.links.map((link) => {
                    return {
                        ...link,
                        _id: undefined
                    }
                })
            }
        })

        return service.post(`/user/update`, data, {
            ...getAuthHeaders()

        }).then((res) => {
            setUser({
                ...user,
                ...res.data,
            })
            toast.success("Update success")
        }).catch((err) => {
            toast.error("Update failed")
            console.log("err update", err);
        })
    }

    const getProfile = (username) => {
        return service.get(`/user/${username}`)
    }

    return <UserContext.Provider value={{ user, setUser, login, getUser, logout, updateUser, getProfile }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider, useUserContext }