'use strict';

module homini.models {
    export class Task {
        public id: string;
        public title: string;
        public createdBy: string;
        public completed: boolean;
        public description: string;
        public createdAt: Date;
        public updatedAt: Date;
        public completedAt: Date;
        public status: number;
        constructor() {
          
        }

    }
} 

