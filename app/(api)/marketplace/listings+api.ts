import { neon } from '@neondatabase/serverless';

// API Route: /(api)/listings

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const category = url.searchParams.get('category') || '';
        const location = url.searchParams.get('location') || '';
        const sortby = url.searchParams.get('sortby') || '';
        const price_min = url.searchParams.get('price_min');
        const price_max = url.searchParams.get('price_max');
        const searchQuery = url.searchParams.get('searchQuery') || '';

        // console.log('Received filters:', { category, location, sortby, price_min, price_max, searchQuery });

        const sql = neon(`${process.env.DATABASE_URL}`);

        let query = `
            SELECT 
                listings.listing_id,
                listings.user_id,
                listings.title,
                listings.price,
                listings.location,
                listings.is_featured,
                categories.category_name, 
                users.first_name, 
                users.last_name
            FROM 
                listings
            JOIN 
                categories 
            ON 
                listings.category_id = categories.category_id
            JOIN 
                users 
            ON 
                listings.user_id = users.user_id
            WHERE 
                listings.status = 'Active'
                AND ($1 = '' OR categories.category_name = $1)
                AND ($2 = '' OR listings.location = $2)
                AND ($3 = '' OR listings.title ILIKE '%' || $3 || '%')
        `;

        const params = [category, location, searchQuery];

        if (price_min) {
            query += ` AND listings.price >= $${params.length + 1}`;
            params.push(price_min);
        }

        if (price_max) {
            query += ` AND listings.price <= $${params.length + 1}`;
            params.push(price_max);
        }

        query += `
            ORDER BY 
                listings.is_featured DESC, 
                ${sortby === 'price' ? 'listings.price' : 'listings.created_at'} ASC
        `;

        // console.log('Constructed query:', query);
        // console.log('Query parameters:', params);

        const response = await sql(query, params);

        if (response.length === 0) {
            return new Response(JSON.stringify({ error: 'listings not found' }), { status: 404 });
        }
        // console.log('Response from database:', response);
        return new Response(JSON.stringify({ data: response }), { status: 200 });

    } catch (error) {
        console.log('Error fetching listings:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
};

// Listings Table:
// - listing_id
// - user_id // FK to users table
// - title
// - price (numeric 10,2)
// - description
// - status (Active, Inactive...)
// - is_trade (boolean)
// - location
// - condition
// - longitude
// - latitude
// - created_at
// - category_id // FK to categories table
// - is_featured (boolean)
// - featured_end_date
