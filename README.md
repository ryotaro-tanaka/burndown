# burndown
This is a simple application that displays a burndown chart.  
When You enter tasks when starting a new project I create a good graph.  
If you are adjusting schedule with excel try me. You can save time.  
![icon](https://raw.github.com/wiki/ryotaro-tanaka/burndown/assets/overview.png "icon")  

## Description
### *ideal point*
This is defined as follows. It's a fixed value.  
```
ideal point = 1 day's work = 10 point  
```
### start date(begin date)
This is the begin date of the project.
### tasks
This is the only input.  
Changes are reflected immediately in the graphs.  

Refer to the table and image below for the input contents.  

|No.|column name|description|
|-----:|:-----:|:-----|
|1|number|auto number|
|2|name|task name|
|3|expected cost|The cost you expected.|
|4|result cost|The resulting cost.|
|5|result year|end date of task.|
|6|result month|end date of task.|
|7|result day|end date of task.|

![task](https://raw.github.com/wiki/ryotaro-tanaka/burndown/assets/tasks.png "task")
### graphs
The y-axis is cost and the x-axis is date.  
Automatically created.  

![graphs](https://raw.github.com/wiki/ryotaro-tanaka/burndown/assets/graphs.png "graphs")
#### *result line*(indigo)
This is line graph connecting points of daily remaining cost.
#### *ideal line*(green)
This is a graph that connects the start date to the first expected end date.  
```
end date = start date + all expected cost / ideal point
```
#### *expected line*(orange)
This is a graph.
Calculate the end date from ideals and results. 
```
end date = start date + ideal * (result cost to now / expected cost to now)
```

## Demo
coming soon...  

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run dev #if necessary
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```

## The following is coming soon...
* Add additional feature of new project(database).
* Add selection feature of project(database).
* Keep *ideal point* on seven days a week.
* Add Demo to this page.

## author
Ryotaro Tanaka

## License
Waive copyright.  
When you clone this application, it's all yours.  
