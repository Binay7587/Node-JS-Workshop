import { DataTypes } from "sequelize";
import connection from "./index.js";

const userModel = connection.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,

            set(value) {
                this.setDataValue("username", value.toLowerCase());
            },

            get() {
                return "Hello "+this.getDataValue("username");
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        // createdAt: "created_at",
        // createdAt: false,
    }
);

export default userModel;