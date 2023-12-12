// ./src/app/tickets/page.tsx
"use client"; // Adicione esta linha para marcar o componente como cliente
import React, { useEffect, useState } from "react";
import '../../styles/tickets.css'

const Tickets: React.FC = () => {
  const [cardHtml, setCardHtml] = useState("");

  useEffect(() => {
    const storedHtml = localStorage.getItem("cardPassagem");
    if (storedHtml) {
      setCardHtml(storedHtml);
    }
  }, []);

  return (
    <div>
      <h3 className="text-center uppercase text-2xl font-bold text-gray-800 mb-4 ">
        Minhas passagens
      </h3>
      <div className="card-passagem-wrapper px-2 py-3 rounded-md">
        <div
          className="card-passagem-infos"
          dangerouslySetInnerHTML={{ __html: cardHtml }}
        />
      </div>
    </div>
  );
};

export default Tickets;
