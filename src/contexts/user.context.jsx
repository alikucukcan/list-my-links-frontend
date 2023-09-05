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
        delete modifiedData._id
        delete modifiedData.__v

        if (modifiedData?.linkGroups) modifiedData.linkGroups = modifiedData.linkGroups.map((linkGroup) => {
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
            return getUser()
        }).then(() => {
            toast.success("Update success")
        }).catch((err) => {
            toast.error("Update failed")
            console.log("err update", err);
        })
    }

    const getProfile = (username) => {
        return service.get(`/user/${username}`)
    }

    const forgotPassword = (email) => {
        // /auth/forgot-password
        return service.post(`/auth/forgot-password`, {
            email: email
        })
    }

    const resetPassword = (email, code, password) => {
        // /auth/forgot-password
        return service.post(`/auth/reset-password`, {
            email: email,
            code: code,
            password: password
        })
    }


    const deleteAccount = () => {
        return service.delete(`/user/me`, {
            ...getAuthHeaders()
        }).then(() => {
            toast.success("Account deleted")
            logout()
            navigate('/')
        }).catch((err) => {
            toast.error("Account deletion failed")
            console.log("err", err);
        })
    }

    const updatePassword = (newPassword) => {
        return service.post(`/user/update`, {
            password: newPassword,
        }, {
            ...getAuthHeaders()
        }).then(() => {
            toast.success("Password updated")
            logout()
            navigate('/login')
        }).catch((err) => {
            toast.error("Password update failed")
            console.log("err", err);
        })

    }


    const updateProfilePicture = (file) => {
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('profilePicture', file)

        return service.post(`/user/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`
            }
        }).then(() => {
            toast.success("Profile picture updated")
            return getUser()
        }).catch((err) => {
            toast.error("Profile picture update failed")
            console.log("err", err);
            getUser()
        })

    }

    return <UserContext.Provider value={{ user, setUser, login, getUser, logout, updateUser, getProfile, forgotPassword, resetPassword, deleteAccount, updatePassword, updateProfilePicture }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider, useUserContext }