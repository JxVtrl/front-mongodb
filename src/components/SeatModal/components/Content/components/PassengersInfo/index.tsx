"use client";
import CloseIcon from "@/assets/icons/CloseIcon";
import Switch from "@/components/Switch";
import { useApp } from "@/contexts/contextApi";
import React from "react";

const PassengersInfo: React.FC = () => {
  const {
    seatsSelected,
    setSeatsSelected,
    setPassengersInfo,
    passengersInfo,
    user,
  } = useApp();
  const [userPassenger, setUserPassenger] = React.useState(false);

  React.useEffect(() => {
    const newPassengersInfo = seatsSelected.map((seat) => {
      return {
        passenger: {
          name: "",
          cpf: "",
        },
        seat,
      };
    });

    setPassengersInfo(newPassengersInfo);
  }, [seatsSelected, setPassengersInfo]);

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto h-[600px] bg-gray-100 rounded-xl p-5 shadow-md">
      {passengersInfo.length === 0 ? (
        <div className="flex items-center justify-center w-full bg-white p-4 rounded-md shadow-md">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 px-4 w-full text-center transition duration-200 ease-in-out"
            onClick={() => {
              setPassengersInfo([
                ...passengersInfo,
                {
                  passenger: {
                    name: "",
                    cpf: "",
                  },
                  seat: seatsSelected[0],
                },
              ]);
            }}
          >
            Adicionar passageiro
          </button>
        </div>
      ) : (
        passengersInfo.map((passengerInfo, index) => (
          <div
            className="flex flex-col gap-2 w-full bg-white p-4 rounded-md shadow-md"
            key={index}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>
                  Passageiro {index + 1} - Assento {passengerInfo.seat.numero}
                </span>

                {index === 0 && (
                  <Switch
                    checked={userPassenger}
                    onChange={(checked) => {
                      const newPassengersInfo = [...passengersInfo];
                      setUserPassenger(checked);
                      if (checked) {
                        newPassengersInfo[0].passenger.name = user?.name || "";
                        newPassengersInfo[0].passenger.cpf = user?.cpf || "";
                      } else {
                        newPassengersInfo[0].passenger.name = "";
                        newPassengersInfo[0].passenger.cpf = "";
                      }
                      setPassengersInfo(newPassengersInfo);
                    }}
                    label="É o usuário?"
                  />
                )}
              </div>
              {passengersInfo.length === 1 || (
                <CloseIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() => {
                    const newSeatsSelected = [...seatsSelected];
                    newSeatsSelected.splice(index, 1);
                    setSeatsSelected(newSeatsSelected);
                  }}
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nome"
                value={passengerInfo.passenger.name}
                onChange={(e) => {
                  const newPassengersInfo = [...passengersInfo];
                  newPassengersInfo[index].passenger.name = e.target.value;
                  setPassengersInfo(newPassengersInfo);
                }}
                disabled={userPassenger && index === 0 && !!user?.name}
              />
              <input
                type="text"
                placeholder="CPF"
                value={passengerInfo.passenger.cpf}
                onChange={(e) => {
                  const newPassengersInfo = [...passengersInfo];
                  newPassengersInfo[index].passenger.cpf = e.target.value;
                  setPassengersInfo(newPassengersInfo);
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PassengersInfo;
