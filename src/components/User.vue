<template>
    <div>
        <p>User Table</p>
        <button id='add-to-db' @click="addData()">データ登録</button>
    </div>
</template>

<script>
// @ is an alias to /src
import sqlite3 from 'sqlite3'
// let db = new sqlite3.Database('../db/testfile.db')
let db = new sqlite3.Database('testfile.db')

export default {
    name: 'User',
    methods: {
        addData () {
            db.serialize(function () {
                let stmt = db.prepare("insert into users('name', 'email', 'age') values(?, ?, ?)");
                stmt.run('John', 'test@test.local', 20);
                // 上記では例のために固定値を渡しているが、
                // 実際にはフォームから受け取った値などを渡す。
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
