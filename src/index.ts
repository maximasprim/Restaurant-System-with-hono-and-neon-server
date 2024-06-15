import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import {logger} from 'hono/logger'
import {csrf} from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout} from 'hono/timeout'
import { userRouter } from './Users/user.router'
import { cityRouter } from './city/city.router'
import { stateRouter } from './state/state.router'
import { addressRouter } from './address/address.router'
import { HTTPException } from 'hono/http-exception'
import { type Context } from "hono";
import { html, raw} from 'hono/html'
import { prometheus } from '@hono/prometheus'
import { driverRouter } from './drivers/driver.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { orderRouter } from './orders/order.router'
import { commentsRouter } from './comments/comments.router'
import { restaurant_ownerRouter } from './restaurant_owner/restaurant_owner.router'
import { categoryRouter } from './category/category.router'
import { menu_itemRouter } from './menu_item/menu_item.router'
import { order_menu_itemRouter } from './order_menu_item/order_menu_item.router'
import { status_catalogueRouter } from './status_catalogue/status_catalogue.router'
import { orderStatusRouter } from './order_status/order_status.router'
import { authRouter } from './auth/auth.router'
import { userRelationsRouter } from './relations/userRelations/userRelations.router'
import { addressRelationsRouter } from './relations/addressRelations/addressRelations.router'
import { ordersRelationsRouter} from './relations/orderRelations/orderRelations.router'
import { driverRelationsRouter } from './relations/driverRelations/driverRelations.router'

const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

  const { printMetrics, registerMetrics } = prometheus()
//inbuilt middlewares

app.use(logger())//logs requests and response on the console
app.use(csrf())//prevents csrf attacks by checking request headrers
app.use(trimTrailingSlash())//removes trailing slash from request url
app.use('/time',timeout(10000, customTimeoutException))

// 3rd party middleware

app.use('*', registerMetrics)
// /default route

