// ./src/app/tickets/page.tsx
"use client"; // Adicione esta linha para marcar o componente como cliente
import React, { useEffect, useState } from "react";

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
      {/* ... outros elementos ... */}
      <div dangerouslySetInnerHTML={{ __html: cardHtml }} />
    </div>
  );
};

export default Tickets;
