import React, { useCallback, useEffect } from "react";

import ArrowRight from "@/assets/icons/ArrowRight";
import ClockIcon from "@/assets/icons/ClockIcon";
import { useApp } from "@/contexts/contextApi";
import { format_hour, getDurationTimeInGoogleMaps } from "@/utils/functions";

const TravelTime: React.FC = () => {
  const { selectedRoute } = useApp();
  const [duration, setDuration] = React.useState("" as any);
  const [arriveTime, setArriveTime] = React.useState("" as any);

  const getArriveTime = useCallback(async () => {
    const duration = await getDurationTimeInGoogleMaps(
      selectedRoute?.origin,
      selectedRoute?.destination
    );

    const departure = format_hour(selectedRoute?.departureTime!); // will como as "00:00"
    const depatureSplit = departure.split(":"); // will como as ["00","00"]
    const durationSplit = duration.split(":"); // will como as ["00","00"]

    //somar as horas
    const arriveHours = Number(depatureSplit[0]) + Number(durationSplit[0]);
    //somar os minutos
    const arriveMinutes = Number(depatureSplit[1]) + Number(durationSplit[1]);

    if (arriveMinutes > 60) {
      arriveMinutes - 60;
      arriveHours + 1;
    }

    const arriveTime = `${arriveHours}:${arriveMinutes}`;

    setArriveTime(arriveTime);
  }, [selectedRoute]);

  useEffect(() => {
      getArriveTime();
  }, [getArriveTime]);

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex justify-between items-center bg-white rounded-2xl px-4 py-2 shadow-md w-fit mb-4 gap-4 ">
        <div className="flex items-center gap-2">
          <ClockIcon />
          <div>
            <span>Partida {format_hour(selectedRoute?.departureTime!)}</span>
          </div>
        </div>
        <ArrowRight />
        <div className="flex items-center gap-4">
          <ClockIcon />
          <div>
            <span>Chegada {arriveTime}</span>
          </div>
        </div>
      </div>
      <span>
        Previsão de <b>{duration}</b> de viagem
      </span>
    </div>
  );
};

export default TravelTime;
