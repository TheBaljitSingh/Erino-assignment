import { createTransport } from "nodemailer";

export const sendEmail = async(to, subject, text)=>{

    const transporter = createTransport({
       service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    });

    const response =await transporter.sendMail({
        to, subject, text
    });
          
    
    console.log(response);


}