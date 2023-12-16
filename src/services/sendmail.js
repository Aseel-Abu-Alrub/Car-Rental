
import nodemailer from "nodemailer"

export async function sendmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user:process.env.SENDEMAIL,
          pass:process.env.SENDPASSWORD,
        },
      });
      
     
        const info = await transporter.sendMail({
          from: `"infinity light <${process.env.SENDEMAIL}>"`, // sender address
          to: to ,
          subject:subject,
          html:html
        });

        return info
}

  export default sendmail