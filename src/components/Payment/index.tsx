import { useApp } from "@/contexts/contextApi";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import '../../styles/payment.css'

const Payment: React.FC = () => {
  const { paymentType, setPaymentType } = useApp();
  // const [creditCardInfos, setCreditCardInfos] = React.useState({
  //   card_number: "",
  //   card_name: "",
  //   card_expiration: "",
  //   card_cvv: "",
  // });
  const [creditCardInfos, setCreditCardInfos] = useState({
    card_number: "",
    card_name: "",
    card_expiration: "",
    card_cvv: "",
    card_brand: "",
  });
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [boletoData, setBoletoData] = useState<string>("");

  const detectCardBrand = (cardNumber: any) => {
    if (cardNumber.startsWith("4")) {
      return "Visa";
    } else if (cardNumber.startsWith("5")) {
      return "MasterCard";
    } // Adicione outras bandeiras conforme necessário
    return "";
  };

  const handleCardNumberChange = (e: any) => {
    const cardNumber = e.target.value;
    const cardBrand = detectCardBrand(cardNumber);
    setCreditCardInfos((prevState) => ({
      ...prevState,
      card_number: cardNumber,
      card_brand: cardBrand,
    }));
  };

  // Função para gerar um QR Code aleatório
  const generateRandomQRCode = () => {
    const randomData = Math.random().toString(36).substring(2, 15);
    setQrCodeData(randomData);
  };

  const generateRandomBoleto = () => {
    const randomData = `23790.50404 01043.510047 91020.150008 1 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
    setBoletoData(randomData);
  };

  useEffect(() => {
    if (paymentType === "boleto") {
      generateRandomBoleto();
    }
  }, [paymentType]);

  useEffect(() => {
    if (paymentType === "pix") {
      generateRandomQRCode();
    }
  }, [paymentType]);

  const payment_types: {
    title: string;
    type: "credit_card" | "pix" | "boleto";
    icon: JSX.Element;
    form: JSX.Element;
  }[] = [
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
          {/* <p className="text-center">
            O QR Code será enviado para o e-mail cadastrado.
          </p> */}
        </div>
      ),
    },
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
          <div className="flex w-full gap-1">
          <input
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Número do cartão"
            onChange={handleCardNumberChange}
            value={creditCardInfos.card_number}
          />
            {creditCardInfos.card_brand && (
              <div className="payment-credit-card-icon">
                {
                  creditCardInfos.card_brand == "Visa" && (
                    <svg
                      width="56"
                      height="43"
                      viewBox="0 0 56 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M45.7042 19.4256C45.7042 19.4256 46.4431 22.5498 46.6083 23.2049H43.3611C43.6819 22.4574 44.9167 19.5516 44.9167 19.5516C44.8972 19.5768 45.2375 18.7873 45.4319 18.3002L45.7042 19.4256ZM56 6.71875V36.2812C56 38.5068 53.9097 40.3125 51.3333 40.3125H4.66667C2.09028 40.3125 0 38.5068 0 36.2812V6.71875C0 4.49316 2.09028 2.6875 4.66667 2.6875H51.3333C53.9097 2.6875 56 4.49316 56 6.71875ZM14.8264 27.8156L20.9708 14.7812H16.8389L13.0181 23.6836L12.6 21.8779L11.2389 15.8814C11.0153 15.05 10.325 14.8148 9.46945 14.7812H3.17917L3.11111 15.0416C4.64722 15.3775 6.01806 15.8646 7.21389 16.4777L10.6944 27.8156H14.8264ZM24.0042 27.8324L26.4542 14.7812H22.5458L20.1056 27.8324H24.0042ZM37.6056 23.566C37.625 22.0795 36.575 20.9457 34.3292 20.0135C32.9583 19.4172 32.1222 19.0141 32.1222 18.401C32.1417 17.8467 32.8319 17.2756 34.3681 17.2756C35.6417 17.2504 36.575 17.5107 37.275 17.7711L37.625 17.9139L38.1597 15.092C37.3917 14.8316 36.1667 14.5377 34.6597 14.5377C30.8 14.5377 28.0875 16.3182 28.0681 18.8545C28.0389 20.7273 30.0125 21.7688 31.4903 22.3986C32.9972 23.0369 33.5125 23.4568 33.5125 24.0195C33.4931 24.893 32.2875 25.2961 31.1694 25.2961C29.6139 25.2961 28.7778 25.0861 27.5042 24.599L26.9889 24.3891L26.4444 27.3201C27.3583 27.6812 29.05 28.0004 30.8 28.0172C34.9028 28.0256 37.5764 26.2703 37.6056 23.566ZM51.3333 27.8324L48.1833 14.7812H45.1597C44.2264 14.7812 43.5167 15.0164 43.1181 15.8646L37.3139 27.8324H41.4167C41.4167 27.8324 42.0875 26.2199 42.2333 25.8756H47.25C47.3667 26.3375 47.7167 27.8324 47.7167 27.8324H51.3333Z"
                        fill="black"
                      />
                    </svg>
                  )
                }
                {
                  creditCardInfos.card_brand == "MasterCard" && (
                    <svg
                      width="56"
                      height="43"
                      viewBox="0 0 56 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M46.9486 34.4588C46.9486 35.0299 46.5014 35.4414 45.8597 35.4414C45.1986 35.4414 44.7708 35.0047 44.7708 34.4588C44.7708 33.9129 45.1986 33.4762 45.8597 33.4762C46.5014 33.4762 46.9486 33.9129 46.9486 34.4588ZM16.7319 33.4762C16.0417 33.4762 15.6431 33.9129 15.6431 34.4588C15.6431 35.0047 16.0417 35.4414 16.7319 35.4414C17.3639 35.4414 17.7917 35.0299 17.7917 34.4588C17.7819 33.9129 17.3639 33.4762 16.7319 33.4762ZM28.1556 33.451C27.6306 33.451 27.3097 33.7449 27.2319 34.1816H29.0889C29.0014 33.7029 28.6611 33.451 28.1556 33.451ZM38.6361 33.4762C37.975 33.4762 37.5764 33.9129 37.5764 34.4588C37.5764 35.0047 37.975 35.4414 38.6361 35.4414C39.2972 35.4414 39.725 35.0299 39.725 34.4588C39.725 33.9129 39.2972 33.4762 38.6361 33.4762ZM48.9319 35.6682C48.9319 35.6934 48.9611 35.7102 48.9611 35.7605C48.9611 35.7857 48.9319 35.8025 48.9319 35.8529C48.9028 35.8781 48.9028 35.8949 48.8833 35.9201C48.8542 35.9453 48.8347 35.9621 48.7764 35.9621C48.7472 35.9873 48.7278 35.9873 48.6694 35.9873C48.6403 35.9873 48.6208 35.9873 48.5625 35.9621C48.5333 35.9621 48.5139 35.9369 48.4847 35.9201C48.4556 35.8949 48.4361 35.8781 48.4361 35.8529C48.4069 35.8109 48.4069 35.7857 48.4069 35.7605C48.4069 35.7186 48.4069 35.6934 48.4361 35.6682C48.4361 35.6262 48.4653 35.601 48.4847 35.5758C48.5139 35.5506 48.5333 35.5506 48.5625 35.5338C48.6111 35.5086 48.6403 35.5086 48.6694 35.5086C48.7181 35.5086 48.7472 35.5086 48.7764 35.5338C48.825 35.559 48.8542 35.559 48.8833 35.5758C48.9125 35.5926 48.9028 35.6262 48.9319 35.6682ZM48.7181 35.7857C48.7667 35.7857 48.7667 35.7605 48.7958 35.7605C48.825 35.7354 48.825 35.7186 48.825 35.6934C48.825 35.6682 48.825 35.6514 48.7958 35.6262C48.7667 35.6262 48.7472 35.601 48.6889 35.601H48.5333V35.8949H48.6111V35.7773H48.6403L48.7472 35.8949H48.825L48.7181 35.7857ZM56 6.80273V36.3652C56 38.5908 53.9097 40.3965 51.3333 40.3965H4.66667C2.09028 40.3965 0 38.5908 0 36.3652V6.80273C0 4.57715 2.09028 2.77148 4.66667 2.77148H51.3333C53.9097 2.77148 56 4.57715 56 6.80273ZM6.22222 18.527C6.22222 24.9518 12.2597 30.1588 19.6875 30.1588C22.3319 30.1588 24.9278 29.4701 27.125 28.2188C20.0375 23.2385 20.0861 13.8406 27.125 8.86035C24.9278 7.60059 22.3319 6.92031 19.6875 6.92031C12.2597 6.91191 6.22222 12.1273 6.22222 18.527ZM28 27.6645C34.8542 23.0453 34.825 14.0422 28 9.39785C21.175 14.0422 21.1458 23.0537 28 27.6645ZM14.1653 34.0725C14.1653 33.3418 13.6111 32.8631 12.7361 32.8379C12.2889 32.8379 11.8125 32.9555 11.4917 33.3838C11.2583 33.0395 10.8597 32.8379 10.3056 32.8379C9.93611 32.8379 9.56667 32.9555 9.275 33.2914V32.9219H8.47778V36.0041H9.275C9.275 34.4168 9.03194 33.4678 10.15 33.4678C11.1417 33.4678 10.9472 34.3244 10.9472 36.0041H11.7153C11.7153 34.4672 11.4722 33.4678 12.5903 33.4678C13.5819 33.4678 13.3875 34.3076 13.3875 36.0041H14.1847V34.0725H14.1653ZM18.5306 32.9219H17.7625V33.2914C17.5 33.0143 17.1306 32.8379 16.625 32.8379C15.6236 32.8379 14.8556 33.5266 14.8556 34.4588C14.8556 35.3994 15.6236 36.0797 16.625 36.0797C17.1306 36.0797 17.5 35.9201 17.7625 35.6262V36.0125H18.5306V32.9219ZM22.4681 35.0719C22.4681 33.8121 20.2417 34.3832 20.2417 33.7953C20.2417 33.3166 21.3986 33.3922 22.0403 33.7029L22.3611 33.157C21.4472 32.6447 19.425 32.6531 19.425 33.8457C19.425 35.0467 21.6514 34.5428 21.6514 35.1055C21.6514 35.6346 20.3389 35.5926 19.6389 35.1727L19.2986 35.7018C20.3875 36.34 22.4681 36.2057 22.4681 35.0719ZM25.9097 35.8529L25.6958 35.2818C25.3264 35.4582 24.5097 35.6514 24.5097 34.9375V33.5434H25.7833V32.9219H24.5097V31.9812H23.7125V32.9219H22.9736V33.535H23.7125V34.9375C23.7125 36.4156 25.3944 36.1469 25.9097 35.8529ZM27.2028 34.7275H29.8764C29.8764 33.367 29.1569 32.8295 28.1847 32.8295C27.1542 32.8295 26.4153 33.493 26.4153 34.4504C26.4153 36.1721 28.6125 36.4576 29.7014 35.643L29.3319 35.1391C28.5736 35.6766 27.4264 35.6262 27.2028 34.7275ZM32.9486 32.9219C32.5014 32.7539 31.8208 32.7707 31.4708 33.2914V32.9219H30.6736V36.0041H31.4708V34.2656C31.4708 33.2914 32.3944 33.4174 32.7153 33.5602L32.9486 32.9219ZM33.9792 34.4588C33.9792 33.5014 35.1069 33.1906 35.9917 33.7533L36.3611 33.2074C35.2333 32.4432 33.1819 32.8631 33.1819 34.4672C33.1819 36.1301 35.3597 36.466 36.3611 35.727L35.9917 35.1811C35.0972 35.727 33.9792 35.3994 33.9792 34.4588ZM40.4639 32.9219H39.6667V33.2914C38.8597 32.3676 36.7597 32.8883 36.7597 34.4588C36.7597 36.0713 38.9375 36.5332 39.6667 35.6262V36.0125H40.4639V32.9219ZM43.7403 32.9219C43.5069 32.8211 42.6708 32.6783 42.2625 33.2914V32.9219H41.4944V36.0041H42.2625V34.2656C42.2625 33.3418 43.1375 33.4006 43.5069 33.5602L43.7403 32.9219ZM47.6583 31.6705H46.8903V33.2914C46.0931 32.376 43.9833 32.8631 43.9833 34.4588C43.9833 36.0881 46.1708 36.5248 46.8903 35.6262V36.0125H47.6583V31.6705ZM48.3972 25.3633V25.7496H48.475V25.3633H48.6597V25.2961H48.2125V25.3633H48.3972ZM49.0389 35.7605C49.0389 35.7186 49.0389 35.6682 49.0097 35.6262C48.9806 35.601 48.9611 35.559 48.9319 35.5338C48.9028 35.5086 48.8542 35.4918 48.825 35.4666C48.7764 35.4666 48.7181 35.4414 48.6694 35.4414C48.6403 35.4414 48.5917 35.4666 48.5333 35.4666C48.4847 35.4918 48.4556 35.5086 48.4264 35.5338C48.3778 35.559 48.3486 35.601 48.3486 35.6262C48.3194 35.6682 48.3194 35.7186 48.3194 35.7605C48.3194 35.7857 48.3194 35.8277 48.3486 35.8781C48.3486 35.9033 48.3778 35.9453 48.4264 35.9705C48.4556 35.9957 48.475 36.0125 48.5333 36.0377C48.5819 36.0629 48.6403 36.0629 48.6694 36.0629C48.7181 36.0629 48.7764 36.0629 48.825 36.0377C48.8542 36.0125 48.9028 35.9957 48.9319 35.9705C48.9611 35.9453 48.9806 35.9033 49.0097 35.8781C49.0389 35.8277 49.0389 35.7857 49.0389 35.7605ZM49.35 25.2877H49.2139L49.0583 25.5816L48.9028 25.2877H48.7667V25.7412H48.8444V25.3969L49 25.6908H49.1069L49.2431 25.3969V25.7412H49.35V25.2877ZM49.7778 18.527C49.7778 12.1273 43.7403 6.91191 36.3125 6.91191C33.6681 6.91191 31.0722 7.60059 28.875 8.85195C35.8847 13.8322 35.9917 23.2553 28.875 28.2104C31.0722 29.4701 33.6875 30.1504 36.3125 30.1504C43.7403 30.1588 49.7778 24.9518 49.7778 18.527Z"
                        fill="black"
                      />
                    </svg>
                  )
                }
                {/* <img src={`../../assets/{creditCardInfos.card_brand}.png`} alt={creditCardInfos.card_brand} /> */}
                {/* Substitua '/path/to/' pelo caminho das imagens das bandeiras */}
              </div>
            )}
          </div>
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
          {/* <p className="text-center">
            O boleto será enviado para o e-mail cadastrado.
          </p> */}
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
            className={`flex flex-col items-center justify-center w-1/3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 ${
              paymentType === payment.type ? "bg-gray-200" : ""
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
            payment_types.findIndex((payment) => payment.type === paymentType)
          ].form
        }

        {/* <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
          placeholder="Número do cartão"
          onChange={handleCardNumberChange}
          value={creditCardInfos.card_number}
        /> */}
        
        {paymentType === "pix" && (
          <div className="text-center">
            <QRCode value={qrCodeData} size={128} />
          </div>
        )}
        {paymentType === "boleto" && (
          <div className="text-center">
            <p>Boleto Gerado: {boletoData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
