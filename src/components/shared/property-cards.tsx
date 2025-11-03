"use client"

import { Heart } from 'lucide-react'
import React from 'react'

import inter from '@/lib/font/Inter'
import {motion} from "framer-motion" 
import Link from 'next/link'

function PropertyCards({property,type}) {

  
  return (
        <motion.div initial={{opacity:0}} animate={{y:-10,opacity:1}} key={property.id} className="bg-[#A5D2F2]  rounded-2xl p-3 w-full flex shadow-md items-center justify-center">
            <img
              src={property?.photos}
              alt={property.name}
              className="w-23 h-23 rounded-lg object-cover"
            />
            <div className="flex-1 px-3">
                <div className="flex items-start justify-between">
                    <div>
              <h3 className="font-semibold text-gray-800">{property.property_name}</h3>
              <p className="text-xs text-gray-700 gap-2">
                {property.property_kind}  <span className='px-2'>{property.property_type}</span>  <br /> 
                <span  >{property.location}</span>
              </p>
              {/* <p className="text-xs text-gray-600 mt-1">{property.config}</p> */}

                    </div>
                <Heart size={18} className="text-[#0080ff] cursor-pointer" />

                </div>
             <div className="flex justify-start items-start gap-3">
              <span className="inline-block mt-1 whitespace-nowrap bg-white text-xs font-semibold px-2 py-1 rounded-lg">
                 ₹ {property.price}
              </span>

             
           
          {
            type == 'User'
            
            ?
            
                <Link href={`/dashboard/user/find-property/property-list/proprerty-info/${property.id}`}>
              <button  className={` ${inter.className} px-4 font-semibold   whitespace-nowrap p-1 mt-1 rounded-xl text-xs bg-white  `}>
                 Book Visit
              </button>
           
           </Link>
            :
           <Link href={`/dashboard/admin/property-approval/property-approval-info/${property.id}`}>
              <button  className={` ${inter.className} px-4 font-semibold   whitespace-nowrap p-1 mt-1 rounded-xl text-xs bg-white  `}>
                Visit Lead 
              </button>
           
           </Link>
          }

             </div>
            </div>
            
            
           
        
           
          </motion.div>
  )
}

export default PropertyCards