var map = {
	options: {
		center: new google.maps.LatLng(0,0),
		mapTypeControl: true,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId, 'MapStyles']
		},
		minZoom: 1,
		maxZoom: 15,
		streetViewControl: true,
		panControl: true,
		zoom: 1,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	},

	styles: [{
		featureType: 'water',
		stylers: [{ color: '#b2d0fe' }]
	}],

	create: function ($target, mapData) {
		$target.data('ready', 0);
		var MapType = new google.maps.StyledMapType(map.styles, { name: '' });
		var GMap = new google.maps.Map($target[0], map.options);
		GMap.mapTypes.set('MapStyles', MapType);
		GMap.setMapTypeId('MapStyles');
		if (mapData.places.length > 0) {
			var bounds = new google.maps.LatLngBounds();
			$(mapData.places).each(function (i, elem) {
				var latLong = new google.maps.LatLng(elem.latitude, elem.longitude);
				bounds.extend(latLong);
				var markerPointImage = new google.maps.MarkerImage('/images/markerPointImage.png');
				var mapMarker = new google.maps.Marker({
					icon: markerPointImage,
					map: GMap,
					position: latLong,
					title: elem.title
				});
				var infoWindow = new google.maps.InfoWindow({
					content: map.infoWindowHTML(elem),
					maxWidth: 200
				});
				google.maps.event.addListener(mapMarker, 'click', function () {
					map.hideInfoWindows();
					infoWindow.open(GMap, mapMarker);
					map.infoWindows.push(infoWindow);
				});
			});
			GMap.fitBounds(bounds);
			var tempListener = google.maps.event.addListener(GMap, 'idle', function () {
				if (GMap.getZoom() > map.options.maxZoom) {
					GMap.setZoom(map.options.maxZoom);
				} else if (GMap.getZoom() < map.options.minZoom) {
					GMap.getZoom() < map.options.minZoom
				}
				google.maps.event.removeListener(tempListener);
			});
		}
		google.maps.event.addListener(GMap, 'click', function () {
			if (!map.overInfoWindow) {
				map.hideInfoWindows();
			}
		});
		$target.data('ready', 1);
	},

	infoWindows: [],

	infoWindowHTML: function (place) {
		var html = '<p>';
		if (place.title != '') html += '<strong>' + place.title + '</strong>';
		html += '</p>';
		html += '<p>';
		if (place.address != '') html += place.address;
		html += '</p>';
		html += '<p>';
		if (place.tel != '') html += 'Tel:' + place.tel + '<br>';
		if (place.fax != '') html += 'Fax:' + place.fax;
		html += '</p>';
		html += '<p>';
		if (place.detaillink != '') html += '<a href="' + place.detaillink + '" class="cta-red" style="font-weight: bold;">Detail</a><br>';
		if (place.sitelink != '') html += '<a href="' + place.sitelink + '" class="cta-red" style="font-weight: bold;">Site</a><br>';
		if (place.accesslink != '') html += '<a href="' + place.accesslink + '" class="cta-red" style="font-weight: bold;">Access</a>';
		html += '</p>';
		return html;
	},

	hideInfoWindows: function () {
		if (map.infoWindows.length > 0) {
			for (i = 0; i < map.infoWindows.length; i++) {
				map.infoWindows[i].setMap(null);
			}
		}
		map.infoWindows = [];
	},

	overInfoWindow: false
}
