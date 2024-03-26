"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require("../../../app.ts");
class Database {
    static selectArticles(id) {
        const [results, metadata] = sequelize.query("SELECT * FROM article WHERE id = $1", {
            bind: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        return results;
    }
}
exports.Database = Database;
