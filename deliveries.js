// deliveries.js — 10 realistic sample shipments
const deliveries = [
  {
    trackingCode: "R6949654RFE",
    estimatedDelivery: "14-10-2025",
    customs: "customs clearance compeleted package released for delivery",
    shipper: {
      name: "ELEMIS",
      phone: "+44 7832 933672",
      address: "1 Baker St, London W1U 8ED, United Kingdom",
      email: "elemisinfluencerpartnership.uk@gmail.com"
    },
    receiver: {
      name: "Natalia Tejeda",
      phone: "+52 229 391 6150",
      address: "Calle Tampico 256, Fraccionamiento Jardines de Mocambo, entre Calle Marte y Calle Júpiter, Veracruz, Boca del Río, 94299, México",
      email: "manzaaniita03@gmail.com"
    },
    shipment: {
      weight: "4.0 kg",
      courier: "NOVA",
      packages: "Pr Package",
      mode: "Air",
      product: "Skincare Products",
      quantity: 20,
      paymentMode: "Apple Pay",
      totalFreight: "$432",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "UK55667788",
      departureTime: "13:00",
      origin: "LONDON",
      destination: "Mexico",
      pickupDate: "16-10-2025",
      pickupTime: "17:00",
      status: "custom cleared",
      comments: "Package prepared for shipment",
      agentName: "Jason Moore",
      shipmentType: "Air Express"
    },
    events: [
      { time: "2025-10-13T12:00:00Z", status: "Shipment information received", location: "London Stansted Airport, Bassingbourn Rd, Stansted CM24 1QW, United Kingdom", coords: [51.8893, 0.2624], details: "Label created and pickup scheduled" },
      { time: "2025-10-16T05:00:00Z", status: "cleared by customs", location: "Cancún International Airport – Cargo / Customs Facility, Cancún, Quintana Roo, Mexico", coords: [21.0365, -86.8771], details: "customs clearance completed" },
    ]
  },

  {
    trackingCode: "UK59857765",
    estimatedDelivery: "01-12-2025",
    customs: "",
    shipper: {
      name: "NOVA",
      phone: "+44 7832 933672",
      address: "8 Surrey St,Temple,London WC2R 2ND,United Kingdom",
      email: "charlottetilbury.influencers@gmail.com"
    },
    receiver: {
      name: "Valleyestella",
      phone: "+1 2262684713",
      address: "7080 Century Drive Melbourne Ontario N0L1T0 Canada",
      email: "valley1616@outlook.com"
    },
    shipment: {
      weight: "4.5 kg",
      courier: "NOVA",
      packages: "Pr Package",
      mode: "Air",
      product: "skincare/makeup products",
      quantity: 20,
      paymentMode: "Paypal",
      totalFreight: "$300",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "DL33221",
      departureTime: "1:00",
      destination: "Canada", 
      origin: "London",
      pickupDate: "01-12-2025",
      pickupTime: "12:00",
      status: "Accepted",
      comments: "Awaiting customs documents",
      agentName: "Jason Moore",
      shipmentType: "Air Express"
    },
    events: [
      { time: "2025-11-30T03:00:00Z", status: "In flight to Canada", location: "International Airspace en route to Canada", coords: [53.0, -60.0], details: "Shipment has departed and is currently in flight to Canada" },
      { time: "2025-12-01T05:00:00Z", status: "Awaiting customs clearance", location: "Vancouver International Airport (YVR)", coords: [49.1947, -123.1792], details: "Package has arrived at YVR and is pending customs processing" },
    ]
  },

  {
    trackingCode: "US4867556677",
    estimatedDelivery: "06-12-2025",
    customs: "Pending clearance",
    shipper: {
      name: "LANEIGE",
      phone: "+1 (929) 330-9752",
      address: "1407 Broadway, Suite 210, New York, NY 10018",
      email: "uslaneigecollaboration@gmail.com"
    },
    receiver: {
      name: "Daniel Reicheld",
      phone: "+4915255747331",
      address: "Bad Ems 56130 Winterbergstr.25 Germany",
      email: "contact@ugcbydaniel.com"
    },
    shipment: {
      weight: "4.5 kg",
      courier: "NOVA",
      packages: "Pr Package",
      mode: "Air",
      product: "Skincare Products",
      quantity: 20,
      paymentMode: "Nill",
      totalFreight: "$200",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "BA556677",
      departureTime: "11:15",
      origin: "New York",
      destination: "Germany",
      pickupDate: "8-12-2025",
      pickupTime: "10:00",
      status: "Order Processing",
      comments: "shipped",
      agentName: "Jason Moore",
      shipmentType: "Air"
    },
    events: [
      { time: "2025-12-06T03:00:00Z", status: "Shipment In transit", location: "Airborne from New York, USA to Germany", coords: [40.7128, -74.0060], details: "Shipment en route via flight, expected arrival in Germany within 2 days" },
      { time: "2025-12-08T04:00:00Z", status: "Delivered", location: "Munich Airport (MUC), Germany", coords: [48.3538, 11.7861], details: "Shipment has arrived and been successfully delivered" },
    ]
  },

  {
    trackingCode: "US27994576876",
    estimatedDelivery: "12-09-2025:11:00Z",
    customs: "pending clearance",
    shipper: {
      name: "LANEIGE",
      phone: "+1 (929) 330-9752",
      address: "1407 Broadway, Suite 210, New York, NY 10018",
      email: "uslaneigecollaboration@gmail.com"
    },
    receiver: {
      name: "Nayrovi Spencer Ubiera",
      phone: "+1 8495024442",
      address: "8550 NW 70TH ST, RP-218611, MIAMI, FL 33166-6216",
      email: "nairobibelic.ugc@gmail.com"
    },
    shipment: {
      weight: "4.2 kg",
      courier: "NOVA",
      packages: "Pr Package",
      mode: "Air",
      product: "skincare products",
      quantity: 20,
      paymentMode: "Bank Transfer",
      totalFreight: "$400",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "AC8899",
      departureTime: "15:20",
      origin: "NEW YORK",
      destination: "MIAMI",
      pickupDate: "12-09-2025",
      pickupTime: "07:00",
      status: "Accepted",
      comments: "Awaiting customs documents",
      agentName: "Jason Moore",
      shipmentType: "Air Cargo"
    },
    events: [
      { time: "2025-12-09T09:40:00Z", status: "In Transit", location: "Airborne from New York to Miami, USA", coords: [40.7128, -74.0060], details: "Package en route via flight to Miami" }
    ]
  },

 {
    trackingCode: "US554437569",
    estimatedDelivery: "12-06-2025T10:00:00Z",
    customs: "",
    shipper: {
      name: "CETAPHIL",
      phone: "+1 (929) 330-9752 ",
      address: "Brickell City Centre (78 S.W. Seventh St.)",
      email: "cetaphilskincarecollaborations@gmail.com"
    },
    receiver: {
      name: "Amitfurman",
      phone: "+1 206 354 4647",
      address: "41814 n spy glass dr anthem Arizona 85086 USA",
      email: "Amitfurman23@gmail.com"
    },
    shipment: {
      weight: "4.5 kg",
      courier: "NOVA",
      packages: "Pr package",
      mode: "Air",
      product: "skincare",
      quantity: 30,
      paymentMode: "Zelle",
      totalFreight: "$350",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "AC445763222",
      departureTime: "06:00",
      origin: "Florida",
      destination: "Arizona",
      pickupDate: "12-07-2025",
      pickupTime: "05:30",
      status: "Accepted",
      comments: "In transit",
      agentName: "Jason Moore",
      shipmentType: "Air Cargo"
    },
    events: [
      { time: "2025-12-06T04:00:00Z", status: "Shipment in transit", location: "Airborne from Florida to Arizona, USA", coords: [28.5383, -81.3792], details: "Shipment en route via flight" },
    ]
  },

  {
    trackingCode: "FR11223344",
    estimatedDelivery: "2025-09-01T13:00:00Z",
    customs: "Orly Airport, Paris",
    shipper: {
      name: "Paris Couriers",
      phone: "+33 145 678901",
      address: "Boulevard St-Germain, Paris",
      email: "contact@parcouriers.fr"
    },
    receiver: {
      name: "Sarah Johnson",
      phone: "+1 415 223344",
      address: "Market St, San Francisco, USA",
      email: "sarah.j@example.com"
    },
    shipment: {
      weight: "2 kg",
      courier: "Chronopost",
      packages: "Small Box",
      mode: "Air",
      product: "Perfume",
      quantity: 5,
      paymentMode: "Credit Card",
      totalFreight: "€150",
      carrier: "Air France",
      carrierRef: "AF2233",
      departureTime: "08:15",
      origin: "Paris (ORY)",
      destination: "San Francisco (SFO)",
      pickupDate: "2025-08-19",
      pickupTime: "07:30",
      status: "Order Processing",
      comments: "At warehouse",
      agentName: "Claire Dupont",
      shipmentType: "Air Express"
    },
    events: [
      { time: "2025-08-19T05:50:00Z", status: "Shipment information received", location: "Boulevard St-Germain, Paris", coords: [48.8530, 2.3470], details: "Order created" },
      { time: "2025-08-19T08:00:00Z", status: "Picked up", location: "Paris Sorting Center", coords: [48.8566, 2.3522], details: "Collected" },
      { time: "2025-08-19T11:30:00Z", status: "Departed to airport", location: "Orly (ORY), Paris", coords: [48.7262, 2.3652], details: "Loaded to Air France" },
      { time: "2025-08-20T02:45:00Z", status: "Arrived at Destination Airport", location: "San Francisco Intl (SFO)", coords: [37.6213, -122.3790], details: "Landed SFO" },
      { time: "2025-08-20T10:00:00Z", status: "Customs clearance", location: "SFO customs", coords: [37.6213, -122.3790], details: "Cleared" },
      { time: "2025-08-20T13:20:00Z", status: "Out for delivery", location: "Market St, San Francisco", coords: [37.7749, -122.4194], details: "Local courier assigned" },
      { time: "2025-08-20T15:10:00Z", status: "Delivered", location: "Market St, San Francisco, USA", coords: [37.7749, -122.4194], details: "Delivered to Sarah Johnson" }
    ]
  },

  {
    trackingCode: "IN77889900",
    estimatedDelivery: "2025-09-03T18:00:00Z",
    customs: "Mumbai port",
    shipper: {
      name: "IndiaCargo",
      phone: "+91 22 22334455",
      address: "Marine Lines, Mumbai",
      email: "support@indiacargo.in"
    },
    receiver: {
      name: "David Miller",
      phone: "+61 400 778899",
      address: "George St, Sydney, Australia",
      email: "david.m@example.au"
    },
    shipment: {
      weight: "15 kg",
      courier: "BlueDart",
      packages: "Carton",
      mode: "Sea",
      product: "Textiles",
      quantity: 50,
      paymentMode: "Letter of Credit",
      totalFreight: "$600",
      carrier: "Maersk",
      carrierRef: "MS7788",
      departureTime: "10:45",
      origin: "Mumbai (BOM)",
      destination: "Sydney (SYD)",
      pickupDate: "2025-08-21",
      pickupTime: "09:30",
      status: "Accepted",
      comments: "Onboard vessel",
      agentName: "Ravi Kumar",
      shipmentType: "Sea Freight"
    },
    events: [
      { time: "2025-08-21T04:00:00Z", status: "Shipment information received", location: "Marine Lines, Mumbai", coords: [18.9433, 72.8238], details: "Booking placed" },
      { time: "2025-08-21T08:30:00Z", status: "Picked up", location: "Mumbai Port - Jawaharlal Nehru Port (JNPT)", coords: [18.9220, 72.8336], details: "Loaded to container" },
      { time: "2025-08-23T06:00:00Z", status: "Departed Port", location: "Leaving JNPT", coords: [18.9220, 72.8336], details: "Vessel departed" },
      { time: "2025-09-01T10:00:00Z", status: "Arrived Port", location: "Port Botany, Sydney", coords: [-33.9460, 151.1756], details: "Arrived at Sydney port" },
      { time: "2025-09-02T08:30:00Z", status: "Customs clearance completed", location: "Sydney customs", coords: [-33.9460, 151.1756], details: "Cleared for delivery" },
      { time: "2025-09-03T07:20:00Z", status: "Out for delivery", location: "George St, Sydney", coords: [-33.8688, 151.2093], details: "Local delivery assigned" }
    ]
  },

  {
    trackingCode: "BR00998877",
    estimatedDelivery: "2025-09-08T16:00:00Z",
    customs: "Sao Paulo airport",
    shipper: {
      name: "Brasil Express",
      phone: "+55 11 987654321",
      address: "Av Paulista, Sao Paulo",
      email: "contact@br-express.com"
    },
    receiver: {
      name: "Anna Schmidt",
      phone: "+49 176 556677",
      address: "Hauptstrasse, Munich, Germany",
      email: "anna.s@example.de"
    },
    shipment: {
      weight: "9 kg",
      courier: "LATAM Cargo",
      packages: "Box",
      mode: "Air",
      product: "Shoes",
      quantity: 20,
      paymentMode: "Credit Card",
      totalFreight: "$350",
      carrier: "LATAM Airlines",
      carrierRef: "LA8899",
      departureTime: "14:00",
      origin: "Sao Paulo (GRU)",
      destination: "Munich (MUC)",
      pickupDate: "2025-08-23",
      pickupTime: "08:30",
      status: "Shipment Pending",
      comments: "Scheduled for flight",
      agentName: "Carlos Silva",
      shipmentType: "Air Express"
    },
    events: [
      { time: "2025-08-23T06:00:00Z", status: "Shipment information received", location: "Av Paulista, Sao Paulo", coords: [-23.564, -46.652], details: "Order created" },
      { time: "2025-08-23T09:30:00Z", status: "Picked up", location: "Sao Paulo Sorting Hub", coords: [-23.628, -46.656], details: "Collected" },
      { time: "2025-08-23T13:15:00Z", status: "Departed to airport", location: "Guarulhos (GRU)", coords: [-23.4356, -46.4731], details: "Loaded LATAM" },
      { time: "2025-08-24T05:50:00Z", status: "Arrived Transit Hub", location: "Lisbon (LIS)", coords: [38.7742, -9.1342], details: "Transit stop" },
      { time: "2025-08-24T16:20:00Z", status: "Arrived at Destination Airport", location: "Munich (MUC)", coords: [48.3538, 11.7861], details: "Landed Munich" },
      { time: "2025-08-25T09:10:00Z", status: "Out for delivery", location: "Hauptstrasse, Munich", coords: [48.1351, 11.5820], details: "Local courier assigned" }
    ]
  },

  {
    trackingCode: "AU66554433",
    estimatedDelivery: "2025-09-10T11:00:00Z",
    customs: "Sydney Airport, Cleared",
    shipper: {
      name: "Aussie Couriers",
      phone: "+61 2 99887766",
      address: "George St, Sydney",
      email: "help@aussiecouriers.au"
    },
    receiver: {
      name: "Mark Thompson",
      phone: "+1 917 445566",
      address: "5th Ave, New York, USA",
      email: "mark.t@example.com"
    },
    shipment: {
      weight: "4 kg",
      courier: "Qantas Cargo",
      packages: "Envelope",
      mode: "Air",
      product: "Contracts",
      quantity: 1,
      paymentMode: "Bank Transfer",
      totalFreight: "$100",
      carrier: "Qantas",
      carrierRef: "QF4455",
      departureTime: "12:00",
      origin: "Sydney (SYD)",
      destination: "New York (JFK)",
      pickupDate: "2025-08-24",
      pickupTime: "07:15",
      status: "Estimated Delivery",
      comments: "Arriving soon",
      agentName: "Olivia White",
      shipmentType: "Air"
    },
    events: [
      { time: "2025-08-24T04:10:00Z", status: "Shipment information received", location: "George St, Sydney", coords: [-33.8688, 151.2093], details: "Order created" },
      { time: "2025-08-24T08:00:00Z", status: "Picked up", location: "Sydney Local Hub", coords: [-33.8688, 151.2093], details: "Collected" },
      { time: "2025-08-24T12:30:00Z", status: "Departed to airport", location: "Sydney (SYD)", coords: [-33.9460, 151.1756], details: "Loaded Qantas" },
      { time: "2025-08-25T02:10:00Z", status: "Arrived Transit Hub", location: "Los Angeles (LAX)", coords: [33.9416, -118.4085], details: "Transit" },
      { time: "2025-08-25T12:45:00Z", status: "Arrived at Destination Airport", location: "JFK, New York", coords: [40.6413, -73.7781], details: "Landed JFK" },
      { time: "2025-08-26T09:20:00Z", status: "Out for delivery", location: "5th Ave, New York", coords: [40.7756, -73.9762], details: "Courier assigned" },
      { time: "2025-08-26T11:50:00Z", status: "Delivered", location: "5th Ave, New York, USA", coords: [40.7756, -73.9762], details: "Delivered to Mark Thompson" }
    ]
  },

  {
    trackingCode: "CN33445566",
    estimatedDelivery: "2025-09-12T09:00:00Z",
    customs: "Shenzhen export clearance",
    shipper: {
      name: "Shenzhen Supply Co",
      phone: "+86 755 12345678",
      address: "Nanshan, Shenzhen, China",
      email: "export@szsupply.cn"
    },
    receiver: {
      name: "Liam O'Connor",
      phone: "+353 86 9988776",
      address: "Dublin 2, Ireland",
      email: "liam.o@example.ie"
    },
    shipment: {
      weight: "18 kg",
      courier: "SF Express",
      packages: "Boxes",
      mode: "Air",
      product: "Gadgets",
      quantity: 30,
      paymentMode: "Credit Card",
      totalFreight: "$900",
      carrier: "China Southern Cargo",
      carrierRef: "CZ3344",
      departureTime: "21:30",
      origin: "Shenzhen (SZX)",
      destination: "Dublin (DUB)",
      pickupDate: "2025-08-26",
      pickupTime: "06:40",
      status: "In transit",
      comments: "Handed to carrier",
      agentName: "Ming Li",
      shipmentType: "Air Freight"
    },
    events: [
      { time: "2025-08-26T04:20:00Z", status: "Shipment information received", location: "Nanshan, Shenzhen", coords: [22.5429, 113.9340], details: "Order received" },
      { time: "2025-08-26T07:10:00Z", status: "Picked up", location: "Shenzhen Sorting Center", coords: [22.5355, 113.9360], details: "Collected" },
      { time: "2025-08-26T12:45:00Z", status: "Departed Airport", location: "Shenzhen Bao'an (SZX)", coords: [22.6393, 113.8107], details: "Loaded to CZ cargo" },
      { time: "2025-08-27T03:30:00Z", status: "Arrived Transit Hub", location: "Amsterdam Schiphol (AMS)", coords: [52.3105, 4.7683], details: "Transit" },
      { time: "2025-08-27T09:50:00Z", status: "Arrived at Destination Airport", location: "Dublin (DUB)", coords: [53.4213, -6.2701], details: "Landed" },
      { time: "2025-08-28T07:15:00Z", status: "Customs clearance completed", location: "Dublin customs", coords: [53.4213, -6.2701], details: "Released for delivery" },
      { time: "2025-08-28T11:30:00Z", status: "Out for delivery", location: "Dublin 2", coords: [53.3438, -6.2546], details: "Local courier en route" }
    ]
  },

  {
    trackingCode: "JP77880011",
    estimatedDelivery: "2025-09-06T10:00:00Z",
    customs: "Tokyo airport clearance",
    shipper: {
      name: "Tokyo Express",
      phone: "+81 3 1234 5678",
      address: "Chiyoda, Tokyo",
      email: "service@tokyoexpress.jp"
    },
    receiver: {
      name: "Carlos Mendes",
      phone: "+55 21 9988 7766",
      address: "Copacabana, Rio de Janeiro, Brazil",
      email: "carlos.m@example.br"
    },
    shipment: {
      weight: "6.8 kg",
      courier: "Yamato",
      packages: "Box",
      mode: "Air",
      product: "Camera accessories",
      quantity: 5,
      paymentMode: "Credit Card",
      totalFreight: "$220",
      carrier: "Japan Airlines Cargo",
      carrierRef: "JL7788",
      departureTime: "22:00",
      origin: "Tokyo (HND)",
      destination: "Rio (GIG)",
      pickupDate: "2025-08-29",
      pickupTime: "09:00",
      status: "In transit",
      comments: "Ready for export",
      agentName: "Hiro Tanaka",
      shipmentType: "Air"
    },
    events: [
      { time: "2025-08-29T06:00:00Z", status: "Shipment information received", location: "Chiyoda, Tokyo", coords: [35.6938, 139.7534], details: "Order created" },
      { time: "2025-08-29T08:45:00Z", status: "Picked up", location: "Tokyo Sorting Center", coords: [35.6895, 139.6917], details: "Collected" },
      { time: "2025-08-29T13:10:00Z", status: "Departed to airport", location: "Haneda (HND)", coords: [35.5494, 139.7798], details: "Loaded JAL cargo" },
      { time: "2025-08-30T02:20:00Z", status: "Arrived Transit Hub", location: "Sao Paulo (GRU)", coords: [-23.4356, -46.4731], details: "Transit via GRU" },
      { time: "2025-08-30T11:40:00Z", status: "Arrived at Destination Airport", location: "Galeão Intl (GIG), Rio", coords: [-22.8090, -43.2506], details: "Landed Rio" },
      { time: "2025-09-01T07:00:00Z", status: "Customs clearance completed", location: "Rio customs", coords: [-22.8090, -43.2506], details: "Released for delivery" },
      { time: "2025-09-02T09:30:00Z", status: "Out for delivery", location: "Copacabana, Rio", coords: [-22.9711, -43.1822], details: "Local courier" }
    ]
  },

{
    trackingCode: "UK839945766",
    estimatedDelivery: "06-12-2025:11:00Z",
    customs: "Pending clearance",
    shipper: {
      name: "charlottetilbury",
      phone: "+44 7832 933672",
      address: "8 Surrey St,Temple,London WC2R 2ND,United Kingdom",
      email: "charlottetilbury.influencers@gmail.com"
    },
    receiver: {
      name: "Faiqa",
      phone: "+923366527821",
      address: "Pakistan (Sargodha) Home address: House no 17, Street no 18, Block X New satellite town near Bab-e-haram",
      email: "faiqaqamar4@gmail.com"
    },
    shipment: {
      weight: "4.2 kg",
      courier: "NOVA",
      packages: "Pr Package",
      mode: "Air",
      product: "skincare/makeup products",
      quantity: 20,
      paymentMode: "Bank Transfer",
      totalFreight: "$1,200",
      carrier: "Air Carrier (Nova445763222)",
      carrierRef: "AC8899",
      departureTime: "15:20",
      origin: "London",
      destination: "pakistan",
      pickupDate: "06-12-2025",
      pickupTime: "07:00",
      status: "Shipment Pending",
      comments: "Awaiting customs documents",
      agentName: "Jason Moore",
      shipmentType: "Air Cargo"
    },
    events: [
      { time: "2025-12-06T09:40:00Z", status: "Customs hold", location: "Jinnah International Airport – Customs (KHI), Karachi, Pakistan", coords: [24.9065, 67.1608], details: "Awaiting documentation" }
    ]
  }
];











































