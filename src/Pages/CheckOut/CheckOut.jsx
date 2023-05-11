import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const CheckOut = () => {
    const service = useLoaderData()
    const { _id, title, price, img } = service;
    const {user}= useContext(AuthContext)

    const handleService= event=> {
        event.preventDefault()
        const form= event.target
        const name= form.name.value;
        const date= form.date.value;
        const email= form.email.value;
        const booking={
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price
        }
        console.log(booking)

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            if(data.insertedId){
                alert('Booking successful')
            }
        })
    }

    return (
        <div className="my-8 p-4">
            <h2 className="text-center text-3xl">Service: {title}</h2>

            <form onSubmit={handleService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date"  className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} placeholder="Your email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="due" defaultValue={'$'+price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;