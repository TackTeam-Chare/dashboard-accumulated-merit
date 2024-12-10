import mysql from "mysql2/promise";

// MySQL Database Connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

export default async function handler(req, res) {
  // Set CORS Headers
  res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_FRONTEND_URL || "*"); // Use your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Allow only POST requests
  }

  const { lineUserId, displayName } = req.body;

  if (!lineUserId || !displayName) {
    return res.status(400).json({ error: "Missing required fields: lineUserId, displayName" });
  }

  try {
    console.log("Received data:", { lineUserId, displayName });

    // Check if user exists
    const [existingUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [
      lineUserId,
    ]);

    if (existingUser.length > 0) {
      console.log("User exists:", existingUser[0]);
      return res.status(200).json(existingUser[0]);
    }

    console.log("User does not exist. Creating new user...");

    // If user does not exist, insert new user with default data
    const [result] = await pool.query(
      "INSERT INTO usersdatabase (UserID, Nickname, MeritPoint, MeritStatus, ConcentrationPoints, ConcentrationStatus) VALUES (?, ?, ?, ?, ?, ?)",
      [lineUserId, displayName, 0, "Beginner", 0, "Beginner"]
    );

    console.log("New user created:", result);

    // Retrieve the newly inserted user
    const [newUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [
      lineUserId,
    ]);

    console.log("New user data:", newUser[0]);
    return res.status(201).json(newUser[0]);
  } catch (error) {
    console.error("Error handling user login:", error.message, error.stack);
    return res.status(500).json({ error: "Internal server error." });
  }
}
