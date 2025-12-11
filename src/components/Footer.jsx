import React from "react"
import { Link } from "react-router-dom"
import { FaLocationArrow } from "react-icons/fa"
import irene from '../assets/irene.jpg'
import olyn from '../assets/olyn.jpg'
import earlyne from '../assets/earlyne.jpg'

const TeamMembers = [
  {
    id: 1,
    name: "Irene",
    image: irene,
    instagram: "https://instagram.com/ireneancillaa"
  },
  {
    id: 2,
    name: "Olyn",
    image: olyn,
    instagram: "https://instagram.com/olyn.sna"
  },
  {
    id: 3,
    name: "Earlyne",
    image: earlyne,
    instagram: "https://instagram.com/kuearlyne"
  }
]

const FooterLinks = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Shop",
    url: "/shop"
  },
  {
    title: "Testimonials",
    url: "/testimonials"
  },
  {
    title: "Contact",
    url: "/contact"
  }
]

const Footer = () => {
  return (
    <footer className="bg-[#007E6E] py-6 mt-10">
      <div className="container mx-auto px-4 md:px-2 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="py-8 px-4">
            <span className="font-bold tracking-widest text-2xl text-white uppercase">
              FRUITOPIA
            </span>
            <p className="text-white font-regular text-sm lg:pr-24 pt-3">
              At Fruitopia, we bring you the freshest, juiciest, and most flavorful fruits sourced directly from trusted local farms. Enjoy a wide variety of high-quality produce that nourishes your body and brightens your day.
            </p>
            <a 
              href="https://github.com/ireneancillaa/Fruitopia.git"
              target="_blank"
              className="inline-block bg-white text-[#007E6E] font-semibold px-4 py-2 rounded-full mt-4 hover:bg-gray-200 transition">
              Our Repositories
            </a>
          </div>
          
          <div className="text-white py-8 px-4">
            <h1 className="text-xl font-semibold tracking-wider sm:text-left mb-3">
              Important Links
            </h1>
            <ul className="space-y-3">
                {
                  FooterLinks.map((data, idx) => (
                    <li key={idx} className="text-sm font-regular py-1 hover:text-gray-300 transition">
                      <Link 
                        to={data.url}
                        className="text-white hover:text-gray-300 duration-300">
                        {data.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
          </div>
          
          <div className="text-white py-8 px-4">
            <div className="flex items-center gap-3 mb-6">
              <FaLocationArrow className="text-2xl shrink-0" />
              <p className="text-sm font-regular">
                Jl. Raya Kb. Jeruk No.27, RT.1/RW.9, Kemanggisan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold tracking-wider mb-4">
                Our Team
              </h3>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {TeamMembers.map((member) => (
                  <a 
                    key={member.id} 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group text-center"
                  >
                    <div className="relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover hover:scale-110 transition-transform cursor-pointer border border-white group-hover:border-green-500"
                        title={member.name}
                      />
                      <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <p className="text-sm mt-2 text-white tracking-wider group-hover:text-white transition">
                      {member.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/30 mt-8 pt-6">
          <p className="text-center text-white text-sm font-regular tracking-wide">
            &copy; {new Date().getFullYear()} Fruitopia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer