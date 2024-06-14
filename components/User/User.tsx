'use client'
import Posts from "@/components/User/Posts";
import UserDetails from "@/components/User/UserDetails";

const User = () =>  (
    <div className="flex flex-col gap-8 mt-10">
        <UserDetails   />
        <Posts />
    </div>
)

export default User