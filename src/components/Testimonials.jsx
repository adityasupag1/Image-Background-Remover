
import pic1 from "../assets/tpic1.png";
import pic2 from "../assets/tpic2.png";
const Testimonials = ()=>{

  const CutsomerReviwData = [
    {
      id: '1',
    desc: `I've been using bg.removal for nearly two years, primarily for Instagram,
        and it has been incredibly user-friendly, making my work much easier`,
    pic: pic1,
    name: "Aditya Raj",
    role: "Web Developer",
  },
    {
      id: '2',
    desc: `I've been using bg.removal for nearly 6 months, I had a fantastic experience. The quality is top-notch. I recommend others to try this app.`,
     pic: pic2,
    name: "Donald Jackman",
    role: "UI Deginer",
  },
]
const TestimonialCard = (props) => {
const {pic, name, desc, role} = props.testimonial;

  return (
    <div className="bg-white rounded-xl p-6 max-sm:flex-col-reverse drop-shadow-md  m-auto hover:scale-105 transition-all duration-700 max-w-[500px] h-auto my-4 sm:mx-4">
      <p className="text-4xl text-gray-500">”</p>
      <p className="text-sm text-gray-500">{desc}
      </p>
      <div className="flex items-center gap-3 mt-5">
        <img
          className="w-9 rounded-full "
          src={pic}
          alt="Profile"
        />
        <div>
          <p>{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};



  return(
    <div className=" bg-slate-50 max-sm:mt-16 sm:mt-17 lg:mt-30 pb-10">
      {/* heading */}
        <div className=" text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-10">
          Customer Testimonials
        </div>
        {/* Testimonial cards */}
        <div className="flex flex-wrap justify-center max-sm:mx-4">
             {
              CutsomerReviwData.map((testimonial) =>(
                <TestimonialCard key= {testimonial.id} testimonial = {testimonial}/>
              ))
             }
        </div>
    </div>
  )
}
export default Testimonials