<template>
    <div>
        <div>{{ text }}</div>
        <!-- <input type="button" value="aiueo" @click="select()"> -->
    </div>
</template>

<script>
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('db/test2.db');

export default {
    data: function() {
        return {
            text: 'aaaa'
        }
    },
    created: function() {
        this.select();
        db.close();
    },
    methods: {
        select: function () {
            const comp = this;
            db.serialize(function() {
                db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
                    if (err) throw err;
                    comp.text = comp.text + row.id + ": " + row.info + "|";
                });
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
