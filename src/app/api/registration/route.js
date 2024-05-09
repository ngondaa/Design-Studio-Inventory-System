import { query } from "../../../lib/db";

export async function POST(request) {
  try {
    const { first_name, last_name, email, postalCode, gender, city, password } =
      await request.json();
    const updateUsers = await query({
      query:
        "INSERT INTO client (first_name, last_name,email,gender,city,postalcode,password) VALUES (?, ?, ?,?,?,?,?)",
      values: [
        first_name,
        last_name,
        email,
        postalCode,
        gender,
        city,
        password,
      ],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


