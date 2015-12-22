angular.module('TodoApp', [])

.controller('AppCtrl', function($scope, TodoFactory) {

    var UUID = 0;

    $scope.todos = TodoFactory.get();

    $scope.saveTodo = function($event) {
        var $txt = ($scope.TodoText || '').trim();

        if ($event.keyCode === 13 && $txt.length > 0) {

            var todo = {
                id: UUID++,
                desc: $txt,
                isCompleted: false
            };

            // $scope.todos.push(todo);
            TodoFactory.post(todo);
            $scope.todos = TodoFactory.get();

            $scope.TodoText = '';
        }
    }

    $scope.setEditMode = function(todo, val) {
        todo.isEditMode = val;
    }

    $scope.editTodo = function(todo) {
        todo.tempPrevVal = todo.desc;
        $scope.setEditMode(todo, true);
    }

    $scope.cancelUpdate = function(todo) {
        todo.desc = todo.tempPrevVal;
        $scope.setEditMode(todo, false);
    }

    $scope.updateTodo = function($event, todo) {
        var $txt = (todo.desc || '').trim();

        if ($event.keyCode === 13 && $txt.length > 0) {
            $scope.setEditMode(todo, false);

            delete todo.isEditMode;
            delete todo.$$hashKey;
            delete todo.tempPrevVal;

            TodoFactory.put(todo);
            $scope.todos = TodoFactory.get();
        }
    }

    $scope.deleteTodo = function( /* idx */ todo) {
        //$scope.todos.splice(idx, 1);
        TodoFactory.delete(todo);
        $scope.todos = TodoFactory.get();
    }

})

.factory('TodoFactory', function(LSFactory) {

    return {
        get: function() {
            return LSFactory.getAll();
        },
        post: function(todo) {
            return LSFactory.post(todo.id + '_todo', todo);
        },
        put: function(todo) {
            return LSFactory.post(todo.id + '_todo', todo);
        },
        delete: function(todo) {
            return LSFactory.delete(todo.id + '_todo');
        }
    };
})

.factory('LSFactory', function($window) {

    return {

        getAll: function() {
            var collection = [];
            var ls = $window.localStorage;
            var keys = Object.keys(ls);

            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('_todo') > 0) {
                    collection.push(JSON.parse(ls[keys[i]]));
                }
            };

            return collection;
        },
        get: function(key) {
            return JSON.parse($window.localStorage.getItem(key));
        },
        post: function(key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        },
        put: function(key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        }, 
        delete: function(key){
        	 return $window.localStorage.removeItem(key);
        }

    };
})
