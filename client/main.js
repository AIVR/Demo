import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

ToDo = new Mongo.Collection('todo');

Router.route('/', {
    name : 'mainPage',
    template: 'mainPage'
}); 

Router.route('/signupForm');

Router.route('/loginForm');

Router.route('/workPage');

Router.route('/clickMe');

Router.route('/toDoList');

Template.signupForm.events({
  'submit #signup-form': function(e,t){
      e.preventDefault();

      Accounts.createUser({
      username: t.find("#signup-username").value,
      email: t.find("#signup-email").value,
      password: t.find("#signup-password").value,
      profile: {
        name: t.find("#signup-name").value
      }
    }, function(error) {
      if (error) {
        alert("Unable to register")
      }
    });

    }
});


Template.logoutForm.events({
  'submit #logout-form': function(){
      event.preventDefault();
      Meteor.logout(function(error){
          if(error){
            alert("Unable to logout user");
          }
      });
  }


});


Template.loginForm.events({
  "submit #login-form": function(e, t) {
    e.preventDefault();
    Meteor.loginWithPassword(
      t.find("#login-username").value,
      t.find("#login-password").value,
      function(error) {
        if (error) {
          alert("Unable to login")
        }
      }
    );
  }
});


// click Me function
Template.clickMe.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.clickMe.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.clickMe.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});



// ToDo list function
Template.toDoList.helpers({
  tasks: [
    {text: 'This is the first task'},
    {text: 'This is the second task'},
    {text: 'This is the third task'},
    {text: 'This is the fourth task'},
    {text: 'This is the fifth task'},
  ]


});