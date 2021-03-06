'use strict';

var nahuel11App = 
angular
  //url navigation
  .module('nahuel11App', [
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap',
    'toasty'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/titles/:titleCode?', { //optional parameter
        templateUrl: 'views/titles.html',
        controller: 'TitleCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/titles'
      });
  })

  // backend connection and methods
  .factory('dataFactory', ['$http', function($http){ 
    var urlBase = 'http://nodejs-nodo1-dev.psi.unc.edu.ar:3004/api/'; //TODO: replace it for the actual url
    var dataFactory = {};
    
    //get all titles
    dataFactory.getTitles = function (searchFilters){
      searchFilters = searchFilters || {}; // Null parameter case
      return $http.get(urlBase + 'titles', {params:searchFilters}); 
    };

    dataFactory.getResolutions = function (title){
      var idTitleReq = { idTitle: title.idTitle || null};
      return $http.get(urlBase + 'resolutions', {params:idTitleReq});
    }

    //get institutions
    dataFactory.getInstitutions = function (){
      return $http.get(urlBase + 'institutions');
    };

    //get all academic units
    dataFactory.getAcademicUnits = function (){
      return $http.get(urlBase + 'academicUnits');
    };

    //get all career types
    dataFactory.getCareerTypes = function (){
      return $http.get(urlBase + 'careerTypes');
    };

    //get all title types
    dataFactory.getTitleTypes = function (){
      return $http.get(urlBase + 'titleTypes');
    };

    //get all title types
    dataFactory.getTitleModes = function (){
      return $http.get(urlBase + 'titleModes');
    };

    //get all careers
    dataFactory.getCareers = function (){
      return $http.get(urlBase + 'careers');
    };

    //get all resolution types
    dataFactory.getResolutionTypes = function (){
      return $http.get(urlBase + 'resolutionTypes');
    };

    //get all academic units in a tree format
    dataFactory.getAcademicUnitsHierarchy = function (){
      return $http.get(urlBase + 'academicUnitsHierarchy');
    };

    //update a single title
    dataFactory.updateTitle = function(updatedTitle){
      return $http.post(urlBase + 'title', {title: updatedTitle});
    };

    //get or create resolution
    dataFactory.getResolution = function(requestedRes){
      return $http.post(urlBase + 'resolution', {resolution: requestedRes})
    };

    return dataFactory;
  }]
);
