if(typeof jQuery !== "undefined"){
$.ajax({
  url: '//munchkin.marketo.net/munchkin.js',
  dataType: 'script',
  cache: true,
  success: function() {
    Munchkin.init('382-MEZ-125');
  }
});
}
