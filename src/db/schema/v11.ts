/*
Copyright 2019 matrix-appservice-discord

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {IDbSchema} from "./dbschema";
import {DiscordStore} from "../../store";
import { Log } from "../../log";

const log = new Log("SchemaV11");

export class Schema implements IDbSchema {
    public description = "create stores for bot sdk";

    public async run(store: DiscordStore): Promise<void> {
        try {
            store.createTable("CREATE TABLE registered_users (user_id TEXT UNIQUE NOT NULL);", "registered_users");
            store.createTable("CREATE TABLE as_txns (txn_id TEXT UNIQUE NOT NULL);", "as_txns");
        } catch (ex) {
            log.error("Failed to apply indexes:", ex);
        }

    }

    public async rollBack(store: DiscordStore): Promise<void> {
        await store.db.Exec(
            `DROP TABLE IF EXISTS registered_users;
            DROP TABLE IF EXISTS as_txns;`,
        );
    }
}