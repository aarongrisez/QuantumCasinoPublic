$(function() {
$('#red').bind('click', function() {
  $.getJSON($SCRIPT_URL, {
    measurement: 0 
  }, function(data) {
    $("#hint").text(data.next_hint);
    $("#trials").text(data.num_trials);
    $("#wins").text(data.wins);
    $("#losses").text(data.losses);
    $("#host_measurement").text(data.host_measurement);
    $("#guest_measurement").text(data.guest_measurement);
    $("#host_hint").text(data.host_hint);
    $("#guest_hint").text(data.guest_hint);
  });
  return false;
});
$('#blue').bind('click', function() {
  $.getJSON($SCRIPT_URL, {
    measurement: 1 
  }, function(data) {
    $("#hint").text(data.next_hint);
    $("#trials").text(data.num_trials);
    $("#wins").text(data.wins);
    $("#losses").text(data.losses);
    $("#host_measurement").text(data.host_measurement);
    $("#guest_measurement").text(data.guest_measurement);
    $("#host_hint").text(data.host_hint);
    $("#guest_hint").text(data.guest_hint);
  });
  return false;
});
});
