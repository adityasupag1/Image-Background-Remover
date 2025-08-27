const StepCard = (props) =>{
  const {image, heading, desc1, desc2} = props.step;
  return (
    <div className="flex items-start gap-4 bg-white border-[1px] border-gray-300 drop-shadow-lg p-7 pb-10 rounded hover:scale-105 transition-all duration-500 w-[350px]  ">
         <img src={image} alt="stepsImage" className="max-w-9" />
         <div>
          <h3 className="text-xl font-medium">{heading}</h3>
          <p className=" text-sm text-neutral-500">{desc1}</p>
          <p className=" text-sm text-neutral-500">{desc2}</p>
         </div>
    </div>
  )
}
export default StepCard