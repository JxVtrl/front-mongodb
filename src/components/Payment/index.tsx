import { useApp } from "@/contexts/contextApi";
import React from "react";

const Payment: React.FC = () => {
  const { paymentType, setPaymentType } = useApp();
  const [creditCardInfos, setCreditCardInfos] = React.useState({
    card_number: "",
    card_name: "",
    card_expiration: "",
    card_cvv: "",
  });

  const payment_types: {
    title: string;
    type: "credit_card" | "pix" | "boleto";
    icon: JSX.Element;
    form: JSX.Element;
  }[] = [
    {
      title: "Cartão de crédito",
      type: "credit_card",
      icon: (
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="20px"
          width="20px"
        >
          <path d="M928 160H96c-17.7 0-32 14.3-32 32v160h896V192c0-17.7-14.3-32-32-32zM64 832c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V440H64v392zm579-184c0-4.4 3.6-8 8-8h165c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H651c-4.4 0-8-3.6-8-8v-72z" />
        </svg>
      ),
      form: (
        <div className="flex flex-col gap-2 items-center justify-center w-full overflow-hidden max-w-[500px] rounded-lg">
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Número do cartão"
            onChange={(e) => {
              const value = e.target.value;
              setCreditCardInfos((prevState) => ({
                ...prevState,
                card_number: value,
              }));
            }}
            value={creditCardInfos.card_number}
          />
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Nome impresso no cartão"
            onChange={(e) => {
              const value = e.target.value;
              setCreditCardInfos((prevState) => ({
                ...prevState,
                card_name: value,
              }));
            }}
            value={creditCardInfos.card_name}
          />
          <div className="flex flex-row gap-2 items-center justify-between w-full rounded-lg">
            <input
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              placeholder="Validade"
              onChange={(e) => {
                const value = e.target.value;
                setCreditCardInfos((prevState) => ({
                  ...prevState,
                  card_expiration: value,
                }));
              }}
              value={creditCardInfos.card_expiration}
            />
            <input
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
              placeholder="CVV"
              onChange={(e) => {
                const value = e.target.value;
                setCreditCardInfos((prevState) => ({
                  ...prevState,
                  card_cvv: value,
                }));
              }}
              value={creditCardInfos.card_cvv}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Boleto",
      type: "boleto",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" height="20px" width="20px">
          <path d="M13 16H7a1 1 0 000 2h6a1 1 0 000-2zm-4-6h2a1 1 0 000-2H9a1 1 0 000 2zm12 2h-3V3a1 1 0 00-.5-.87 1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0l-3 1.72-3-1.72a1 1 0 00-1 0A1 1 0 002 3v16a3 3 0 003 3h14a3 3 0 003-3v-6a1 1 0 00-1-1zM5 20a1 1 0 01-1-1V4.73l2 1.14a1.08 1.08 0 001 0l3-1.72 3 1.72a1.08 1.08 0 001 0l2-1.14V19a3 3 0 00.18 1zm15-1a1 1 0 01-2 0v-5h2zm-7-7H7a1 1 0 000 2h6a1 1 0 000-2z" />
        </svg>
      ),
      form: (
        <div>
          <p className="text-center">
            O boleto será enviado para o e-mail cadastrado.
          </p>
        </div>
      ),
    },
    {
      title: "Pix",
      type: "pix",
      icon: (
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          height="20px"
          width="20px"
        >
          <path d="M242.4 292.5c5.4-5.4 14.7-5.4 20.1 0l77 77c14.2 14.2 33.1 22 53.1 22h15.1l-97.1 97.1c-30.3 29.5-79.5 29.5-109.8 0l-97.5-97.4h9.3c20 0 38.9-7.8 53.1-22l76.7-76.7zm20.1-73.6c-6.4 5.5-14.6 5.6-20.1 0l-76.7-76.7c-14.2-15.1-33.1-22-53.1-22h-9.3l97.4-97.44c30.4-30.346 79.6-30.346 109.9 0l97.2 97.14h-15.2c-20 0-38.9 7.8-53.1 22l-77 77zm-149.9-76.2c13.8 0 26.5 5.6 37.1 15.4l76.7 76.7c7.2 6.3 16.6 10.8 26.1 10.8 9.4 0 18.8-4.5 26-10.8l77-77c9.8-9.7 23.3-15.3 37.1-15.3h37.7l58.3 58.3c30.3 30.3 30.3 79.5 0 109.8l-58.3 58.3h-37.7c-13.8 0-27.3-5.6-37.1-15.4l-77-77c-13.9-13.9-38.2-13.9-52.1.1l-76.7 76.6c-10.6 9.8-23.3 15.4-37.1 15.4H80.78l-58.02-58c-30.346-30.3-30.346-79.5 0-109.8l58.02-58.1h31.82z" />
        </svg>
      ),
      form: (
        <div>
          <p className="text-center">
            O QR Code será enviado para o e-mail cadastrado.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 h-[600px] bg-gray-100 rounded-xl p-5 shadow-md">
      <div className="flex flex-row items-center justify-around gap-2">
        {payment_types.map((payment, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center w-1/3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 ${
              paymentType === payment.type ? "bg-gray-100" : ""
            }`}
            onClick={() => setPaymentType(payment.type)}
          >
            {payment.icon}
            <span className="text-sm font-semibold">{payment.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 rounded-lg">
        {
          payment_types[
            payment_types.findIndex((payment) => {
              console.log(payment.type, paymentType)
              return payment.type === paymentType
            }) ||
              0
          ].form
        }
      </div>
    </div>
  );
};

export default Payment;
