import {QueryTypes, where} from "sequelize";

const sequelize = require("../../../app.ts");

export class Database {
    static selectArticles(id: number) {
        const [results, metadata] =
            sequelize.query("SELECT * FROM article WHERE id = $1",
            {
                bind: [id],
                type: QueryTypes.SELECT
            })

        return results;
    }
}