import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 relative'>
                <img src={person} className="w-3/4 rounded-lg shadow-2xl" />
                <img src={parts} className="absolute right-20 top-1/2 border-[8px] w-1/2 border-white object-cover rounded-lg shadow-2xl" />
                </div>
                <div className='lg:w-1/2 space-y-5 p-4'>
                    <h1 className="text-4xl text-orange-500 font-semibold">About Us</h1>
                    <h1 className='text-6xl font-bold w-4/5'>We are qualified & of experience in this field</h1>
                    <p className="py-2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
                    <p className="py-2">the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;