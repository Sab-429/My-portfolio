import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  try {
    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message],
    );

    await resend.emails.send({
      from: "Portfolio Contact <no-reply@sabyasachisaha.in>",
      to: process.env.To_EMAIL,
      subject: `New Message from ${name}`,
      html: `
          <h3>New Contact submission</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
          `,
    });
    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
