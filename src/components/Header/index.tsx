"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useApp } from "@/contexts/contextApi"
import { HelpBox } from "@/components/HelpBox"
import { usePathname, useRouter } from "next/navigation"

const Header: React.FC = () => {
  const [showHelpBox, setShowHelpBox] = useState(false)
  const { user, setUser } = useApp()

  const pathname = usePathname()
  const router = useRouter()

  if (pathname === "/login" || pathname === "/register") return null

  return (
    <section className="header-sec">
      <div className="header-container">
        <Link href="/">
          <div className="header-logo-container">
            <svg
              width="174"
              height="45"
              viewBox="0 0 174 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M113.101 29V14.4545H119.166C120.255 14.4545 121.167 14.6084 121.901 14.9162C122.639 15.224 123.193 15.6548 123.562 16.2088C123.937 16.7628 124.124 17.4044 124.124 18.1335C124.124 18.6875 124.008 19.1823 123.776 19.6179C123.544 20.0488 123.224 20.4062 122.817 20.6903C122.41 20.9744 121.938 21.1733 121.403 21.2869V21.429C121.991 21.4574 122.533 21.616 123.03 21.9048C123.532 22.1937 123.934 22.5961 124.237 23.1122C124.54 23.6236 124.692 24.2296 124.692 24.9304C124.692 25.7116 124.493 26.41 124.095 27.0256C123.697 27.6364 123.122 28.1193 122.369 28.4744C121.616 28.8248 120.703 29 119.628 29H113.101ZM116.616 26.1662H118.79C119.552 26.1662 120.113 26.0218 120.473 25.733C120.838 25.4441 121.02 25.0417 121.02 24.5256C121.02 24.1515 120.932 23.8295 120.757 23.5597C120.582 23.285 120.333 23.0743 120.011 22.9276C119.689 22.776 119.304 22.7003 118.854 22.7003H116.616V26.1662ZM116.616 20.4347H118.562C118.946 20.4347 119.287 20.3707 119.585 20.2429C119.884 20.1151 120.116 19.9304 120.281 19.6889C120.452 19.4474 120.537 19.1562 120.537 18.8153C120.537 18.3277 120.364 17.9441 120.018 17.6648C119.673 17.3854 119.206 17.2457 118.619 17.2457H116.616V20.4347ZM135.182 14.4545H138.69V23.8366C138.69 24.9209 138.432 25.8655 137.916 26.6705C137.4 27.4706 136.68 28.0909 135.757 28.5312C134.834 28.9669 133.761 29.1847 132.54 29.1847C131.304 29.1847 130.224 28.9669 129.301 28.5312C128.378 28.0909 127.661 27.4706 127.149 26.6705C126.638 25.8655 126.382 24.9209 126.382 23.8366V14.4545H129.898V23.5312C129.898 24.0331 130.007 24.4806 130.224 24.8736C130.447 25.2666 130.757 25.5743 131.155 25.7969C131.553 26.0194 132.014 26.1307 132.54 26.1307C133.065 26.1307 133.525 26.0194 133.918 25.7969C134.315 25.5743 134.625 25.2666 134.848 24.8736C135.071 24.4806 135.182 24.0331 135.182 23.5312V14.4545ZM148.756 18.8153C148.709 18.2945 148.498 17.8897 148.124 17.6009C147.755 17.3073 147.227 17.1605 146.54 17.1605C146.086 17.1605 145.707 17.2197 145.404 17.3381C145.101 17.4564 144.873 17.6198 144.722 17.8281C144.57 18.0317 144.492 18.2661 144.488 18.5312C144.478 18.7491 144.521 18.9408 144.615 19.1065C144.715 19.2723 144.857 19.419 145.042 19.5469C145.231 19.67 145.458 19.7789 145.723 19.8736C145.989 19.9683 146.287 20.0511 146.618 20.1222L147.868 20.4062C148.588 20.5625 149.222 20.7708 149.772 21.0312C150.326 21.2917 150.79 21.6018 151.164 21.9616C151.542 22.3215 151.829 22.7358 152.023 23.2045C152.217 23.6733 152.317 24.1989 152.321 24.7812C152.317 25.6998 152.085 26.4882 151.625 27.1463C151.166 27.8045 150.506 28.3087 149.644 28.6591C148.787 29.0095 147.752 29.1847 146.54 29.1847C145.323 29.1847 144.263 29.0024 143.358 28.6378C142.454 28.2732 141.751 27.7192 141.249 26.9759C140.747 26.2325 140.489 25.2926 140.475 24.1562H143.841C143.87 24.625 143.995 25.0156 144.218 25.3281C144.44 25.6406 144.746 25.8774 145.134 26.0384C145.527 26.1993 145.981 26.2798 146.498 26.2798C146.971 26.2798 147.373 26.2159 147.705 26.0881C148.041 25.9602 148.299 25.7827 148.479 25.5554C148.659 25.3281 148.751 25.0677 148.756 24.7741C148.751 24.4995 148.666 24.2652 148.5 24.071C148.335 23.8722 148.079 23.7017 147.733 23.5597C147.392 23.4129 146.957 23.2779 146.426 23.1548L144.907 22.7997C143.647 22.5109 142.655 22.0445 141.931 21.4006C141.206 20.7519 140.846 19.8759 140.851 18.7727C140.846 17.8731 141.088 17.0848 141.576 16.4077C142.063 15.7306 142.738 15.2027 143.6 14.8239C144.462 14.4451 145.444 14.2557 146.547 14.2557C147.674 14.2557 148.652 14.4474 149.48 14.831C150.314 15.2098 150.96 15.7424 151.419 16.429C151.879 17.1155 152.113 17.911 152.123 18.8153H148.756Z"
                fill="black"
              />
              <rect x="0.5" y="0.5" width="173" height="44" stroke="#213A5C" />
              <rect x="5" y="4" width="80" height="37" fill="#213A5C" />
              <path
                d="M30.4801 14.4545V29H27.4972L21.7088 20.6051H21.6165V29H18.1009V14.4545H21.1264L26.8509 22.8352H26.9716V14.4545H30.4801ZM32.6907 29V14.4545H42.8327V17.3097H36.2063V20.2926H42.3143V23.1548H36.2063V26.1449H42.8327V29H32.6907ZM48.5927 14.4545L51.2489 19.0497H51.3626L54.0472 14.4545H57.9819L53.5927 21.7273L58.1239 29H54.0898L51.3626 24.3551H51.2489L48.5217 29H44.516L49.0259 21.7273L44.6296 14.4545H48.5927ZM59.3242 17.3097V14.4545H71.6183V17.3097H67.2077V29H63.7418V17.3097H59.3242Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>
        {!user ? (
          <div className="header-buttons-container">
            <Link href="/login">
              <button className="header-button-login">ENTRAR</button>
            </Link>
            <button
              onMouseOver={() => {
                setShowHelpBox(true)
              }}
              onMouseLeave={() => {
                setShowHelpBox(false)
              }}
              className="header-button-ajuda"
            >
              ?
            </button>
            {showHelpBox && <HelpBox />}
          </div>
        ) : (
          <div className="w-full flex items-center justify-end gap-5 p-4">
            <div className="color-black hidden md:flex">
              Bem-vindo, <b>{user.name.split(' ')[0]}!</b>
            </div>
            <button
              className="header-button-login"
              onClick={() => {
                setUser(null)
                localStorage.removeItem("user")
                localStorage.removeItem("userType")
              }}
            >
              Sair
            </button>
            {user.role === "admin" && (
              <button
                className="w-full bg-[#213a5c] hover:bg-[#213a5c]/90 rounded-md text-white font-bold py-2 px-4"
                onClick={() => {
                  router.push("/admin")
                }}
              >
                Painel de Admin
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Header
