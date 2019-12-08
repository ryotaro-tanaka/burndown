import Vue from 'vue'
import Vuex from 'vuex'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db/sch.db');

const weeklyModule = {
    state: {
        count: 100,
        weekly: []
    },
    getters: {},
    mutations: {
        SET_COUNT (state, status) {
            state.count = status
        },
        SET_WEEKLY (state, status) {
            state.weekly = status
        }
    },
    actions: {
        addCount ({commit, state}, {num}) {
            commit('SET_COUNT', state.count + num);
        },
        setWeekly ({commit}) {
            db.serialize(() => {
                db.all("SELECT * FROM Weekly",[], (err, rows) => {
                    if (err) throw err;
                    commit('SET_WEEKLY', rows);
                });
            });
        }
    }
}

const startDayModule = {
    state: {
        year: 1970,
        month: 0,
        day: 1
    },
    getters: {
        startDay: state => {
            return new Date(state.year, state.month, state.day);
        }
    },
    mutations: {
        SET_YEAR (state, status) {
            state.year = status;
        },
        SET_MONTH (state, status) {
            state.month = status;
        },
        SET_DAY (state, status) {
            state.day = status;
        }
    },
    actions: {
        setStartDay ({commit}) {
            db.serialize(() => {
                db.each('select * from StartDay limit 1', (err, row) => {
                    if(err) throw err;
                    commit('SET_YEAR', row.year);
                    commit('SET_MONTH', row.month);
                    commit('SET_DAY', row.day);
                });
            });
        }
    }
}

const tasksModule = {
    state: {
        tasksTableName: 'Tasks',
        tasks: []
    },
    getters: {},
    mutations: {
        SET_TASKS (state, status) {
            state.tasks = status;
        }
    },
    actions: {
        setTasks ({commit}) {
            db.serialize(() => {
                db.all("SELECT * FROM Tasks", [], (err, rows) => {
                    if (err) throw err;
                    commit('SET_TASKS', rows);
                });
            });
        },
        insertTask ({commit}, {task_id, name, expectationsCost/*, resultCost, isCompleted*/}){
            console.log(commit);
            db.serialize(() => {
                db.prepare('update Tasks set task_id = -(task_id + 1) where task_id >= ?')
                    .run(task_id);
                db.prepare('update Tasks set task_id = -(task_id) where task_id < 0')
                    .run();
                db.prepare(`insert into Tasks (task_id, name, expectations_cost, result_cost, is_completed) values(?, ?, ?, 0, 0)`)
                    .run(task_id, name, expectationsCost)
                    .finalize();
            });
            this.dispatch('setTasks');
        },
        deleteTask ({commit}, {task_id}) {
            console.log(commit);
            db.serialize(() => {
                db.prepare('delete from Tasks where task_id = ?')
                    .run(task_id);
                db.prepare('update Tasks set task_id = task_id - 1 where task_id >= ?')
                    .run(task_id)
                    .finalize();
            });
            this.dispatch('setTasks');
        },
        updateResult ({commit}, {task_id, result_cost}) {
            console.log(commit);
            db.serialize(() => {
                let isCompleted = (result_cost !== 0);
                db.prepare('update Tasks set result_cost = ?, is_completed = ? where task_id = ?')
                    .run(result_cost, isCompleted, task_id)
                    .finalize();
            });
            this.dispatch('setTasks');
        }
    }
}

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        weekly: weeklyModule,
        startDay: startDayModule,
        tasks: tasksModule
    }
});
