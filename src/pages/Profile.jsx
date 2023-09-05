import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../contexts/user.context'
import { toast } from 'react-toastify'
import themes from '../themes'

export default function ProfilePage() {
    const [state, setState] = React.useState(null)

    const { username } = useParams()
    const userCtx = useUserContext()

    const navigate = useNavigate()

    React.useEffect(() => {
        userCtx.getProfile(username)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }, [])


    return (
        state ?
            <div

                className='w-full min-h-[500px] max-w-[429px] self-center mx-auto rounded-lg gap-8 p-4 my-2 flex flex-col lg:flex-row lg:items-start items-center'>
                <div
                    style={themes[state.theme].style}
                    className="flex flex-col items-center py-10  w-full h-full rounded-xl aspect-[428/926] bg-white">
                    <img className='rounded-full w-[120px] h-[120px]' src={"http://localhost:8080/public/" + state.profilePicture} />
                    <h2 className='text-[30px] mt-6 font-bowlby'> {state.fullName} </h2>
                    {state.bioText && <div className="flex flex-col mt-4  items-center w-full px-12 gap-2">
                        <span className='self-start justify-self-start text-[8px] font-bowlby'> User Biography :</span>
                        <p className='w-full overflow-auto rounded-lg border-dotted border-[8px] box-border min-h-[40px] max-h-[100px] text-[12px] text-start p-2 text-opacity-55 text-black'> {state.bioText} </p>
                    </div>}

                    {state.userMessage && <div className="flex flex-col mt-4  items-center w-full px-12 gap-2">
                        <span className='self-start justify-self-start text-[8px] font-bowlby'> User Message :</span>
                        <p className='w-full text-start overflow-auto rounded-lg border-dotted border-[8px] box-border min-h-[40px] max-h-[100px] text-[12px] p-2 text-opacity-55 text-black'> {state.userMessage} </p>
                    </div>}

                    <h3 className='font-bowlby mt-10 mb-4'> Links </h3>

                    {
                        state.linkGroups?.map((linkGroup, index) => {
                            return <div key={index} className="flex flex-col gap-2 mb-4 items-center border-b-2 pb-4 w-full">
                                <h3 className='font-bold'> {linkGroup.title} </h3>
                                {
                                    linkGroup.links.map((link, index) => {
                                        return <a key={index} className='text-blue-400 hover:underline border rounded-lg px-4 py-2' href={link.url}> {link.title} </a>
                                    })
                                }
                            </div>
                        })
                    }

                </div>
            </div> : <div className='w-full min-h-[500px] bg-quinary rounded-lg gap-8 p-4 my-2 flex flex-col lg:flex-row lg:items-start items-center'>
                <h1 className='text-[40px] text-center text-white font-bowlby'>
                    It can be your profile
                </h1>
                <button className='w-fit px-4 py-1 mt-4 bg-yellow-500 rounded-lg text-black font-bold'
                    onClick={() => {
                        console.log("dada");
                        navigate(`/register?username=${username}`)
                    }}
                > Join Now  </button>
            </div>
    )
}
