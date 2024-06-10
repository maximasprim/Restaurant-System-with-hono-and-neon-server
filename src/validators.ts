import { z } from 'zod'


export const userSchema = z.object({
    id:z.number(),
    name:z.string(),
    contact_phone:z.number(),
    phone_verified:z.boolean(),
    email:z.string().email(),
    email_verified:z.boolean(),
    confirmation_code:z.number(),
    password:z.string(),
    // created_at: z.number(),
    // updated_at: z.number()
    
})
export const stateSchema = z.object({
    id:z.number(),
    name:z.string(),
    code:z.string(),
        
})

export const citySchema = z.object({
    id:z.number(),
    name:z.string(),
    state_id:z.number()
    
    
})
export const driverSchema = z.object({
    id:z.number(),
    car_make:z.string(),
    car_model:z.string(),
    car_year:z.number(),
    user_id:z.number(),
    online:z.boolean(),
    delivering:z.boolean(),
    

})

export const addressSchema = z.object({
    id:z.number(),
    street_address_1:z.string(),
    street_address_2:z.string(),
    zip_code:z.number(),
    delivery_instructions:z.string(),
    user_id:z.number(),
    city_id:z.number()
})

export const restaurantSchema = z.object({
    id:z.number(),
    name:z.string(),
    street_address:z.string(),
    zip_code:z.number(),
    city_id:z.number()
})

export const ordersSchema = z.object({
    id:z.number(),
    restaurant_id:z.number(),
    estimated_delivery_time:z.string(),
    actual_delivery_time:z.string(),
    delivery_address_id:z.number(),
    user_id:z.number(),
    driver_id:z.number(),
    price:z.number(),
    discount:z.number(),
    final_price:z.number(),
    comment:z.string()
})
export const commentsSchema = z.object({
    id:z.number(),
    order_id:z.number(),
    user_id:z.number(),
    comment_text:z.string(),
    is_complaint:z.boolean(),
    is_praise:z.boolean()
})

export const restaurant_ownerSchema = z.object({
    id:z.number(),
    restaurant_id:z.number(),
    owner_id:z.number()
})
export const categorySchema = z.object({
    
})
export const menu_itemSchema = z.object({
    
})

export const order_menu_itemSchema = z.object({
    
})
export const status_catalogueSchema = z.object({

})
export const orderStatusSchema = z.object({

})