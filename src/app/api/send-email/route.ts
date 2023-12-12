import { render } from "@react-email/render";
import TemplateMail from "../../../components/TemplateMail";
import { sendEmail } from "../../../lib/email";

export async function POST(
  req: Request,
  res: Response
) {

  try {
      const { email } = await req.json();
  
  if (!email) {
    return new Response("Email não encontrado", { status: 400 })
  }
        await sendEmail({
          to: email,
          subject: "NEXTBUS - PASSAGEM",
          html: render(TemplateMail()),
        });
      
        return new Response("Email enviado com sucesso", { status: 200 })
    } catch (err) {
      console.log('Fail sending email', err)
      return new Response("Erro ao enviar email", { status: 500 })
    }
}



