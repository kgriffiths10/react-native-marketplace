// API Route: /(api)/user

import { neon } from '@neondatabase/serverless';

// API Method: POST 
// When the app sends data to this route, this function will be triggered.
export async function POST(request: Request) {  
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { clerkID, title, category, description, price, isTrade, location, condition, status, longitude, latitude } = await request.json(); // Looks inside the body of POST request, which is expected to contain a JSON object with title, description etc.
        

        if (!clerkID || !title || !category || !description || !price || !location || !isTrade || !condition || !status || !longitude || !latitude) {
            console.log('Missing required fields:', { clerkID, title, category, description, price, isTrade, location, condition, status, longitude, latitude });
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }
        
        // Log the data being inserted
        console.log('Inserting listing with data:', { clerkID, title, category, description, price, isTrade, location, condition, status, longitude, latitude });

        // Insert the user into the database, await waits for this to finish before moving on
        const response = await sql `
            -- Insert a new listing into the listings table
            INSERT INTO listings (user_id, title, category_id, description, price, is_trade, location, condition, status, longitude, latitude)
            VALUES (
                (SELECT user_id FROM users WHERE clerk_id = ${clerkID}),
                ${title}, 
                ${category}, 
                ${description}, 
                ${price}, 
                ${isTrade}, 
                ${location},
                ${condition},
                ${status},
                ${longitude},
                ${latitude}
            )
        `;

        // Log the response from the database
        console.log('Database response:', response);

        return new Response(JSON.stringify({ data: response }), { status: 200 });
        

    } catch (error) {
        console.log('Error inserting listing:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}


/*
Listings Table:
- listing_id
- user_id // FK to users table
- title
- category_id // FK to categories table
- description
- price
- images
- condition
- is_trade
- location

Users Table:
- user_id
- clerk_id

Categories Table:
- category_id
- category_name

*/