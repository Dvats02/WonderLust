const sampleListing=[
    {
      "title": "Cozy Beachfront Villa",
      "location": "Miami, Florida",
      "price": 350,
      "image": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A beautiful beachfront villa with stunning ocean views and modern amenities.",
      "country": "USA"
    },
    {
      "title": "Mountain Cabin Retreat",
      "location": "Aspen, Colorado",
      "price": 250,
      "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A cozy mountain cabin surrounded by pine trees, perfect for a peaceful getaway.",
      "country": "USA"
    },
    {
      "title": "Luxury Apartment in Downtown",
      "location": "New York City, New York",
      "price": 500,
      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A high-end apartment in the heart of the city with a skyline view.",
      "country": "USA"
    },
    {
      "title": "Traditional Japanese Ryokan",
      "location": "Kyoto",
      "price": 180,
      "image": "https://plus.unsplash.com/premium_photo-1676321688630-9558e7d2be10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "Experience traditional Japanese hospitality in this serene ryokan.",
      "country": "Japan"
    },
    {
      "title": "Seaside Bungalow",
      "location": "Bali",
      "price": 200,
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A peaceful bungalow by the sea with breathtaking sunset views.",
      "country": "Indonesia"
    },
    {
      "title": "Rustic Farmhouse Stay",
      "location": "Tuscany",
      "price": 220,
      "image": "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "Enjoy the countryside in this charming farmhouse with vineyard views.",
      "country": "Italy"
    },
    {
      "title": "Modern Loft Apartment",
      "location": "Berlin",
      "price": 320,
      "image": "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "A sleek and stylish loft apartment in the heart of the city.",
      "country": "Germany"
    },
    {
      "title": "Safari Lodge",
      "location": "Serengeti",
      "price": 450,
      "image": "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "Experience the thrill of wildlife safaris from this luxury lodge.",
      "country": "Tanzania"
    },
    {
      "title": "Desert Oasis Tent",
      "location": "Dubai",
      "price": 300,
      "image": "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "A unique glamping experience in the Arabian desert.",
      "country": "UAE"
    },
    {
      "title": "Historic Castle Stay",
      "location": "Edinburgh",
      "price": 600,
      "image": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "Live like royalty in this grand historic castle with stunning views.",
      "country": "Scotland"
    },
    {
      "title": "Beach Hut Escape",
      "location": "Maldives",
      "price": 700,
      "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A private overwater hut with direct access to crystal-clear waters.",
      "country": "Maldives"
    },
    {
      "title": "Ski Resort Chalet",
      "location": "Swiss Alps",
      "price": 550,
      "image": "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A cozy chalet with a fireplace, perfect for ski lovers.",
      "country": "Switzerland"
    },
    {
      "title": "Jungle Treehouse",
      "location": "Amazon Rainforest",
      "price": 150,
      "image": "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "Stay among the treetops in this eco-friendly jungle retreat.",
      "country": "Brazil"
    },
    {
      "title": "Lakefront Cottage",
      "location": "Ontario",
      "price": 280,
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A peaceful lakeside retreat with fishing and kayaking opportunities.",
      "country": "Canada"
    },
    {
      "title": "Floating House",
      "location": "Bangkok",
      "price": 190,
      "image": "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "A unique floating house on the river with a beautiful night view.",
      "country": "Thailand"
    },
    {
      "title": "Urban Penthouse",
      "location": "London",
      "price": 620,
      "image": "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "A luxurious penthouse with panoramic city views.",
      "country": "UK"
    },
    {
      "title": "Countryside Barn House",
      "location": "Devon",
      "price": 240,
      "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "A charming barn house with open fields and a rustic feel.",
      "country": "UK"
    },
    {
      "title": "Cliffside Retreat",
      "location": "Santorini",
      "price": 480,
      "image": "https://plus.unsplash.com/premium_photo-1676321688630-9558e7d2be10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A romantic cliffside house with breathtaking sunset views.",
      "country": "Greece"
    },
    {
      "title": "Medieval Tower Home",
      "location": "Prague",
      "price": 260,
      "image": "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      "description": "Live in a restored medieval tower with antique decor.",
      "country": "Czech Republic"
    },
    {
      "title": "Tropical Jungle Villa",
      "location": "Costa Rica",
      "price": 400,
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A luxurious villa surrounded by lush tropical jungle.",
      "country": "Costa Rica"
    },
    {
      "title": "Snowy Igloo Stay",
      "location": "Lapland",
      "price": 270,
      "image": "https://media.istockphoto.com/id/1028621094/photo/service-bell-on-hotel-reception-desk.webp?a=1&b=1&s=612x612&w=0&k=20&c=nMLoNEMjN9WJuzYRFQae5rauiQ5290SqxB-p4ppGRwc=",
      "description": "Experience the northern lights from a cozy glass igloo.",
      "country": "Finland"
    },
    {
      "title": "Charming Windmill Home",
      "location": "Netherlands",
      "price": 230,
      "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "Stay in a beautifully restored windmill with modern amenities.",
      "country": "Netherlands"
    },
    {
      "title": "Historic Stone Cottage",
      "location": "Ireland",
      "price": 210,
      "image": "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWxzfGVufDB8fDB8fHww",
      "description": "A traditional stone cottage with a warm fireplace.",
      "country": "Ireland"
    }
  ]
  
  module.exports={data: sampleListing};