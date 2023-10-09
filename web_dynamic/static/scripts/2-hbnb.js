$(document).ready(function() {
	const selected = [];

	function updateSelectedAmenities() {
		$("#selected-amenities-list").text(selected.join(", "));
	}
	$("input[type='checkbox']").change(function() {
		const id = $(this).data("id");
		const name = $(this).data("name");

		 if ($(this).prop("checked")) {
			 selected.push(name);
		 } else {
			 selected = selected.filter(function(n) {
				 return n !== name;
			 });
		 }
		updateSelectedAmenities();
	});
	function checkApiStatus() {
		$.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
			if (data.status === "OK") {
				 $("#api_status").addClass("available");
			} else {
				$("#api_status").removeClass("available");
			}
		});
	}
	checkApiStatus();
});
