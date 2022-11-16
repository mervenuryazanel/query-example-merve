import { useQuery } from "react-query"
import axios from "axios"

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fethcCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export default function DependentQueriesPage({ email }) {
    const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email));

    const channelId = user?.data.channelId;

    const { data: coursesData } = useQuery(['courses', channelId], () => fethcCoursesByChannelId(channelId),
        {
            enabled: !!channelId, //only fetch the channel details if the channelId is exist
            //double ! (!!) returns the value to a boolean
        });
    console.log("courses:", coursesData);
    console.log("users", user)
    return (
        <>
            <h2>Dependent Queries Page</h2>
            <h3>{coursesData?.data.id}</h3>
            <>
                <h3 style={{ marginLeft: 20 }}>courses</h3>
                {coursesData?.data.courses.map((course) => {
                    return (
                        <ul>
                            <li>
                                {course}
                            </li>
                        </ul>
                    )
                })}
            </>

        </>
    )
}
