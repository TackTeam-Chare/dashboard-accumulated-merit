import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

export async function POST(req) {
  try {
    const { lineUserId, displayName } = await req.json();

    if (!lineUserId || !displayName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Check if user exists
    const [existingUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [
      lineUserId,
    ]);

    if (existingUser.length > 0) {
      return new Response(JSON.stringify(existingUser[0]), { status: 200 });
    }

    // Insert new user
    await pool.query(
      "INSERT INTO usersdatabase (UserID, Nickname, MeritPoint, MeritStatus, ConcentrationPoints, ConcentrationStatus) VALUES (?, ?, ?, ?, ?, ?)",
      [lineUserId, displayName, 0, "Beginner", 0, "Beginner"]
    );

    const [newUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [
      lineUserId,
    ]);

    return new Response(JSON.stringify(newUser[0]), { status: 201 });
  } catch (error) {
    console.error("Error handling user login:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
