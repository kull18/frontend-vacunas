import { useEffect, useState } from "react";
import { GetUserUseCase } from "../../Application/GetUserUseCase";
import type { User } from "../../Domain/User";

interface PropsGetUser {
    users: User[];
    loading: boolean;
    error: unknown|null;
}

export const useGetUser = ():PropsGetUser =>{
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown|null>(null)

    useEffect(() =>{
        setLoading(true)
        const fetchUser = async () =>{
            try{
                const uc = new GetUserUseCase()

                const data = await uc.execute()
                setUsers(data)
            }catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    },[])

    return{
        users,
        loading,
        error
    }
}