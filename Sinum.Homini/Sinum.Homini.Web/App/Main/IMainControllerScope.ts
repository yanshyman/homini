'use strict';

module homini.controllers {
    import Task = homini.models.Task;

    export interface IMainControllerScope extends ng.IScope {
        controller: MainController;
        newTask: Task;
        tasksStorage: Task[];
        editedTask: Task;
        uncompletedTasks: Task[];
        completedTasks: Task[];
        allChecked: boolean;
        statusFilter: any;
        filterParameter: any;
    }
}