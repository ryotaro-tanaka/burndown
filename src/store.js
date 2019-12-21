import Vue from 'vue'
import Vuex from 'vuex'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db/sch.db');

const weeklyModule = {
    state: {
        count: 100,
        weekly: [{
            week_id: -1,
            name: '',
            is_work: 0
        }]
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
        tasks: []
    },
    getters: {
        // tasksCount: state => {
        //     return state.tasks.length;
        // }
        allExpectedCost: state => {
            return state.tasks.reduce((p, task) => p + task.exp_cost, 0);
        },
        // allResultCost: state => {
        //     return state.tasks.reduce((p, task) => p + task.result_cost, 0);
        // },
        // lastDay: state => {
        //     const compuletedTasks = state.tasks.filter(task => {if(task.is_completed) return task;})
        //     return compuletedTasks.reduce((p, task) => 
        //         p.getTime() > new Date(task.result_year, task.result_month, task.result_day).getTime()?
        //         p:new Date(task.result_year, task.result_month, task.result_day) 
        //         ,new Date(1970, 0, 1));
        // },
        expectedCostToNow: state => {
            const compuletedTasks = state.tasks.filter(task => {if(task.is_completed) return task;});
            return compuletedTasks.reduce((p, task) => p + task.exp_cost, 0);
        },
        resultCostToNow: state => {
            const compuletedTasks = state.tasks.filter(task => {if(task.is_completed) return task;});
            return compuletedTasks.reduce((p, task) => p + task.result_cost, 0);
        },
    },
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
        insertTask () {
            db.serialize(() => {
                db.prepare('insert into Tasks (name, exp_cost, result_cost, is_completed, result_year, result_month, result_day) values ("new task", 0, 0, 0, 0, 0, 0)')
                    .run()
                    .finalize();
            });
            this.dispatch('setTasks');
        },
        deleteTask (context, {taskId}) {
            db.serialize(() => {
                db.prepare('delete from Tasks where task_id = ?')
                    .run(taskId);
                db.prepare('update Tasks set task_id = task_id - 1 where task_id > ?')
                    .run(taskId)
                    .finalize();
            });
            this.dispatch({type:'setTasks', fake:context});
        },
        updateTaskId(context, {oldTaskId, newTaskId}) {
            //TODO: incomplete promise
            return new Promise((resolve, reject) => {
                if(oldTaskId <= 0 || newTaskId <= 0 || oldTaskId === newTaskId) reject();

                db.serialize(() => {
                    db.prepare('update Tasks set task_id = -? where task_id = ?')
                        .run(newTaskId, oldTaskId);
                    db.prepare('update Tasks set task_id = -? where task_id = ?')
                        .run(oldTaskId, newTaskId);
                    db.prepare('update Tasks set task_id = -(task_id) where task_id < 0')
                        .run()
                        .finalize();
                });
                
                this.dispatch({type:'setTasks', fake:context});

                resolve(newTaskId);
            });
        },
        updateTaskValues(context, {taskId, name, expCost, resultCost, resultYear, resultMonth, resultDay}) {
            if(isNaN(parseInt(taskId)) || isNaN(parseInt(expCost)) || isNaN(parseInt(resultCost)) 
            || isNaN(parseInt(resultYear)) || isNaN(parseInt(resultMonth)) || isNaN(parseInt(resultDay))) {
                return;
            }

            db.serialize(() => {
                let isCompleted = (resultCost !== 0) && (resultYear >= 1970) && (resultMonth >= 0) && (resultDay > 0);
                db.prepare('update Tasks set name=?, exp_cost=?, result_cost=?, is_completed=?, result_year=?, result_month=?, result_day=? where task_id=?;')
                    .run(name, expCost, resultCost, isCompleted, resultYear, resultMonth, resultDay, taskId)
                    .finalize();
            });

            this.dispatch({type:'setTasks', fake:context});
        }
    }
}

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        weekly: weeklyModule,
        startDay: startDayModule,
        tasks: tasksModule
    },
    state: {
        idealPoint: 10,
        daysCount : 14, // how to change?
        graphWidth: 0,
        graphHeight:0
    },
    mutations: {
        SET_GRAPHWIDTH (state, status) {
            state.graphWidth = status;
        },
        SET_GRAPHHEIGHT (state, status) {
            state.graphHeight = status;
        }
    },
    actions: {
        setGraphWidth ({commit}, {val}) {
            commit('SET_GRAPHWIDTH', val);
        },
        setGraphHeight ({commit}, {val}) {
            commit('SET_GRAPHHEIGHT', val);
        }
    }
});
