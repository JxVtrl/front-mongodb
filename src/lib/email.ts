import nodemailer from "nodemailer"

type EmailPayload = {
  to: string
  subject: string
  html: string
}

    
export const sendEmail = async (data: EmailPayload) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: "marcelo.bracet1@gmail.com",
    pass: "yvbd noij rguo agdi",
  },
  })
    
    const mailOptions = {
        from: "Nextbus.com",
        to: data.to,
        subject: "NEXTBUS - PASSAGEM",
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Email sent successfully")
    } catch (err) {
        console.error(err, 'Erro ao enviar email')
  }
}