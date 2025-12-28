import sgMail from "@sendgrid/mail"
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendVerificationMail = async (email, token) => {
  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Verify your TripVam account",
    html: `<a href="http://localhost:5000/api/auth/verify/${token}">
             Verify Account
           </a>`,
  })
}
