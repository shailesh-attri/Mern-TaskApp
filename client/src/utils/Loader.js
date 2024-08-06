import React from 'react'
import { Oval } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-[85%] h-[80%]">
    <Oval
                visible={true}
                height="30"
                width="80"
                color="#00BFFF"
                secondaryColor="#4169E1"
                strokeWidth='4'
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
    </div>
  )
}

export default Loader