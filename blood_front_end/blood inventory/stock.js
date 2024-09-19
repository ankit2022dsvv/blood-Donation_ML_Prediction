const select = document.querySelectorAll('.selectBtn');
const option = document.querySelectorAll('.option');
let index = 1;

select.forEach(a => {
	a.addEventListener('click', b => {
		const next = b.target.nextElementSibling;
		next.classList.toggle('toggle');
		next.style.zIndex = index++;
	})
})
option.forEach(a => {
	a.addEventListener('click', b => { 
		b.target.parentElement.classList.remove('toggle');
		const parent = b.target.closest('.select').children[0];

		parent.setAttribute('data-type', b.target.innerHTML);

		parent.innerHTML = b.target.innerHTML;
	})
});
$(document).ready(function() {
	var districts = [
			"Bangalore",
			"Hyderabad",
			"Delhi",
			"Prayagraj",
			"Jaipur",
			"Lucknow",
			"Auraiya",
			"Azamgarh",
			"Baghpat",
			"Bahraich",
			"Ballia",
			"Balrampur",
			"Banda",
			"Barabanki",
			"Bareilly",
			"Basti",
			"Bhadohi",
			"Bijnor",
			"Budaun",
			"Bulandshahr",
			"Chandauli",
			"Chitrakoot",
			"Deoria",
			"Etah",
			"Etawah",
			"Farrukhabad",
			"Fatehpur",
			"Firozabad",
			"Gautam Buddha Nagar",
			"Ghaziabad",
			"Ghazipur",
			"Gonda",
			"Gorakhpur",
			"Hamirpur",
			"Hapur",
			"Hardoi",
			"Hathras",
			"Jalaun",
			"Jaunpur",
			"Jhansi",
			"Kannauj",
			"Kanpur Dehat",
			"Kanpur Nagar",
			"Kasganj",
			"Kaushambi",
			"Kushinagar",
			"Lakhimpur Kheri",
			"Lalitpur",
			"Lucknow",
			"Mainpuri",
			"Mau",
			"Meerut",
			"Mirzapur",
			"Moradabad"
	];

	var bloodGroups = [
			"A+",
			"A-",
			"B+",
			"B-",
			"AB+",
			"AB-",
			"O+",
			"O-"
	];

	$("#districtInput").autocomplete({
			source: districts
	});

	$("#bloodGroupInput").autocomplete({
			source: bloodGroups
	});
});

$( function() {
    $( "#sourcedatepicker" ).datepicker();
	$( "#destinationdatepicker" ).datepicker();
} );
