import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Transaction } from "./entity/transaction";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "imperial_bank",
    synchronize: true,
    logging: false,
    entities: [User, Transaction],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log('connected to the db');
    })
    .catch((error) => console.log(error))