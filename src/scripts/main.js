require.config({
  baseUrl: '../src/scripts/',
  shim : {
    'bootstrap'   : ["jquery"],
  },
  paths: {
    'jquery'      : 'jquery/2.1.1/jquery-2.1.1.min',
    'bootstrap'   : 'bootstrap/dist/js/bootstrap.min'
  }
});

require(['jquery','bootstrap'], function($) {
  $(function(){
    console.log("Hello world.");

    // $("body").css("background","#000");
  })
});