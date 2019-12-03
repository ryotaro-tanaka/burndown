<template>
    <div>
        <div>{{weekly}}</div>
        <!-- <input type="button" value="aaaa" @click="loadWeekly()"> -->
    </div>
</template>

<script>
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('db/sch.db')

export default {
    components: {
    },
    data: function() {
        return {
            weekly: []
        }
    },
    mounted: function() {
        this.loadWeekly();
        db.close();
    },
    methods: {
        addData () {
            db.serialize(function () {
                const stmt = db.prepare("insert into users(id, name) values(?, ?)")
                stmt.run(100, 'John')
            })
        },
        loadWeekly: function() {
            let str = 'test';
            db.serialize(function () {
                str = 'serialize';

                db.get("select * from Weekly", function(err, row) {
                    if (err) {
                        str = 'err';
                    } else {
                        str = str + row.name;
                    }
                }, function(err, count){
                    if (err){
                        str = 'err2';
                    }else{
                        if (count === 0){
                            str = '0count';
                        }else{
                            str = '?count';
                        }
                    }
                });
            });

            this.weekly = '';
            this.weekly = str;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
