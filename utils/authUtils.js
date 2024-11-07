import { sql } from "@vercel/postgres";

export async function getUserByPhoneAndPin(phoneNumber, pin) {
  // Query the database to find the user by phone number and pin
  const result = await sql`SELECT * FROM users WHERE phone_number = ${phoneNumber} AND pin = ${pin}`;
  
  if (result.rows.length > 0) {
    const user = result.rows[0];
    return {
      id: user.user_id,
      name: user.name,
      phone: user.phone_number,
    };
  } else {
    return null;
  }
}