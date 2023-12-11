import React from "react"
import RoutePath from "./components/RoutePath"
import DateShow from "./components/DateShow"
import PassengersNumber from "./components/PassengersNumber"
import ChangeSearch from "./components/ChangeSearch"

const Header: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around md:items-center w-full px-[10px] md:px-[50px] my-[24px] md:my-[0] mx-auto md:h-24 gap-4 md:gap-2 px-5">
      <RoutePath />
      <DateShow />
      <PassengersNumber />
      <ChangeSearch />
    </div>
  )
}

export default Header
