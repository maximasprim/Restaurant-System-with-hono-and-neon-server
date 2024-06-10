import {
    integer,
    pgEnum,
    pgTable,
    serial,
    uniqueIndex,
    varchar,
    boolean,
    timestamp,
  //   defaultCurrentTimestamp()
  } from "drizzle-orm/pg-core";
  
  import { relations } from "drizzle-orm";

  // userTable creation
export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    contact_phone: varchar("contact_phone", { length: 20 }),
    phone_verified: boolean("phone_verified"),
    email: varchar("email", { length: 256 }),
    email_verified: boolean("email_verified"),
    confirmation_code: varchar("confirmation_code", { length: 256 }),
    password: varchar("password", { length: 256 }),
    // created_at: timestamp("created_at").notNull().defaultNow(),
    // updated_at: varchar("created_at", { length: 256 }),
  });

  
  // restaurant table creation
  export const restaurantTable = pgTable("restaurantTable", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      street_address: varchar("street_address", { length: 256 }).notNull(),
      zip_code: varchar("zip_code", { length: 10 }).notNull(),
      city_id: integer("city_id").references(() => cityTable.id).notNull(),
      created_at: timestamp("created_at").notNull().defaultNow(),
      updated_at: timestamp("updated_at").notNull().defaultNow(),
    });
  
  // category table creation
    export const categoryTable = pgTable("category", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
    });
    
  // menu table creation
  export const menuItemTable = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.id),
    category_id: integer("category_id").notNull().references(() => categoryTable.id),
    description: varchar("description", { length: 256 }).notNull(),
    ingredients: varchar("ingredients", { length: 256 }).notNull(),
    price: varchar("price", { length: 256 }).notNull(),
    active: boolean("active").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  });
  // ordermenuItemTable creation
  export const orderMenuItemTable = pgTable("order_menu_item", {
      id: serial("id").primaryKey(),
      order_id: integer("order_id").notNull().references(() => ordersTable.id),
      menu_item_id: integer("menu_item_id").notNull().references(() => menuItemTable.id),
      quantity: integer("quantity").notNull(),
      item_price: varchar("item_price", { length: 256 }).notNull(),
      price: varchar("price", { length: 256 }).notNull(),
      comment: varchar("comment", { length: 256 }).notNull()
    });
  
  //   state table creation
  export const stateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    code: varchar("code", { length: 20 }).notNull(),
  });
  // address table creation
  export const addressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    street_address_1: varchar("street_address_1", { length: 256 }),
    street_address_2: varchar("street_address_2", { length: 256 }),
    zip_code: varchar("zip_code", { length: 10 }),
    delivery_instructions: varchar("delivery_instructions", { length: 256 }),
    user_id: integer("user_id").references(() => usersTable.id),
    city_id: integer("city_id").references(() => cityTable.id),
    // created_at: timestamp("created_at").defaultNow(),
    // updated_at: timestamp("updated_at").defaultNow(),
  });
  // city table creation.defaultNow()
  export const cityTable = pgTable("city", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      state_id: integer("state_id").notNull().references(() => stateTable.id),
    });
  
  //   commentTable creation
  export const commentTable = pgTable("comments", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => ordersTable.id),
    user_id: integer("user_id").references(() => usersTable.id),
    comment_text: varchar("comment_text", { length: 256 }),
    is_complaint: boolean("is_complaint"),
    is_praise: boolean("is_praise"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  // driver table creation
  export const driversTable = pgTable("drivers", {
    id: serial("id").primaryKey(),
    car_make: varchar("car_make", { length: 256 }),
    car_model: varchar("car_model", { length: 256 }),
    car_year: integer("car_year"),
    user_id: integer("user_id").references(() => usersTable.id),
    online: boolean("online"),
    delivering: boolean("delivering"),
    // created_at: timestamp("created_at").defaultNow(),
    // updated_at: timestamp("updated_at").defaultNow(),
  });
  
  // orderStatusTable creation
  
  export const orderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => ordersTable.id),
    status_catalog_id: integer("status_catalog_id").references(
      () => statusCatalogueTable.id
    ),
    created_at: varchar("created_at", { length: 256 }),
  });
  
  
  
  // statusCatalogueTable creation
  export const statusCatalogueTable = pgTable("status_catalog", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 256 }),
    });
  
  // orders table creation
  export const ordersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => restaurantTable.id),
    estimated_delivery_time: varchar("estimated_delivery_time", { length: 256 }),
    actual_delivery_time: varchar("actual_delivery_time", { length: 256 }),
    delivery_address_id: integer("delivery_address_id").references(
      () => addressTable.id),
    user_id: integer("user_id").references(() => usersTable.id),
    driver_id: integer("driver_id").references(() => driversTable.id),
    price: varchar("price", { length: 256 }),
    discount: varchar("discount", { length: 256 }),
    final_price: varchar("final_price", { length: 256 }),
    comment: varchar("comment", { length: 256 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  

  // restaurantOwner table creation
  export const restaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => restaurantTable.id),
    owner_id: integer("owner_id").references(() => usersTable.id),
  });
  
  // Table relationships
  
  // menu_item relations
  
  export const menuItemRelations = relations(menuItemTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
      fields: [menuItemTable.restaurant_id],
      references: [restaurantTable.id],
    }),
    category: one(categoryTable, {
      fields: [menuItemTable.category_id],
      references: [categoryTable.id],
    }),
  }));
  
  //category relations
  export const categoryMenuRelations = relations(categoryTable, ({ many }) => ({
    menuItems: many(menuItemTable),
  }));
  
  // restaurant relations
  
  export const restaurantRelations = relations(
    restaurantTable,
    ({ many, one }) => ({
      menuItem: many(menuItemTable),
      orders: many(ordersTable),
      city: one(cityTable, {
        fields: [restaurantTable.city_id],
        references: [cityTable.id],
      }),
      restaurantOwner: one(restaurantOwnerTable, {
        fields: [restaurantTable.id],
        references: [restaurantOwnerTable.restaurant_id],
      }),
    })
  );
  
  //A restaurant owner can own many restaurants
  export const restaurantOwnerRelations = relations(
    restaurantOwnerTable,
    ({ one, many }) => ({
      user: one(usersTable, {
        fields: [restaurantOwnerTable.owner_id],
        references: [usersTable.id],
      }),
      restaurant: one(restaurantTable, {
        fields: [restaurantOwnerTable.restaurant_id],
        references: [restaurantTable.id],
      }),
    })
  );
  
  //city
  
  export const cityRestaurantRelations = relations(
    cityTable,
    ({ many, one }) => ({
      restaurants: many(restaurantTable),
      addresses: many(addressTable),
  
      // one city belongs to one state
      state: one(stateTable, {
        fields: [cityTable.state_id],
        references: [stateTable.id],
      }),
    })
  );
  
  //state
  
  export const stateRelations = relations(stateTable, ({ many }) => ({
    cities: many(cityTable),
  }));
  
  //address
  
  export const addressRelations = relations(addressTable, ({ one, many }) => ({
    city: one(cityTable, {
      fields: [addressTable.city_id],
      references: [cityTable.id],
    }),
    user: one(usersTable, {
      fields: [addressTable.user_id],
      references: [usersTable.id],
    }),
    orders: many(ordersTable),
  }));
  
  
  
  export const orderRelations = relations(ordersTable, ({ one, many }) => ({
    restaurant: one(restaurantTable, {
      fields: [ordersTable.restaurant_id],
      references: [restaurantTable.id],
    }),
    deliveryAddress: one(addressTable, {
      fields: [ordersTable.delivery_address_id],
      references: [addressTable.id],
    }),
    user: one(usersTable, {
      fields: [ordersTable.user_id],
      references: [usersTable.id],
    }),
    driver: one(driversTable, {
      fields: [ordersTable.driver_id],
      references: [driversTable.id],
    }),
    orderMenuItems: many(orderMenuItemTable),
    orderStatuses: many(orderStatusTable),
    commentTable: many(commentTable),
  }));
  
  //order_menu_item relations
  
  export const orderMenuItemRelations = relations(
    orderMenuItemTable,
    ({ one }) => ({
      order: one(ordersTable, {
        fields: [orderMenuItemTable.order_id],
        references: [ordersTable.id],
      }),
      menuItem: one(menuItemTable, {
        fields: [orderMenuItemTable.menu_item_id],
        references: [menuItemTable.id],
      }),
    })
  );
  
  //order_status relations
  
  export const orderStatusRelations = relations(orderStatusTable, ({ one }) => ({
    order: one(ordersTable, {
      fields: [orderStatusTable.order_id],
      references: [ordersTable.id],
    }),
    statusCatalogue: one(statusCatalogueTable, {
      fields: [orderStatusTable.status_catalog_id],
      references: [statusCatalogueTable.id],
    }),
  }));
  
  //status_catalogue relations
  
  export const statusCatalogueRelations = relations(
    statusCatalogueTable,
    ({ many }) => ({
      orderStatuses: many(orderStatusTable),
    })
  );
  
  //drivers
  
  export const driverRelations = relations(driversTable, ({ one, many }) => ({
    user: one(usersTable, {
      fields: [driversTable.user_id],
      references: [usersTable.id],
    }),
    orders: many(ordersTable),
  }));
  
  export const userRelations = relations(usersTable, ({ many }) => ({
      addresses: many(addressTable),
      orders: many(ordersTable),
      comments: many(commentTable),
      drivers: many(driversTable),
      restaurantOwners: many(restaurantOwnerTable),
    }));
  
  export const commentRelations = relations(commentTable, ({ one }) => ({
    order: one(ordersTable, {
      fields: [commentTable.order_id],
      references: [ordersTable.id],
    }),
    user: one(usersTable, {
      fields: [commentTable.user_id],
      references: [usersTable.id],
    }),
  }));


