/* ==== EDIT HERE: all business details & vehicle photos live in this file ==== */
window.SITE = {
  name: "Shourya Engineering Autobody",
  tagline: "RTO Approved Body Builder",
  contacts: [
    { name: "Prashant", phone: "9325482824" },
    { name: "Krushna",  phone: "9022237456" }
  ],
  whatsapp: "919325482824",            // country code + number, no + or spaces
  email: "bablurathod98637@gmail.com",
  address: "Pune–Nashik Highway, Gandharva Nagari, 90 Meter Road, Moshi, Pune",
  mapQuery: "Shourya Engineering Autobody, Moshi, Pune",
  /* Add / remove vehicles. category: open | closed | special.
     Replace the image files in assets/images/vehicles/ (same name) or change "img". */
  vehicles: [
    { img: "assets/images/vehicles/open-rail-cargo.jpg",       title: "High-Rail Cargo Body",     category: "open",    desc: "Open body with a raised safety-rail frame for bulky, stackable loads." },
    { img: "assets/images/vehicles/pipe-frame-pickup.jpg",     title: "Pipe-Frame Goods Carrier", category: "open",    desc: "Strong side panels with a pipe roof frame for daily goods transport." },
    { img: "assets/images/vehicles/heavy-rail-truck.jpg",      title: "Heavy Rail Body Truck",    category: "open",    desc: "Rugged rail-type body built for bigger chassis and heavier duty." },
    { img: "assets/images/vehicles/closed-container.jpg",      title: "Closed Container Body",    category: "closed",  desc: "Corrugated steel container body that keeps goods secure and weather-safe." },
    { img: "assets/images/vehicles/blue-utility-box.jpg",      title: "Utility Box Body",         category: "special", desc: "Side-opening box body with a finished interior for service and display use." },
    { img: "assets/images/vehicles/custom-enclosed-unit.jpg",  title: "Custom Enclosed Unit",     category: "special", desc: "Made-to-order enclosed unit built around your specific business need." }
  ]
};
