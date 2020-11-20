 var vueinst = new Vue({

        el: '#login',

        data: {
          date: Date(),
          board: false,
          username: "",
          password: "",
          first_name: "",
          last_name: "",
          signup: false,
          email: "",
          admin: "",
          adminOp: [
              {id: '1', option: 'Yes'},
              {id: '0', option: 'No'}
              ],


        },

         methods: {

            authUser : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 window.location.href = '/home.html';

                }

           else if (this.readyState == 4 && this.status == 403) {
                 alert("Wrong Credentials");

                }
            };




                    if (this.username && this.password){
                    xhttp.open("POST", "/login", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({username: this.username, password: this.password}));

                    }

            },


            switchtoSignUp : function(){
              vueinst.signup = true;
            },

              switchtoLogIn : function(){
              vueinst.signup = false;
            },




         createAcc : function(){


            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  alert("Success, You can sign in now!");

                }
            };

               if (this.username && this.password && this.admin &&this.first_name &&this.last_name &&this.email){
                    xhttp.open("POST", "/signup", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({username: this.username, first_name: this.first_name, last_name: this.last_name, email: this.email, password: this.password, admin: this.admin }));
               }
            },




         checkLoggedIn : function(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             window.location.href = '/home.html';
            }
        };
            xhttp.open("GET", "/users/getUser", true);
            xhttp.send();
        },


         },



        created: function() {

            //When Page Loads Get all The Tasks

         this.checkLoggedIn();


        },





      });