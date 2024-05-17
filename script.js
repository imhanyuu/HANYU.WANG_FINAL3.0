// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaHczNTkyIiwiYSI6ImNsdXVhbmlzMzA3dzYyam11MXBtOHZ0bDIifQ.fCVVfhCEeFhzqIdOmcz1CQ';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.15, 40.670], // Adjust initial view to better center NYC
    zoom: 10,
    pitch: 45, // Set initial pitch
    bearing: -10 // Set initial bearing
});

// Array of start overlay images
let startImageIndex = 0;
const startImages = [
    'image/start.png',
    'image/start2.png',
    'image/start3.png',
    'image/start4.png'
];

// Function to change the start overlay image
function changeStartImage() {
    const startOverlay = document.getElementById('start-overlay');
    startImageIndex++;
    if (startImageIndex < startImages.length) {
        startOverlay.style.backgroundImage = `url('${startImages[startImageIndex]}')`;
        if (startImageIndex === 3) {
            startOverlay.style.opacity = 1;
        }
    } else {
        startOverlay.style.display = 'none';
    }
}

// Define neighborhood images
const neighborhoodImages = {
    "Battery Park City-Lower Manhattan": "LOWER EAST SIDE",
    "Central Harlem North-Polo Grounds": "HARLEM-CENTRAL",
    "Central Harlem South": "HARLEM-CENTRAL",
    "Chinatown": "LOWER EAST SIDE",
    "Clinton": "CLINTON",
    "East Harlem North": "HARLEM-EAST",
    "East Harlem South": "HARLEM-EAST",
    "East Village": "EAST VILLAGE",
    "Gramercy": "GRAMERCY",
    "Hamilton Heights": "HARLEM-WEST",
    "Hudson Yards-Chelsea-Flatiron-Union Square": "CHELSEA",
    "Lenox Hill-Roosevelt Island": "UPPER EAST SIDE (59-79)",
    "Lincoln Square": "UPPER WEST SIDE (59-79)",
    "Lower East Side": "LOWER EAST SIDE",
    "Manhattanville": "HARLEM-WEST",
    "Marble Hill-Inwood": "INWOOD",
    "Midtown-Midtown South": "MIDTOWN EAST",
    "Morningside Heights": "HARLEM-WEST",
    "Murray Hill-Kips Bay": "MURRAY HILL",
    "SoHo-TriBeCa-Civic Center-Little Italy": "SOHO",
    "Stuyvesant Town-Cooper Village": "GRAMERCY",
    "Turtle Bay-East Midtown": "MIDTOWN EAST",
    "Upper East Side-Carnegie Hill": "UPPER EAST SIDE (79-96)",
    "Upper West Side": "UPPER WEST SIDE (96-116)",
    "Washington Heights North": "WASHINGTON HEIGHTS UPPER",
    "Washington Heights South": "WASHINGTON HEIGHTS LOWER",
    "West Village": "GREENWICH VILLAGE-WEST",
    "Yorkville": "UPPER EAST SIDE (79-96)",
    // Queens
    "Airport": "AIRPORT LA GUARDIA",
    "Astoria": "ASTORIA",
    "Auburndale": "BAYSIDE",
    "Baisley Park": "SO. JAMAICA-BAISLEY PARK",
    "Bayside-Bayside Hills": "BAYSIDE",
    "Bellerose": "BELLEROSE",
    "Breezy Point-Belle Harbor-Rockaway Park-Broad Channel": "BREEZY POINT",
    "Briarwood-Jamaica Hills": "BRIARWOOD",
    "College Point": "COLLEGE POINT",
    "Corona": "CORONA",
    "Douglas Manor-Douglaston-Little Neck": "DOUGLASTON",
    "East Elmhurst": "EAST ELMHURST",
    "East Flushing": "FLUSHING-NORTH",
    "Elmhurst": "ELMHURST",
    "Elmhurst-Maspeth": "ELMHURST",
    "Far Rockaway-Bayswater": "FAR ROCKAWAY",
    "Flushing": "FLUSHING-NORTH",
    "Forest Hills": "FOREST HILLS",
    "Fresh Meadows-Utopia": "FRESH MEADOWS",
    "Ft. Totten-Bay Terrace-Clearview": "BAYSIDE",
    "Glen Oaks-Floral Park-New Hyde Park": "GLEN OAKS",
    "Glendale": "GLENDALE",
    "Hammels-Arverne-Edgemere": "HAMMELS",
    "Hollis": "HOLLIS",
    "Howard Beach": "HOWARD BEACH",
    "Jackson Heights": "JACKSON HEIGHTS",
    "Jamaica": "JAMAICA",
    "Jamaica Estates-Holliswood": "HOLLISWOOD",
    "Kew Gardens": "KEW GARDENS",
    "Kew Gardens Hills": "KEW GARDENS",
    "Laurelton": "LAURELTON",
    "Long Island City": "LONG ISLAND CITY",
    "Maspeth": "MASPETH",
    "Middle Village": "MIDDLE VILLAGE",
    "Murray Hill": "FLUSHING",
    "North Corona": "CORONA",
    "Oakland Gardens": "OAKLAND GARDENS",
    "Old Astoria": "ASTORIA",
    "Ozone Park": "OZONE PARK",
    "Queens Village": "QUEENS VILLAGE",
    "Queensboro Hill": "FLUSHING",
    "Queensbridge-Ravenswood-Long Island City": "LONG ISLAND CITY",
    "Rego Park": "REGO PARK",
    "Richmond Hill": "RICHMOND HILL",
    "Ridgewood": "RIDGEWOOD",
    "Rosedale": "ROSEDALE",
    "South Jamaica": "SOUTH JAMAICA",
    "South Ozone Park": "SOUTH OZONE PARK",
    "Springfield Gardens North": "SPRINGFIELD GARDENS",
    "Springfield Gardens South-Brookville": "SPRINGFIELD GARDENS",
    "Steinway": "ASTORIA",
    "Sunnyside": "SUNNYSIDE",
    "Whitestone": "WHITESTONE",
    "Woodhaven": "WOODHAVEN",
    "Woodside": "WOODSIDE",
    // Bronx
    "Allerton-Pelham Gardens": "PELHAM GARDENS",
    "Bedford Park-Fordham North": "BEDFORD PARK",
    "Belmont": "BELMONT",
    "Bronxdale": "BRONXDALE",
    "Claremont-Bathgate": "BATHGATE",
    "Co-op City": "CO-OP CITY",
    "Crotona Park East": "CROTONA PARK",
    "East Tremont": "EAST TREMONT",
    "Eastchester-Edenwald-Baychester": "BAYCHESTER",
    "Fordham South": "FORDHAM",
    "Highbridge": "HIGHBRIDGE",
    "Hunts Point": "HUNTS POINT",
    "Kingsbridge Heights": "KINGSBRIDGE HTS",
    "Longwood": "MORRISANIA",
    "Melrose South-Mott Haven North": "MELROSE",
    "Morrisania-Melrose": "MORRISANIA",
    "Mott Haven-Port Morris": "MOTT HAVEN",
    "Mount Hope": "MOUNT HOPE",
    "Norwood": "BEDFORD PARK",
    "Parkchester": "PARKCHESTER",
    "Pelham Bay-Country Club-City Island": "PELHAM BAY",
    "Pelham Parkway": "PELHAM PARKWAY NORTH",
    "Schuylerville-Throgs Neck-Edgewater Park": "SCHUYLERVILLE",
    "Soundview-Bruckner": "SOUNDVIEW",
    "Soundview-Castle Hill-Clason Point-Harding Park": "SOUNDVIEW",
    "Spuyten Duyvil-Kingsbridge": "KINGSBRIDGE",
    "University Heights-Morris Heights": "HIGHBRIDGE",
    "Van Cortlandt Village": "KINGSBRIDGE HTS",
    "Van Nest-Morris Park-Westchester Square": "VAN NEST",
    "West Concourse": "MELROSE",
    "West Farms-Bronx River": "WEST FARMS",
    "Williamsbridge-Olinville": "WILLIAMSBRIDGE",
    "Woodlawn-Wakefield": "WOODLAWN",
    // Brooklyn
    "Bath Beach": "BATH BEACH",
    "Bay Ridge": "BAY RIDGE",
    "Bedford": "BEDFORD STUYVESANT",
    "Bensonhurst East": "BENSONHURST",
    "Bensonhurst West": "BENSONHURST",
    "Borough Park": "BOROUGH PARK",
    "Brighton Beach": "BRIGHTON BEACH",
    "Brooklyn Heights-Cobble Hill": "BROOKLYN HEIGHTS",
    "Brownsville": "BROWNSVILLE",
    "Bushwick North": "BUSHWICK",
    "Bushwick South": "BUSHWICK",
    "Canarsie": "CANARSIE",
    "Carroll Gardens-Columbia Street-Red Hook": "CARROLL GARDENS",
    "Crown Heights North": "CROWN HEIGHTS",
    "Crown Heights South": "CROWN HEIGHTS",
    "Cypress Hills-City Line": "CYPRESS HILLS",
    "DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill": "DOWNTOWN-METROTECH",
    "Dyker Heights": "DYKER HEIGHTS",
    "East Flatbush-Farragut": "FLATBUSH-EAST",
    "East New York": "EAST NEW YORK",
    "East New York (Pennsylvania Ave)": "EAST NEW YORK",
    "East Williamsburg": "WILLIAMSBURG-EAST",
    "Erasmus": "FLATBUSH",
    "Flatbush": "FLATBUSH-CENTRAL",
    "Flatlands": "FLATLANDS",
    "Fort Greene": "FORT GREENE",
    "Georgetown-Marine Park-Bergen Beach-Mill Basin": "GEORGETOWN",
    "Gravesend": "GRAVESEND",
    "Greenpoint": "GREENPOINT",
    "Homecrest": "MADISON",
    "Kensington-Ocean Parkway": "KENSINGTON",
    "Madison": "MADISON",
    "Midwood": "MIDWOOD",
    "North Side-South Side": "WILLIAMSBURG-CENTRAL",
    "Ocean Hill": "OCEAN HILL",
    "Ocean Parkway South": "OCEAN PARKWAY-SOUTH",
    "Park Slope-Gowanus": "PARK SLOPE",
    "Prospect Heights": "PROSPECT HEIGHTS",
    "Prospect Lefferts Gardens-Wingate": "FLATBUSH-LEFFERTS GARDEN",
    "Rugby-Remsen Village": "FLATBUSH-EAST",
    "Seagate-Coney Island": "SEAGATE",
    "Sheepshead Bay-Gerritsen Beach-Manhattan Beach": "SHEEPSHEAD BAY",
    "Starrett City": "SPRING CREEK",
    "Stuyvesant Heights": "BEDFORD STUYVESANT",
    "Stuyvesant Town-Cooper Village": "STUYVESANT HEIGHTS",
    "Sunset Park East": "SUNSET PARK",
    "Sunset Park West": "SUNSET PARK",
    "West Brighton": "BRIGHTON BEACH",
    "Williamsburg": "WILLIAMSBURG-CENTRAL",
    "Windsor Terrace": "WINDSOR TERRACE",
    // Staten Island
    "Annadale-Huguenot-Prince's Bay-Eltingville": "ANNADALE",
    "Arden Heights": "ARDEN HEIGHTS",
    "Charleston-Richmond Valley-Tottenville": "ROSSVILLE-CHARLESTON",
    "Grasmere-Arrochar-Ft. Wadsworth": "GRASMERE",
    "Grymes Hill-Clifton-Fox Hills": "GRYMES HILL",
    "Mariner's Harbor-Arlington-Port Ivory-Graniteville": "MARINERS HARBOR",
    "New Brighton-Silver Lake": "NEW BRIGHTON",
    "New Dorp-Midland Beach": "NEW DORP",
    "New Springville-Bloomfield-Travis": "NEW SPRINGVILLE",
    "Oakwood-Oakwood Beach": "OAKWOOD",
    "Old Town-Dongan Hills-South Beach": "DONGAN HILLS",
    "Port Richmond": "PORT RICHMOND",
    "Stapleton-Rosebank": "STAPLETON",
    "Todt Hill-Emerson Hill-Heartland Village-Lighthouse Hill": "TODT HILL",
    "West New Brighton-New Brighton-St. George": "WEST NEW BRIGHTON",
    "Woodrow": "WOODROW"
};

