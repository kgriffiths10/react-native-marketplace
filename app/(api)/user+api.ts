// API Route: /(api)/user
// API Method: POST 
// When the app sends data to this route, this function will be triggered.

import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {  
    
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { firstName, lastName, email, clerkID } = await request.json(); // Looks inside the body of POST request, which is expected to contain a JSON object with firstName, lastName, etc.

        if(!firstName || !lastName || !email || !clerkID) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        // Insert the user into the database, await waits for this to finish before moving on
        const response = await sql `
            INSERT INTO users (first_name, last_name, email, clerk_id)
            VALUES (${firstName}, ${lastName}, ${email}, ${clerkID})
        `;

        return new Response(JSON.stringify({ data: response }), { status: 200 });

    } catch (error) {
        console.log(error);
        return Response.json( {error: error }, { status: 500 });
    }
}