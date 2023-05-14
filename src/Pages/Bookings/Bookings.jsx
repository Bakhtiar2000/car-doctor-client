import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";


const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const navigate= useNavigate()

    const url = `https://car-doctor-server-main-one.vercel.app/bookings?email=${user?.email}`

    useEffect(() => {
        fetch(url,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-doctor-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else navigate('/')
            })
    }, [url, navigate])

    const handleDelete= id=>{
        const proceed= confirm('Are you sure to delete?')
        if(proceed){
            fetch(`https://car-doctor-server-main-one.vercel.app/bookings/${id}`,{
                method: "DELETE"
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data)
                if(data.deletedCount> 0){
                    const remaining= bookings.filter(booking=> booking._id !== id)
                    setBookings(remaining)
                }
            })
        }
    }

    const handleBookingConfirm= id=>{
        console.log(id)
        fetch(`https://car-doctor-server-main-one.vercel.app/bookings/${id}`,{
                method: "PATCH",
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify({status: "confirm"})
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data)
                if(data.modifiedCount> 0){
                    const remaining= bookings.filter(booking=> booking._id !== id);
                    const updated= bookings.find(booking=> booking._id === id);
                    updated.status= 'confirm'
                    const newBookings= [updated, ...remaining]
                    setBookings(newBookings)
                    alert('updated successfully')
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl text-center text-primary my-10">Your bookings: {bookings.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking=> <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;