app.get('/', (c) => {
  const frontPage =`(
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to My Restaurant API</title>
    <style>
        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: rgb(79, 96, 194);
            background-image: url('../restaurant\ fronpage.jpg'); /* Replace with your image path */
            background-size: cover;
            background-position: center;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        /* Container Styles */
        .container {
            max-width: 800px;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-top: 20px;
        }

        /* Sidebar Styles */
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 200px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .sidebar a {
            display: block;
            padding: 10px 0;
            color: #007bff;
            text-decoration: none;
            font-size: 14px; /* Smaller font size */
            transition: background-color 0.3s ease, transform 0.3s ease; /* Add transition for hover effects */
        }

        .sidebar a:hover {
            background-color: #f1f1f1;
            transform: scale(1.05); /* Slightly enlarge the link on hover */
        }

        /* Header Styles */
        header {
            margin-left: 220px; /* Adjusted to make space for the sidebar */
            padding: 10px 20px;
            width: calc(100% - 240px); /* Adjusted to make space for the sidebar */
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Header Title Styles */
        header h1 {
            margin: 0;
            font-size: 50px;
            color: #2917d1; /* Adjusted to match your original color */
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }

        /* Content Styles */
        .content {
            margin-left: 220px; /* Adjusted to make space for the sidebar */
            padding: 20px;
            width: calc(100% - 240px); /* Adjusted to make space for the sidebar */
            text-align: left; /* Align text to the left */
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin-top: 20px;
        }

        li {
            margin: 10px 0;
            font-size: 18px;
            color: #333; /* Adjusted to be more readable */
        }

        li b {
            font-weight: bold;
            color: #555;
        }

        /* Footer Styles */
        footer {
            margin-top: auto;
            width: 100%;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            font-size: 25px;
        }

        .section-title {
            font-size: 20px;
            margin-top: 20px;
            color: #444;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <a href="/api/users">Users</a>
        <a href="/api/states">States</a>
        <a href="/api/cities">Cities</a>
        <a href="/api/drivers">Drivers</a>
        <a href="/api/address">Addresses</a>
        <a href="/api/restaurant">Restaurants</a>
        <a href="/api/orders">Orders</a>
        <a href="/api/comments">Comments</a>
        <a href="/api/restaurant_owner">Restaurant Owners</a>
        <a href="/api/category">Categories</a>
        <a href="/api/menu_item">Menu Items</a>
        <a href="/api/order_menu_item">Order Menu Items</a>
        <a href="/api/status_catalogues">Status Catalogue</a>
        <a href="/api/orderStatus">Order Status</a>
        <a href="/api/auth/register">Register user</a>
        <a href="/api/auth/login">User login</a>
        
    </div>
    <header>
        <h1>Welcome to My Restaurant API</h1>
    </header>
    <div class="container content">
        <section>
            <p style="font-size: 20px;">This API provides access to restaurant information, including menus, locations, reviews, and more. Whether you're looking to integrate restaurant data into your application or build new features, this API has you covered.</p>
        </section>
        <section>
            <h2 class="section-title">Quick Start Guide</h2>
            <p>To get started, follow these steps:</p>
            <ul>
                <li>1. Register for an API key.</li>
                <li>2. Read through the documentation.</li>
                <li>3. Start making requests to our endpoints.</li>
            </ul>
        </section>
       
        <section>
            <h2 class="section-title">API Endpoints</h2>
            <ul>
                <li><b>/users</b> - Manage users</li>
                <li><b>/states</b> - Manage states</li>
                <li><b>/cities</b> - Manage cities</li>
                <li><b>/drivers</b> - Manage drivers</li>
                <li><b>/addresses</b> - Manage addresses</li>
                <li><b>/restaurants</b> - Manage restaurants</li>
                <li><b>/orders</b> - Manage orders</li>
                <li><b>/comments</b> - Manage comments</li>
                <li><b>/restaurant_owners</b> - Manage restaurant owners</li>
                <li><b>/categories</b> - Manage categories</li>
                <li><b>/menu_items</b> - Manage menu items</li>
                <li><b>/order_menu_items</b> - Manage order menu items</li>
                <li><b>/status_catalogue</b> - Manage status catalogue</li>
                <li><b>/order_status</b> - Manage order status</li>
                <li><b>/auth/register</b> - Authentication</li>
                <li><b>/auth/login</b> - Authorization</li>
                
            </ul>
        </section>
        <section>
            <h2 class="section-title">Contact Information</h2>
            <p>If you have any questions or need support, please contact us at <a href="mailto:michaelmwasame6@gmail.com">support@myrestaurantapi.com</a>.</p>
        </section>
    </div>
    <footer>&copy; Maximas <script>document.write(new Date().getFullYear())</script></footer>
</body>
</html>

    
    `;
    return c.html(frontPage);
  })
app.get('/ok', (c) => {
  return c.text('The server is running fine')
})

app.get('/time', async(c) =>{
  
    await new Promise((resolve) => setTimeout(resolve, 11000))
  
  return c.text("data after 5 seconds",200)
})


app.get('/metrics', printMetrics)


// custom route
app.route("/",userRouter)  //users
app.route("/",stateRouter)  //users
app.route("/",cityRouter)
app.route("/",driverRouter)
app.route("/",addressRouter)
app.route("/",restaurantRouter)
app.route("/",orderRouter)
app.route("/",commentsRouter)
app.route("/",restaurant_ownerRouter)
app.route("/",categoryRouter)
app.route("/",menu_itemRouter)
app.route("/",order_menu_itemRouter)
app.route("/",status_catalogueRouter)
app.route("/",orderStatusRouter)
app.route("auth/",authRouter)
app.route("/",userRelationsRouter)
app.route("/",addressRelationsRouter)
app.route("/",ordersRelationsRouter)
app.route("/",driverRelationsRouter)


console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) 
})
