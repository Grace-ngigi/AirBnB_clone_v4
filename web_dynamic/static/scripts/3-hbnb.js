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

	function fetchPlaces() {
		$.ajax({
			type: "POST",
			url: "http://0.0.0.0:5001/api/v1/places_search",
			contentType: "application/json",
			data: JSON.stringify({}),
			success: function(data) {
				const placesSection = $("section.places");
				placesSection.empty();

				data.forEach(function(place) {
					const article = $("<article>");
					article.append($("<h2>").text(place.name));
					rticle.append($("<div>").text(place.description));
					placesSection.append(article);
				});
			},
			error: function() {
				console.error("Error fetching places data.");
			}
		});
	}

	checkApiStatus();
	fetchPlaces();
});
