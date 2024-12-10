import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

export async function POST(req) {
  console.log("Request received...");
  const start = Date.now();

  try {
    const { lineUserId, displayName } = await req.json();

    if (!lineUserId || !displayName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    console.log(`Received data: ${JSON.stringify({ lineUserId, displayName })}`);

    // Connect to database
    const [existingUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [
      lineUserId,
    ]);
    console.log(`Query completed in ${Date.now() - start}ms`);

    if (existingUser.length > 0) {
      return new Response(JSON.stringify(existingUser[0]), { status: 200 });
    }

    console.log("Inserting new user...");
    await pool.query(
      "INSERT INTO usersdatabase (UserID, Nickname, MeritPoint, MeritStatus, ConcentrationPoints, ConcentrationStatus) VALUES (?, ?, ?, ?, ?, ?)",
      [lineUserId, displayName, 0, "Beginner", 0, "Beginner"]
    );

    const [newUser] = await pool.query("SELECT * FROM usersdatabase WHERE UserID = ?", [lineUserId]);
    return new Response(JSON.stringify(newUser[0]), { status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
