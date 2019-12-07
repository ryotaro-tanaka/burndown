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
            db.serialize(function() {
                db.all("SELECT * FROM Weekly",[], function(err, rows) {
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
        month: 1,
        day: 0
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
            db.serialize(function() {
                db.all("SELECT * FROM Tasks",[], function(err, rows) {
                    if (err) throw err;
                    commit('SET_TASKS', rows);
                });
            });
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
