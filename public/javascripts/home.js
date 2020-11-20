   <!-- Start running your app -->

      var vueinst = new Vue({

        el: '#home',
        data: {

            newTaskTitle: "",
            newTaskDes: "",

            //Temp Var For Holding Type of New Task
            newTaskType: "",
            //Temp Var for Holding Status of Task
            statusHolder: "",
            //Temp Variable for Holding Task Id
            idHolder: "",

            //Days in Week
            days: [
            {id : "1", day: "Monday"},
            {id : "2", day: "Tuesday"},
            {id : "3", day: "Wednesday"},
            {id : "4", day: "Thursday"},
            {id : "5", day: "Friday"},
            {id : "6", day: "Saturday"},
            {id : "7", day: "Sunday"}
            ],

            event: "blank", //event string

            //Temp User Detail Var
            tFirstName: "",
            tLastName: "",
            tEmail: "",
            tPass: "",


            //Three Core Arrays Used To Render Task Based on Their Status

            todo:[
            ],

            doing :
            [
            ],

            done:
            [
            ],

            //The Events retrived from server
            allEvents:[],

            //Temp Task Selected
            Tselected: [],

            //Temp User Selected
            Uselected: [],
            //Temp Day Selected
            Dselected:"",

            //Due Day Of Task That is Clicked ON
            opendueday: "",

            //Temp Preference Variable
            Pselected:"",

            //The Temo Holder for the Preference to Delete
            Pdselected: "",

            //All Users Assigned to A Task
            assignedUsers:[],

            //Hold The User Details
            user: [],
            // All Users In Workspace
            users: [],

            //All Types of Task
            types:[],

            //Availble Users for A Specfic Task once Type is entered
            Ausers:[],

            //Place Holder for Task Type
            temptype: [],

            tempassign:[],

            opentaskid:[],

            userAvail:[],

            userPref:[],

            fnameHolder:'',
            lnameHolder:'',
            emailHolder:'',
            usernameHolder:'',


            taskTitle: "Enter a Title",
            taskDescription: "Enter a New Description",

            date: Date(),
            board: false, //Show popup
            sboard: false, //Show Settings
            username: "please login",
            showAdmin: false, //Show admin items

        },




        methods: {


        //Get the User

             getUser : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.user = JSON.parse(xhttp.responseText);



          //Check Here if User is Admin then show all admin controls like create task

             if(vueinst.user.admin == 1){
                vueinst.showAdmin = true;
            }else{
                vueinst.showAdmin = false;
            }


                }
            };
                    xhttp.open("GET", "/users/getUser", true);
                    xhttp.send();

            },






        //Get All the Users in Workspace

          getAllUsers : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.users = JSON.parse(xhttp.responseText);
            }
        };
            xhttp.open("GET", "/users/getAllUsers", true);
            xhttp.send();


            },



        //Get Tasks with STAT as to do
            getTasksTodo : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.todo = JSON.parse(xhttp.responseText);
            }


           else if (this.readyState == 4 && this.status == 403) {
           window.location.href = '/login.html';
            }
        };
            xhttp.open("GET", "/users/getTasksTodo", true);
            xhttp.send();


            },



         //Get Task with STAT as to do assigned to LOGGED IN USER
            getTasksTodoUser : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.todo = JSON.parse(xhttp.responseText);
                //Set the To DO Column with the Response

                }
            };
                    xhttp.open("POST", "/users/getTasksTodoUser", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();

            },


            //Get Task With STAT as DOING
            getTasksDoing : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.doing = JSON.parse(xhttp.responseText);
            }
        };
            xhttp.open("GET", "/users/getTasksDoing", true);
            xhttp.send();


            },



                 //Get Tasks with STAT as doing assigned to LOGGED IN USER

          getTasksDoingUser : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.doing = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/getTasksDoingUser", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();

            },



          //Get Tasks with STAT as done
        getTasksDone : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.done = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", "/users/getTasksDone", true);
        xhttp.send();


            },

            //get Tasks with STAT as done assigned to LOGGED IN USER

              getTasksDoneUser : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.done = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/getTasksDoneUser", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send();

            },


            //GET to do, doing and done tasks for logged in user

            getUserTasks : function(){

              vueinst.getTasksTodoUser();
              vueinst.getTasksDoingUser();
              vueinst.getTasksDoneUser();

            },





            //POPUP when task is clicked on
            openTask : function(name, description, id, dueday){


            vueinst.assignedUsers = ''; //Blank until assigned users loads
            vueinst.board = true; //show the popup
            vueinst.Tselected = ''; //Blankout type selected
            vueinst.Uselected = '';//Blankout all users


            vueinst.getTaskTypes(); //get all the possible task types
            vueinst.findUsers(); //find users available for this task


            vueinst.taskTitle = name; //set the taskTitle holder the name var
            vueinst.taskDescription = description; //




            vueinst.opentaskid = id; //the taskid of the opened task
            vueinst.opendueday = dueday; //the due day of the opened task
            vueinst.getassignTask(); //get assigned users







            },


            changeFirstname : function(){
            //This Function Changes on Server the Status of the Task When Dragged and Dropped
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                   console.log('FName Changed');
                }
            };
                    xhttp.open("POST", "/users/changeFirstname", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({first_name: this.fnameHolder}));

            },



               changeLastname : function(){

                    if(this.lnameHolder){ //Check if it is not empty
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                    console.log('LName Changed');
                }
            };
                    xhttp.open("POST", "/users/changeLastname", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({last_name: this.lnameHolder}));
                    }
            },




                 changeEmail : function(){

                     if(this.emailHolder){ //Check if it is not empty
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                    console.log('Email Changed');
                }
            };
                    xhttp.open("POST", "/users/changeEmail", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({email: this.emailHolder}));
                     }
            },


                //Change Username

               changeUsername : function(){

                   if(this.usernameHolder){ //see if something in username placeholder
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  console.log('Username Changed');
                }
            };
                    xhttp.open("POST", "/users/changeUsername", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({username: this.usernameHolder}));
                   }
            },



            //Add User Availability based on Day Selected
           addAvail : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.getAvail();

                }
            };
                    xhttp.open("POST", "/users/addAvail", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({day_avail: this.Dselected}));

            },


            //Del User Availability based on Day Selected
               delAvail : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.getAvail();

                }
            };
                    xhttp.open("POST", "/users/delAvail", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({day_avail: this.Dselected}));

            },


        //Get User Availbility

             getAvail : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  vueinst.userAvail = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/getAvail", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                 xhttp.send();

            },



                //Add User Prefrence based on Pref Selected


      addPref : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.getPref();

                }
            };
                    xhttp.open("POST", "/users/addPref", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({prefid: this.Pselected}));

            },


         //Delete User Prefrence based on Pref Selected


             delPref : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.getPref();

                }
            };
                    xhttp.open("POST", "/users/delPref", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({prefid: this.Pselected}));

            },
                getPref : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  vueinst.userPref = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/getPref", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                 xhttp.send();

            },


                        //Get all Possible Task Types created by Admins

        getTaskTypes : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.types = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", "/users/getTaskTypes", true);
        xhttp.send();


            },


        //Create Task Types created by Admins


           uploadType : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                  vueinst.getTaskTypes();
                  vueinst.temptype = '';


                }
            };
                    xhttp.open("POST", "/users/addType", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({typeTitle: this.temptype}));

            },



        //Delete a Task Type aka a Preference

            deleteType : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                  vueinst.getTaskTypes();
                  vueinst.getPref();
                  vueinst.Pdselected = '';


                }
            };
                    xhttp.open("POST", "/users/delType", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({typeTitle: this.Pdselected}));

            },




            //Find Avail Users based on Task Due Date and Type of Task


            findUsers : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                vueinst.Ausers = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/findUsers", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({type_id:this.Tselected, day:this.opendueday}));

            },


         //Assign Task to a User


               assignTask : function(){

                   if (this.Uselected){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  vueinst.getassignTask();

                }
            };
                    xhttp.open("POST", "/users/assignTask", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({task_id: this.opentaskid, user_id: this.Uselected}));
                   }
            },


        //Get the Users Who Are Assigned TO A Specfic Task

               getassignTask : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  vueinst.assignedUsers = JSON.parse(xhttp.responseText);

                }
            };
                    xhttp.open("POST", "/users/getassignTask", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({task_id: this.opentaskid}));

            },


        //Close Popup

        closeTask : function(){

            vueinst.board = false;
            },


         //Open Settings Menu
         openSettings : function(){
            vueinst.sboard = true;
            vueinst.getTaskTypes(); //Get All Types of Tasks
            vueinst.getAvail();  //Get Selected Availbility
            vueinst.getPref();//Get Selected Preferences
            vueinst.gEvent();

            },


        //Close the Settings Menu

            closeSettings : function(){

            vueinst.sboard = false;
            },

            createTask : function(){

                   if(this.newTaskTitle && this.newTaskDes && this.Dselected){

                   /* this.todo.push({stat: 'todo', title: this.newTaskTitle, info: this.newTaskDes, due_day: this.Dselected }); */


                    vueinst.uploadTask(); //Upload to SQL Server

                     vueinst.bEvent2('created', this.newTaskTitle); //Broadcast Message

                    this.newTaskTitle = ""; //Clear Place Holder
                    this.newTaskDes = ""; //Clear Place Holder

                    //The Task ID is generated on SQL Server
                }


            },

            //Upload a Newly Created Task to the Server

            uploadTask : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                  vueinst.getTasksTodo(); //Get the Tasks with the ID Now Generated on SQL server

                }
            };
                    xhttp.open("POST", "/users/addTask", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({stat:'todo', title: this.newTaskTitle, info: this.newTaskDes, due_day: this.Dselected}));

            },


            //Create a new task type

            addTaskType : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                vueinst.getTasksTodo();

                }
            };
                    xhttp.open("POST", "/addTaskType", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({type: this.newTaskType}));

            },

            changeTaskStat : function(){
            //This Function Changes on Server the Status of the Task When Dragged and Dropped
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                    this.statusHolder = "";//Clear the Place Holders
                    this.idHolder = "";

                }
            };
                    xhttp.open("POST", "/users/changeTask", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({stat: this.statusHolder, id: this.idHolder}));

            },



            //Start a task by pressing button

            startTask : function(id){
                //When Start Button is Pressed

               let index = this.todo.map(item => item.id).indexOf(id); //find the index
               this.todo[index].stat = 'doing';
               this.statusHolder = 'doing';
               this.idHolder = id;
               vueinst.bEvent(this.todo[index].title, 'Doing'); //Broadcast Event Action

               vueinst.changeTaskStat();

               this.doing.push(this.todo[index]);
               this.todo.splice(index, 1); // remove that index item from array

            },


            //Finish a task by pressing button

            finishTask : function(id){
                //When Done Button is Pressed
               let index = this.doing.map(item => item.id).indexOf(id); //find the index
               this.doing[index].stat = 'done';

               this.statusHolder = 'done';
               this.idHolder = id;
               vueinst.bEvent(this.doing[index].title, 'Done'); //Broadcast Event Action

               vueinst.changeTaskStat();

               this.done.push(this.doing[index]);
               this.doing.splice(index, 1); // remove that index item from array

            },


            //Delete a task

            deleteTask : function(id){  //When Delete Button is Pressed

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      console.log('Task Deleted');
                }
            };
                    xhttp.open("POST", "/users/deleteTask", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({id})); //Send Id To Delete

                //After SQL Server Deletes Task, Delete on Client Side
                let index = this.done.map(item => item.id).indexOf(id); //find the index
                vueinst.bEvent2("deleted",this.done[index].title);
                this.done.splice(index, 1); // remove that index item from array

            },


        //This is to broadcast event when a task has moved
            bEvent : function(title, loc){  //When Task Moves Location

              vueinst.event = this.user.first_name + ' '+ this.user.last_name + ' moved Task: ' + title + ' to '  + loc + '.';
              vueinst.uEvent();  //Upload the Event
            },

        //This is to broadcast an event when a task has been created or deleted

             bEvent2 : function(action, title){  //When Task is Created or Deleted

              vueinst.event = this.user.first_name + ' '+ this.user.last_name + ' ' + action + ' Task: ' + title + '.';
              vueinst.uEvent();  //Upload the Event
            },


            //This is to upload the event to the Sql Server from the placehodler
            uEvent : function(){

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      console.log('Event Uploaded');
                }
            };
                    xhttp.open("POST", "/users/uEvent", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({event: vueinst.event})); //Send Id To Delete



            },

            //Function to get all tasks

            getAllTasks : function (){
            this.getTasksTodo();
            this.getTasksDoing();
            this.getTasksDone();
            },


            //Get the events
          gEvent : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            vueinst.allEvents = JSON.parse(xhttp.responseText);
            }
        };
            xhttp.open("GET", "/users/gEvent", true);
            xhttp.send();


            },




        //When task has been dragged to done array
            dragDone: function({ added }) {
                //Watcher to See When A Task Dragged into Done Array
              if (added) {

              vueinst.bEvent(added.element.title, 'Done');

              added.element.stat = 'done';
              this.statusHolder = added.element.stat;
              this.idHolder = added.element.id;
              vueinst.changeTaskStat();
             }
            },

             //When task has been dragged to doing array

             dragDoing: function({ added }) {
                //Watcher to See When A Task Dragged into Doing Array

             if (added) {

              vueinst.bEvent(added.element.title, 'Doing');

              added.element.stat= 'doing';
              this.statusHolder = added.element.stat;
              this.idHolder = added.element.id;
              vueinst.changeTaskStat();


             }
         },


            //When task has been dragged to TO Do array
        dragTodo: function({ added }) {

            //Watcher to See When A Task Dragged into to do Array

             if (added) {

             vueinst.bEvent(added.element.title, 'To Do');
             added.element.stat = 'todo';
             this.statusHolder = added.element.stat;
             this.idHolder = added.element.id;
             vueinst.changeTaskStat();


             }
         },

        //Logout the client
         logout: function() {
        var xhttp = new XMLHttpRequest();

              xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
                window.location.href = '/login.html';
                }

              },

        xhttp.open("POST", "/logout", true);
        xhttp.send();
    },



        },



        computed: {
        // Computed Counters of Tasks in Array Shown To Client

        todoCount : function(){
            return this.todo.length;

        },

        doingCount : function(){
            return this.doing.length;

        },

        doneCount : function(){
            return this.done.length;

        },

        },


        created: function() {

            //When Page Loads Get all The Tasks and User Details

            this.getUser();
            this.getAllUsers();
            this.getTasksTodo();
            this.getTasksDoing();
            this.getTasksDone();


        },


      });





