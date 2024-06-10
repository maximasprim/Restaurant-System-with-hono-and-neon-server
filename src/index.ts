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


console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) 
})