// Park areas to be highlighted and disabled for clicking
const parkAreas = [
    "park-cemetery-etc-Manhattan",
    "Pelham Bay-Country Club-City Island",
    "park-cemetery-etc-Bronx",
    "park-cemetery-etc-Queens",
    "Breezy Point-Belle Harbor-Rockaway Park-Broad Channel",
    "park-cemetery-etc-Brooklyn",
    "park-cemetery-etc-Staten Island"
];

// Load map layers and data
map.on('load', () => {
    // Add NYC neighborhoods source
    map.addSource('nyc-neighborhoods', {
        'type': 'geojson',
        'data': 'https://data.cityofnewyork.us/resource/q2z5-ai38.geojson'
    });

    const boroughColors = {
        'Manhattan': '#588db0',
        'Brooklyn': '#ffac59',
        'Queens': '#70c26e',
        'Bronx': '#f55aac',
        'Staten Island': '#ba9ad5'
    };

    // Add fill layer for neighborhoods
    map.addLayer({
        'id': 'neighborhoods-fill',
        'type': 'fill',
        'source': 'nyc-neighborhoods',
        'layout': {},
        'paint': {
            'fill-color': [
                'match',
                ['get', 'boro_name'],
                'Manhattan', boroughColors['Manhattan'],
                'Brooklyn', boroughColors['Brooklyn'],
                'Queens', boroughColors['Queens'],
                'Bronx', boroughColors['Bronx'],
                'Staten Island', boroughColors['Staten Island'],
                '#000000' // default color
            ],
            'fill-opacity': 0.6
        }
    });

    // Add outline layer for neighborhoods
    map.addLayer({
        'id': 'neighborhoods-outline',
        'type': 'line',
        'source': 'nyc-neighborhoods',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });

    // Add NYC boundary with a thick outline
    map.addSource('nyc-boundary', {
        'type': 'geojson',
        'data': 'https://data.cityofnewyork.us/resource/xyye-rtrs.geojson' // Use the correct URL for NYC boundary GeoJSON
    });

    map.addLayer({
        'id': 'nyc-boundary',
        'type': 'line',
        'source': 'nyc-boundary',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 5
        }
    });

    // Add hover effect layer
    map.addLayer({
        'id': 'neighborhoods-hover',
        'type': 'fill',
        'source': 'nyc-neighborhoods',
        'layout': {},
        'paint': {
            'fill-color': [
                'match',
                ['get', 'boro_name'],
                'Manhattan', '#3a6a8a',
                'Brooklyn', '#cc8b4a',
                'Queens', '#569d52',
                'Bronx', '#c7458e',
                'Staten Island', '#8b6aa1',
                '#000000' // default color
            ],
            'fill-opacity': 0.8
        },
        'filter': ['==', 'ntaname', '']
    });

    // Display neighborhood name on hover
    map.on('mousemove', 'neighborhoods-fill', (e) => {
        if (e.features.length > 0) {
            map.setFilter('neighborhoods-hover', ['==', 'ntaname', e.features[0].properties.ntaname]);
            // Update the popup
            const coordinates = turf.centerOfMass(e.features[0]).geometry.coordinates;
            const description = `<strong>${e.features[0].properties.ntaname}</strong>`;
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            })
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);

            map.on('mouseleave', 'neighborhoods-fill', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        }
    });

    // Handle neighborhood click events
    map.on('click', 'neighborhoods-fill', (e) => {
        const neighborhood = e.features[0].properties.ntaname;
        if (parkAreas.includes(neighborhood)) {
            return; // Prevent click actions on park areas
        }
        const borough = e.features[0].properties.boro_name;
        const bounds = turf.bbox(e.features[0]);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<strong style="font-size: 18px;">${neighborhood}</strong><br><span style="font-size: 16px;">${borough}</span>`)
            .addTo(map);

        // Zoom to the neighborhood
        map.fitBounds(bounds, {
            padding: 20,
            pitch: 45,
            bearing: -10,
            maxZoom: 14,
            duration: 2000
        });

        // Show or hide the overlay image
        const overlay = document.getElementById('overlay');
        if (neighborhoodImages[neighborhood]) {
            overlay.style.display = 'block';
            overlay.style.backgroundImage = `url('image/${borough.toUpperCase()}-${neighborhoodImages[neighborhood]}.png')`;
        } else {
            overlay.style.display = 'none';
        }
    });

    // Add park areas as a separate layer
    map.addLayer({
        'id': 'park-areas',
        'type': 'fill',
        'source': 'nyc-neighborhoods',
        'layout': {},
        'paint': {
            'fill-color': '#ffffff', // White color for park areas
            'fill-opacity': 0.6
        },
        'filter': ['in', 'ntaname', ...parkAreas]
    });

    // Disable clicking on park areas
    map.on('click', 'park-areas', (e) => {
        return; // Do nothing on click
    });

    // Change cursor to pointer on hover
    map.on('mouseenter', 'neighborhoods-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Reset cursor on mouse leave
    map.on('mouseleave', 'neighborhoods-fill', () => {
        map.getCanvas().style.cursor = '';
    });
});