export type TIAddress = typeof addressTable.$inferInsert;
export type TSAddress = typeof addressTable.$inferSelect;
 
export type TICategory = typeof categoryTable.$inferInsert;
export type TSCategory = typeof categoryTable.$inferSelect;
 
export type TICity = typeof cityTable.$inferInsert;
export type TSCity = typeof cityTable.$inferSelect;
 
export type TIComment = typeof commentTable.$inferInsert;
export type TSComment = typeof commentTable.$inferSelect;
 
export type TIDriver = typeof driversTable.$inferInsert;
export type TSDriver = typeof driversTable.$inferSelect;
 
export type TIMenuItem = typeof menuItemTable.$inferInsert;
export type TSMenuItem = typeof menuItemTable.$inferSelect;
 
export type TIOrderMenuItem = typeof orderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof orderMenuItemTable.$inferSelect;
 
export type TIOrderStatus = typeof orderStatusTable.$inferInsert;
export type TSOrderStatus = typeof orderStatusTable.$inferSelect;
 
export type TIOrders = typeof ordersTable.$inferInsert;
export type TSOrders = typeof ordersTable.$inferSelect;
 
export type TIRestaurant = typeof restaurantTable.$inferInsert;
export type TSRestaurant = typeof restaurantTable.$inferSelect;
 
export type TIState = typeof stateTable.$inferInsert;
export type TSState = typeof stateTable.$inferSelect;
 
export type TIStatusCatalogue = typeof statusCatalogueTable.$inferInsert;
export type TSStatusCatalogue = typeof statusCatalogueTable.$inferSelect;
 
export type TIUsers = typeof usersTable.$inferInsert;
export type TSUsers = typeof usersTable.$inferSelect;
 
export type TIRestaurant_owner = typeof restaurantOwnerTable.$inferInsert;
export type TSRestaurant_owner = typeof restaurantOwnerTable.$inferSelect;



  
  
  
  
  
  