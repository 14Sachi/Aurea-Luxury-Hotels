-- ============================================================================
-- AUREA Luxury Hotels — Seed Data
-- 100+ luxury hotels across 60+ cities worldwide, 4 room tiers each,
-- promo codes, and demo users.
-- Run after schema.sql:
--   psql -U postgres -d aurea -f schema.sql
--   psql -U postgres -d aurea -f seed.sql
-- ============================================================================

BEGIN;

-- ============================================================
-- HOTELS
-- 100+ luxury hotels across countries/cities/regions
-- ============================================================

INSERT INTO hotels
(name, location, city, state, country, category, description, base_price, rating, review_count, image_url, badge, tags)
VALUES

-- INDIA
('Aurea Udaipur','Lake Pichola, Udaipur','Udaipur','Rajasthan','India','Lakefront','A regal lakeside retreat overlooking the tranquil waters of Lake Pichola.',520,4.94,387,'https://images.unsplash.com/photo-1602643163983-ed0babc39797','Editor''s Pick',ARRAY['Lake View','Royal Suite','Private Boat']),
('Aurea Goa','Candolim, Goa','Goa','Goa','India','Beachfront','A contemporary coastal sanctuary surrounded by tropical gardens and the Arabian Sea.',410,4.89,462,'https://images.unsplash.com/photo-1582610116397-edb318620f90','Trending',ARRAY['Private Beach','Infinity Pool','Spa']),
('Aurea Mumbai','Marine Drive','Mumbai','Maharashtra','India','Urban Luxury','A spectacular Arabian Sea retreat in the heart of Mumbai.',620,4.88,693,'https://images.unsplash.com/photo-1566552881560-0be862a7c445','Trending',ARRAY['Sea View','Rooftop Dining','City Skyline']),
('Aurea Jaipur','Amer Road','Jaipur','Rajasthan','India','Palace','A magnificent palace retreat inspired by the royal heritage of Rajasthan.',560,4.92,481,'https://images.unsplash.com/photo-1477587458883-47145ed94245','Editor''s Pick',ARRAY['Royal Palace','Private Courtyard','Elephant Safari']),
('Aurea Kerala','Kumarakom','Kumarakom','Kerala','India','Backwater','A tranquil backwater retreat surrounded by tropical landscapes and palm groves.',470,4.91,354,'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',NULL,ARRAY['Backwater View','Houseboat','Ayurvedic Spa']),
('Aurea Delhi','Chanakyapuri','New Delhi','Delhi','India','Urban Luxury','A polished capital-city retreat combining Indian heritage with contemporary luxury.',590,4.87,522,'https://images.unsplash.com/photo-1587474260584-136574528ed5','Popular',ARRAY['Fine Dining','City View','Spa']),
('Aurea Jodhpur','Mehrangarh','Jodhpur','Rajasthan','India','Heritage','A majestic blue-city retreat with panoramic views of Mehrangarh Fort.',510,4.93,231,'https://images.unsplash.com/photo-1477587458883-47145ed94245','Rare Find',ARRAY['Fort View','Heritage Suite','Courtyard']),
('Aurea Rishikesh','Shivpuri','Rishikesh','Uttarakhand','India','Wellness','A serene riverside sanctuary focused on wellness, meditation, and nature.',390,4.90,316,'https://images.unsplash.com/photo-1545389336-cf090694435e','New',ARRAY['River View','Yoga Pavilion','Wellness Spa']),

-- JAPAN
('Aurea Kyoto','Higashiyama','Kyoto','Kyoto Prefecture','Japan','Ryokan','A refined traditional retreat blending Japanese heritage with modern luxury.',890,4.93,428,'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',NULL,ARRAY['Zen Garden','Tea Ceremony','Onsen']),
('Aurea Tokyo','Ginza','Tokyo','Tokyo','Japan','Urban Luxury','A sophisticated high-rise sanctuary overlooking central Tokyo.',1120,4.91,356,'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf','New',ARRAY['City View','Sky Lounge','Fine Dining']),
('Aurea Hakone','Gora','Hakone','Kanagawa','Japan','Onsen','An intimate mountain escape with private hot springs and forest views.',960,4.95,214,'https://images.unsplash.com/photo-1528360983277-13d401cdc186','Rare Find',ARRAY['Private Onsen','Mountain View','Kaiseki']),
('Aurea Osaka','Namba','Osaka','Osaka','Japan','Urban Luxury','A contemporary Japanese retreat in the energetic heart of Osaka.',760,4.88,402,'https://images.unsplash.com/photo-1590559899731-a382839e5549',NULL,ARRAY['City View','Rooftop Bar','Sushi Bar']),

-- FRANCE
('Aurea Paris','Saint-Germain-des-Prés','Paris','Île-de-France','France','Boutique','An intimate Parisian residence surrounded by art, culture, and timeless architecture.',980,4.92,531,'https://images.unsplash.com/photo-1502602898657-3e91760cbb34','Popular',ARRAY['Eiffel View','Rooftop Bar','French Cuisine']),
('Aurea Côte d''Azur','Saint-Jean-Cap-Ferrat','Nice','Provence-Alpes-Côte d''Azur','France','Seaside','A secluded Mediterranean estate overlooking the French Riviera.',1580,4.96,219,'https://images.unsplash.com/photo-1499856871958-5b9627545d1a','Rare Find',ARRAY['Sea View','Private Yacht','Beach Club']),
('Aurea Lyon','Presqu''île','Lyon','Auvergne-Rhône-Alpes','France','Urban Boutique','A refined city retreat surrounded by French cuisine and historic architecture.',690,4.87,284,'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',NULL,ARRAY['Gourmet Dining','Historic Center','Wine Cellar']),
('Aurea Bordeaux','Chartrons','Bordeaux','Nouvelle-Aquitaine','France','Wine Estate','A sophisticated wine-country escape surrounded by vineyards and châteaux.',820,4.94,197,'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c','Editor''s Pick',ARRAY['Vineyard','Wine Tasting','Private Chef']),

-- ITALY
('Aurea Amalfi','Positano','Positano','Campania','Italy','Clifftop','Terraced gardens tumbling toward the Tyrrhenian Sea.',1680,4.95,263,'https://images.unsplash.com/photo-1533105079780-92b9be482077','Trending',ARRAY['Terraced Gardens','Private Beach','Michelin Chef']),
('Aurea Roma','Via Veneto','Rome','Lazio','Italy','Historic Luxury','A grand Roman residence combining classical architecture with contemporary elegance.',1040,4.90,417,'https://images.unsplash.com/photo-1529260830199-42c24126f198',NULL,ARRAY['Historic Palace','Rooftop Dining','Roman Spa']),
('Aurea Lake Como','Bellagio','Bellagio','Lombardy','Italy','Lakeside','A cinematic villa overlooking Lake Como and the surrounding Alps.',1540,4.97,228,'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713','Rare Find',ARRAY['Lake View','Private Boat','Villa Garden']),
('Aurea Florence','Oltrarno','Florence','Tuscany','Italy','Renaissance','A Renaissance-inspired retreat steps from Florence''s historic center.',920,4.91,386,'https://images.unsplash.com/photo-1543429258-9b9b6a3e3e7e',NULL,ARRAY['Art Gallery','Historic Suite','Tuscan Dining']),

-- GREECE
('Aurea Santorini','Oia','Oia','South Aegean','Greece','Cliffside','A cliffside sanctuary overlooking the Aegean caldera.',1240,4.97,312,'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff','Editor''s Pick',ARRAY['Infinity Pool','Sea View','Private Butler']),
('Aurea Mykonos','Psarou','Mykonos','South Aegean','Greece','Beachfront','A glamorous Cycladic retreat overlooking the Aegean Sea.',1180,4.94,278,'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a','Trending',ARRAY['Private Beach','Yacht Club','Sunset Bar']),
('Aurea Crete','Elounda','Elounda','Crete','Greece','Seaside','A secluded island resort with private coves and Mediterranean gardens.',980,4.92,346,'https://images.unsplash.com/photo-1530789253388-582c481c54b0',NULL,ARRAY['Private Cove','Sea View','Thalassotherapy']),

-- MALDIVES
('Aurea Maldives','North Malé Atoll','Malé','Kaafu Atoll','Maldives','Overwater','Overwater villas suspended above crystal-clear coral reefs.',2150,4.99,187,'https://images.unsplash.com/photo-1514282401047-d79a71a590e8','Rare Find',ARRAY['Overwater Villa','Coral Reef','Sunset Deck']),
('Aurea Baa Atoll','Baa Atoll','Eydhafushi','Baa Atoll','Maldives','Private Island','An exclusive reef island surrounded by turquoise lagoons.',2290,4.98,164,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e','Editor''s Pick',ARRAY['Private Island','Diving','Underwater Dining']),

-- INDONESIA
('Aurea Bali','Ubud','Ubud','Bali','Indonesia','Jungle','A jungle villa retreat surrounded by rice terraces.',740,4.91,519,'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',NULL,ARRAY['Jungle Villa','Balinese Spa','Yoga Pavilion']),
('Aurea Seminyak','Seminyak Beach','Seminyak','Bali','Indonesia','Beachfront','A stylish tropical retreat steps from Bali''s sunset coast.',680,4.90,438,'https://images.unsplash.com/photo-1537996194471-e657df975ab4','Trending',ARRAY['Beach Club','Private Pool','Sunset Dining']),
('Aurea Komodo','Labuan Bajo','Labuan Bajo','East Nusa Tenggara','Indonesia','Island','An adventurous luxury base for exploring Komodo''s islands and reefs.',920,4.95,186,'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf','New',ARRAY['Island Tours','Diving','Private Yacht']),

-- THAILAND
('Aurea Phuket','Natai Beach','Phuket','Phuket','Thailand','Beachfront','A private beachfront escape on the Andaman Sea.',980,4.92,374,'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5','New',ARRAY['Private Beach','Water Sports','Sunset Bar']),
('Aurea Bangkok','Riverside','Bangkok','Bangkok','Thailand','Urban Luxury','A polished riverside sanctuary in the heart of Bangkok.',720,4.89,514,'https://images.unsplash.com/photo-1508009603885-50cf7c579365','Popular',ARRAY['River View','Sky Pool','Thai Spa']),
('Aurea Koh Samui','Chaweng Noi','Koh Samui','Surat Thani','Thailand','Island','A tropical villa retreat surrounded by jungle and turquoise water.',870,4.94,287,'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a','Editor''s Pick',ARRAY['Private Villa','Infinity Pool','Beach Access']),

-- UAE
('Aurea Dubai','Palm Jumeirah','Dubai','Dubai','United Arab Emirates','Ultra Luxury','An iconic modern retreat overlooking the Arabian Gulf.',1450,4.94,638,'https://images.unsplash.com/photo-1512453979798-5ea266f8880c','Popular',ARRAY['Skyline View','Private Beach','Luxury Spa']),
('Aurea Abu Dhabi','Saadiyat Island','Abu Dhabi','Abu Dhabi','United Arab Emirates','Beachfront','A serene island retreat combining Arabian hospitality with modern luxury.',1120,4.93,421,'https://images.unsplash.com/photo-1518684079-3c830dcef090',NULL,ARRAY['Private Beach','Art District','Golf']),

-- SWITZERLAND
('Aurea Zermatt','Zermatt','Zermatt','Valais','Switzerland','Mountain','An alpine sanctuary offering panoramic Matterhorn views.',1320,4.96,281,'https://images.unsplash.com/photo-1531366936337-7c912a4589a7','Rare Find',ARRAY['Mountain View','Ski Access','Fireplace']),
('Aurea St. Moritz','Lake St. Moritz','St. Moritz','Graubünden','Switzerland','Alpine','An elegant alpine retreat overlooking Lake St. Moritz.',1460,4.95,243,'https://images.unsplash.com/photo-1486911278844-a81c5267e227','Editor''s Pick',ARRAY['Lake View','Ski Access','Alpine Spa']),

-- UK
('Aurea London','Mayfair','London','England','United Kingdom','Urban Luxury','A refined Mayfair residence combining British heritage with contemporary design.',1180,4.90,604,'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',NULL,ARRAY['City View','Afternoon Tea','Private Chauffeur']),
('Aurea Edinburgh','New Town','Edinburgh','Scotland','United Kingdom','Historic','A grand Scottish retreat overlooking the historic capital.',790,4.89,331,'https://images.unsplash.com/photo-1506377585622-bedcbb027afc','New',ARRAY['Castle View','Whisky Lounge','Historic Rooms']),

-- USA
('Aurea New York','Manhattan','New York City','New York','United States','Skyline','A spectacular Manhattan retreat overlooking the city that never sleeps.',1540,4.93,712,'https://images.unsplash.com/photo-1496588152823-86ff7695e68f','Trending',ARRAY['Skyline View','Rooftop Lounge','Fine Dining']),
('Aurea Maui','Wailea','Maui','Hawaii','United States','Tropical','An exclusive Hawaiian retreat surrounded by beaches and Pacific views.',1260,4.95,342,'https://images.unsplash.com/photo-1505881502353-a1986add3762','Editor''s Pick',ARRAY['Ocean View','Private Villa','Golf Club']),
('Aurea Miami','South Beach','Miami','Florida','United States','Beachfront','A glamorous coastal escape overlooking South Beach.',980,4.89,631,'https://images.unsplash.com/photo-1535498730771-e735b998cd64','Trending',ARRAY['Ocean View','Beach Club','Rooftop Pool']),
('Aurea Aspen','Downtown Aspen','Aspen','Colorado','United States','Mountain','An exclusive alpine retreat surrounded by snow-covered peaks.',1350,4.96,219,'https://images.unsplash.com/photo-1486911278844-a81c5267e227','Rare Find',ARRAY['Ski Access','Mountain View','Fireplace']),
('Aurea Napa','Napa Valley','Napa','California','United States','Wine Estate','A vineyard sanctuary surrounded by rolling California wine country.',1080,4.94,312,'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb','Editor''s Pick',ARRAY['Vineyard','Wine Tasting','Private Chef']),

-- CANADA
('Aurea Vancouver','Coal Harbour','Vancouver','British Columbia','Canada','Harbourfront','A sophisticated waterfront retreat between the Pacific and coastal mountains.',920,4.91,384,'https://images.unsplash.com/photo-1559511260-66a654ae982a','Popular',ARRAY['Harbour View','Mountain View','Rooftop Lounge']),
('Aurea Banff','Lake Louise','Banff','Alberta','Canada','Mountain','An alpine sanctuary surrounded by turquoise lakes and the Canadian Rockies.',1140,4.96,267,'https://images.unsplash.com/photo-1503614472-8c93d56e92ce','Rare Find',ARRAY['Lake View','Mountain Lodge','Ski Access']),
('Aurea Toronto','Yorkville','Toronto','Ontario','Canada','Urban Luxury','A polished urban retreat in Toronto''s luxury district.',830,4.88,451,'https://images.unsplash.com/photo-1517090504586-fde19ea6066f',NULL,ARRAY['City View','Spa','Fine Dining']),

-- SPAIN
('Aurea Barcelona','Passeig de Gràcia','Barcelona','Catalonia','Spain','Urban Luxury','A contemporary Mediterranean retreat near Barcelona''s finest architecture.',860,4.89,529,'https://images.unsplash.com/photo-1539037116277-4db20889f2d4','Trending',ARRAY['City View','Rooftop Pool','Gourmet Dining']),
('Aurea Mallorca','Port de Sóller','Sóller','Balearic Islands','Spain','Seaside','A secluded Mediterranean estate surrounded by mountains and turquoise coves.',1020,4.94,214,'https://images.unsplash.com/photo-1530789253388-582c481c54b0','New',ARRAY['Sea View','Private Beach','Yacht Access']),
('Aurea Madrid','Salamanca','Madrid','Community of Madrid','Spain','Urban Boutique','A refined capital-city retreat near Madrid''s finest galleries and restaurants.',780,4.88,393,'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',NULL,ARRAY['City View','Art Gallery','Rooftop Bar']),

-- PORTUGAL
('Aurea Lisbon','Chiado','Lisbon','Lisbon District','Portugal','Boutique','An elegant historic residence overlooking central Lisbon.',720,4.88,473,'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',NULL,ARRAY['Historic District','Rooftop Bar','River View']),
('Aurea Madeira','Funchal','Funchal','Madeira','Portugal','Cliffside','A dramatic Atlantic retreat carved into Madeira''s volcanic coastline.',790,4.92,301,'https://images.unsplash.com/photo-1518709268805-4e9042af9f23','Editor''s Pick',ARRAY['Ocean View','Infinity Pool','Botanical Gardens']),

-- AUSTRIA
('Aurea Vienna','Innere Stadt','Vienna','Vienna','Austria','Historic Luxury','A grand European residence surrounded by imperial architecture.',940,4.91,416,'https://images.unsplash.com/photo-1516550893923-42d28e5677af',NULL,ARRAY['Historic Palace','Opera Access','Fine Dining']),
('Aurea Innsbruck','Nordkette','Innsbruck','Tyrol','Austria','Alpine','A refined mountain retreat overlooking the Austrian Alps.',830,4.93,192,'https://images.unsplash.com/photo-1486911278844-a81c5267e227','New',ARRAY['Mountain View','Ski Access','Alpine Spa']),

-- GERMANY
('Aurea Munich','Altstadt-Lehel','Munich','Bavaria','Germany','Urban Luxury','A sophisticated Bavarian residence blending heritage with modern luxury.',780,4.87,364,'https://images.unsplash.com/photo-1595867818082-083862f3d630',NULL,ARRAY['Historic Center','Beer Garden','Luxury Spa']),
('Aurea Berlin','Mitte','Berlin','Berlin','Germany','Design Hotel','A contemporary design retreat in the cultural heart of Berlin.',690,4.86,451,'https://images.unsplash.com/photo-1560969184-10fe8719e047','Trending',ARRAY['Design Suites','Rooftop Bar','Art Gallery']),

-- NETHERLANDS
('Aurea Amsterdam','Jordaan','Amsterdam','North Holland','Netherlands','Canalside','An elegant canal-side residence surrounded by historic architecture.',820,4.90,502,'https://images.unsplash.com/photo-1534351590666-13e3e96b5017','Popular',ARRAY['Canal View','Private Boat','Art Concierge']),

-- NORWAY
('Aurea Oslo','Aker Brygge','Oslo','Oslo','Norway','Waterfront','A modern Nordic retreat overlooking Oslo Fjord.',850,4.89,243,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',NULL,ARRAY['Fjord View','Nordic Spa','Fine Dining']),
('Aurea Lofoten','Reine','Reine','Nordland','Norway','Wilderness','A remote Arctic sanctuary surrounded by dramatic mountains.',1050,4.97,128,'https://images.unsplash.com/photo-1500534623283-312aade485b7','Rare Find',ARRAY['Northern Lights','Mountain View','Private Cabin']),

-- ICELAND
('Aurea Reykjavik','Harpa Waterfront','Reykjavik','Capital Region','Iceland','Nordic Luxury','A minimalist Icelandic retreat designed around ocean views and natural light.',910,4.92,336,'https://images.unsplash.com/photo-1504893524553-b855bce32c67','New',ARRAY['Northern Lights','Geothermal Spa','Ocean View']),
('Aurea Vik','Black Sand Coast','Vik','South Region','Iceland','Wilderness','A dramatic coastal lodge overlooking Iceland''s volcanic landscape.',780,4.93,184,'https://images.unsplash.com/photo-1504829857797-ddff29c27927','Rare Find',ARRAY['Black Sand Beach','Aurora','Volcano Tours']),

-- IRELAND
('Aurea Dublin','St. Stephen''s Green','Dublin','Leinster','Ireland','Historic','A refined Irish residence combining Georgian architecture with modern luxury.',740,4.88,298,'https://images.unsplash.com/photo-1549918864-48ac978761a4',NULL,ARRAY['Historic Rooms','Whiskey Lounge','Garden']),

-- CZECH REPUBLIC
('Aurea Prague','Malá Strana','Prague','Prague','Czech Republic','Historic Luxury','A romantic European retreat overlooking Prague''s medieval rooftops.',620,4.89,517,'https://images.unsplash.com/photo-1519677100203-a0e668c92439','Popular',ARRAY['Castle View','Historic Suites','River Cruise']),

-- TURKEY
('Aurea Istanbul','Bosphorus','Istanbul','Istanbul','Turkey','Bosphorus','A luxurious retreat overlooking the Bosphorus.',690,4.91,623,'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200','Trending',ARRAY['Bosphorus View','Hammam','Rooftop Dining']),
('Aurea Cappadocia','Göreme','Nevşehir','Cappadocia','Turkey','Cave Hotel','An atmospheric cave retreat carved into Cappadocia''s volcanic landscape.',760,4.95,317,'https://images.unsplash.com/photo-1528181304800-259b08848526','Editor''s Pick',ARRAY['Cave Suite','Hot Air Balloon','Valley View']),

-- MOROCCO
('Aurea Marrakech','Medina','Marrakech','Marrakesh-Safi','Morocco','Riad','A lavish Moroccan riad filled with courtyards and handcrafted details.',580,4.93,389,'https://images.unsplash.com/photo-1548013146-72479768bada','Editor''s Pick',ARRAY['Private Riad','Hammam','Courtyard']),
('Aurea Casablanca','Corniche','Casablanca','Casablanca-Settat','Morocco','Seaside','A contemporary Moroccan retreat overlooking the Atlantic.',620,4.86,245,'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43',NULL,ARRAY['Ocean View','Rooftop Lounge','Moroccan Spa']),

-- EGYPT
('Aurea Cairo','Zamalek','Cairo','Cairo Governorate','Egypt','Nilefront','An elegant Nile-side retreat with views toward Cairo''s skyline.',510,4.87,352,'https://images.unsplash.com/photo-1568322445389-f64ac2515020',NULL,ARRAY['Nile View','Rooftop Pool','Private Guide']),
('Aurea Luxor','Nile West Bank','Luxor','Luxor Governorate','Egypt','Heritage','A serene riverside retreat near Egypt''s ancient temples and tombs.',470,4.91,214,'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e','New',ARRAY['Nile View','Temple Tours','Private Guide']),

-- KENYA / TANZANIA
('Aurea Nairobi','Karen','Nairobi','Nairobi County','Kenya','Safari','A luxurious urban safari retreat surrounded by wildlife and gardens.',640,4.90,231,'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5','New',ARRAY['Safari Tours','Wildlife','Garden Villa']),
('Aurea Zanzibar','Nungwi','Zanzibar City','Zanzibar','Tanzania','Island','A secluded Indian Ocean retreat surrounded by white sand and turquoise water.',780,4.95,286,'https://images.unsplash.com/photo-1505881502353-a1986add3762','Rare Find',ARRAY['Private Beach','Diving','Sunset Cruise']),
('Aurea Serengeti','Serengeti National Park','Serengeti','Mara Region','Tanzania','Safari Lodge','A luxury wilderness camp overlooking the Serengeti plains.',1340,4.98,153,'https://images.unsplash.com/photo-1516426122078-c23e76319801','Editor''s Pick',ARRAY['Game Drives','Wildlife','Private Camp']),

-- SEYCHELLES / MAURITIUS
('Aurea Seychelles','Mahé Island','Victoria','Mahé','Seychelles','Island','An exclusive tropical sanctuary hidden among granite cliffs and beaches.',1780,4.98,174,'https://images.unsplash.com/photo-1589979481223-deb893043163','Editor''s Pick',ARRAY['Private Island','Coral Reef','Yacht']),
('Aurea Mauritius','Le Morne','Le Morne','Black River','Mauritius','Beachfront','A luxurious island escape beneath Le Morne mountain.',1120,4.94,312,'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86','Popular',ARRAY['Private Beach','Kitesurfing','Mountain View']),

-- SOUTH KOREA / SINGAPORE
('Aurea Seoul','Gangnam','Seoul','Seoul','South Korea','Urban Luxury','A futuristic luxury residence overlooking Seoul.',790,4.90,587,'https://images.unsplash.com/photo-1538485399081-7c8970b5d3f8','Trending',ARRAY['Skyline View','Korean Spa','Fine Dining']),
('Aurea Jeju','Seogwipo','Seogwipo','Jeju Province','South Korea','Island','A volcanic island retreat surrounded by cliffs and ocean.',720,4.92,294,'https://images.unsplash.com/photo-1578662996442-48f60103fc96','New',ARRAY['Ocean View','Volcanic Coast','Spa']),
('Aurea Singapore','Marina Bay','Singapore','Central Region','Singapore','Skyline','A sophisticated city sanctuary overlooking Marina Bay.',1060,4.93,742,'https://images.unsplash.com/photo-1525625293386-3f8f99389edd','Popular',ARRAY['Marina View','Infinity Pool','Sky Bar']),

-- VIETNAM / MALAYSIA / PHILIPPINES
('Aurea Da Nang','My Khe Beach','Da Nang','Da Nang','Vietnam','Beachfront','A contemporary coastal retreat overlooking the South China Sea.',520,4.89,431,'https://images.unsplash.com/photo-1528127269322-539801943592','New',ARRAY['Beachfront','Infinity Pool','Spa']),
('Aurea Hanoi','Hoan Kiem','Hanoi','Hanoi','Vietnam','Boutique','A refined cultural retreat near Hanoi''s historic quarter.',470,4.87,306,'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a',NULL,ARRAY['Old Quarter','Vietnamese Cuisine','Rooftop Bar']),
('Aurea Kuala Lumpur','KLCC','Kuala Lumpur','Kuala Lumpur','Malaysia','Skyline','A modern high-rise sanctuary overlooking the Kuala Lumpur skyline.',620,4.88,412,'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',NULL,ARRAY['City View','Sky Pool','Rooftop Restaurant']),
('Aurea Palawan','El Nido','El Nido','Palawan','Philippines','Island','A pristine island sanctuary surrounded by limestone cliffs and emerald lagoons.',760,4.94,287,'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86','Editor''s Pick',ARRAY['Island Hopping','Private Beach','Lagoon View']),

-- AUSTRALIA / NEW ZEALAND
('Aurea Sydney','Circular Quay','Sydney','New South Wales','Australia','Harbourfront','A contemporary harbour retreat with panoramic views of Sydney Harbour.',1080,4.91,486,'https://images.unsplash.com/photo-1506973035872-a4f8c4e3a0b5',NULL,ARRAY['Harbour View','Rooftop Pool','Fine Dining']),
('Aurea Melbourne','Southbank','Melbourne','Victoria','Australia','Urban Luxury','A design-forward city retreat beside the Yarra River.',820,4.88,374,'https://images.unsplash.com/photo-1514395462725-fb4566210144',NULL,ARRAY['City View','Art Gallery','Wine Bar']),
('Aurea Queenstown','Lake Wakatipu','Queenstown','Otago','New Zealand','Wilderness','A dramatic alpine retreat overlooking Lake Wakatipu and the Southern Alps.',940,4.94,238,'https://images.unsplash.com/photo-1507699622108-4be3abd695ad','New',ARRAY['Lake View','Mountain Lodge','Adventure Tours']),
('Aurea Auckland','Viaduct Harbour','Auckland','Auckland','New Zealand','Harbourfront','A sophisticated harbour retreat overlooking Auckland''s waterfront.',760,4.89,283,'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',NULL,ARRAY['Harbour View','Sailing','Rooftop Pool']),

-- SOUTH AFRICA
('Aurea Cape Town','Camps Bay','Cape Town','Western Cape','South Africa','Coastal','A sophisticated coastal retreat beneath Table Mountain.',760,4.90,395,'https://images.unsplash.com/photo-1580060839134-75a5edca2e99','Popular',ARRAY['Ocean View','Wine Tours','Infinity Pool']),
('Aurea Kruger','Kruger National Park','Skukuza','Mpumalanga','South Africa','Safari Lodge','An intimate safari lodge surrounded by wildlife and open savannah.',1180,4.96,184,'https://images.unsplash.com/photo-1516426122078-c23e76319801','Rare Find',ARRAY['Game Drives','Bush Dining','Wildlife']),

-- BRAZIL / ARGENTINA / PERU / CHILE
('Aurea Rio','Ipanema','Rio de Janeiro','Rio de Janeiro','Brazil','Beachfront','A vibrant luxury escape overlooking Ipanema Beach.',680,4.88,451,'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',NULL,ARRAY['Beach Access','Ocean View','Rooftop Pool']),
('Aurea São Paulo','Jardins','São Paulo','São Paulo','Brazil','Urban Luxury','A sophisticated city retreat surrounded by galleries and fine dining.',610,4.86,327,'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',NULL,ARRAY['City View','Fine Dining','Art Gallery']),
('Aurea Buenos Aires','Recoleta','Buenos Aires','Buenos Aires','Argentina','Urban Boutique','A refined European-inspired residence in Buenos Aires.',590,4.87,326,'https://images.unsplash.com/photo-1589909202802-8f4aadce1849',NULL,ARRAY['Historic District','Wine Cellar','Tango Lounge']),
('Aurea Cusco','Historic Center','Cusco','Cusco','Peru','Heritage','A beautifully restored colonial residence near the ancient heart of Cusco.',540,4.91,274,'https://images.unsplash.com/photo-1526392060635-9d6019884377','New',ARRAY['Historic Architecture','Andes View','Private Guide']),
('Aurea Patagonia','Torres del Paine','Torres del Paine','Magallanes','Chile','Wilderness','A remote luxury lodge surrounded by glaciers, lakes, and mountains.',1920,4.98,142,'https://images.unsplash.com/photo-1511497584788-876760111969','Rare Find',ARRAY['Glacier Views','Guided Treks','Fire Lounge']),

-- MEXICO / CARIBBEAN / PACIFIC
('Aurea Tulum','Tulum Beach','Tulum','Quintana Roo','Mexico','Jungle Beach','A barefoot luxury retreat where tropical jungle meets the Caribbean Sea.',870,4.93,447,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e','Popular',ARRAY['Jungle Villa','Private Beach','Cenote Access']),
('Aurea Los Cabos','Cabo San Lucas','Cabo San Lucas','Baja California Sur','Mexico','Desert Beach','A dramatic desert-meets-ocean retreat on Mexico''s Pacific coast.',1120,4.94,392,'https://images.unsplash.com/photo-1540541338287-41700207dee6','Editor''s Pick',ARRAY['Ocean View','Private Beach','Golf']),
('Aurea Fiji','Denarau Island','Nadi','Western Division','Fiji','Island','A secluded Pacific island escape surrounded by turquoise lagoons.',980,4.95,198,'https://images.unsplash.com/photo-1500534623283-312aade485b7','Rare Find',ARRAY['Private Island','Diving','Sunset Cruise']),
('Aurea Bora Bora','Matira','Bora Bora','Leeward Islands','French Polynesia','Overwater','An iconic Polynesian sanctuary above a crystal-clear lagoon.',2380,4.99,143,'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee','Rare Find',ARRAY['Overwater Villa','Lagoon View','Private Yacht']),

-- SCANDINAVIA
('Aurea Copenhagen','Nyhavn','Copenhagen','Capital Region','Denmark','Canalside','A stylish Nordic retreat overlooking Copenhagen''s historic waterfront.',820,4.90,267,'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc',NULL,ARRAY['Canal View','Nordic Spa','Cycling']),
('Aurea Stockholm','Gamla Stan','Stockholm','Stockholm County','Sweden','Historic','A refined Nordic residence in Stockholm''s historic center.',850,4.91,239,'https://images.unsplash.com/photo-1509356843151-3e7d96241e11','New',ARRAY['Old Town','Water View','Sauna']),
('Aurea Helsinki','Katajanokka','Helsinki','Uusimaa','Finland','Nordic','A minimalist waterfront retreat inspired by Finnish design.',760,4.88,182,'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',NULL,ARRAY['Sea View','Sauna','Nordic Dining']),

-- PORTUGAL / CROATIA / MALTA
('Aurea Dubrovnik','Old Town','Dubrovnik','Dubrovnik-Neretva','Croatia','Seaside','A historic Adriatic retreat overlooking Dubrovnik''s fortified coastline.',930,4.94,355,'https://images.unsplash.com/photo-1555990538-1e5f2a5c0a54','Trending',ARRAY['Sea View','Old Town','Private Boat']),
('Aurea Valletta','Grand Harbour','Valletta','Southern Region','Malta','Historic','A grand Mediterranean residence overlooking the Grand Harbour.',710,4.89,205,'https://images.unsplash.com/photo-1514222709107-a180c68d72b4','New',ARRAY['Harbour View','Historic Suite','Yacht Charter']),

-- EASTERN EUROPE
('Aurea Budapest','Danube River','Budapest','Central Hungary','Hungary','Riverfront','An elegant Danube retreat with panoramic views of Budapest.',640,4.88,318,'https://images.unsplash.com/photo-1541849546-216549ae216d',NULL,ARRAY['Danube View','Thermal Spa','Rooftop Bar']),
('Aurea Warsaw','Old Town','Warsaw','Masovian','Poland','Urban Boutique','A modern luxury retreat beside Warsaw''s historic old town.',590,4.86,227,'https://images.unsplash.com/photo-1519197924294-4ba991a11128',NULL,ARRAY['Historic Center','City View','Spa']),

-- MIDDLE EAST
('Aurea Doha','The Pearl','Doha','Doha','Qatar','Waterfront','A polished Gulf retreat combining contemporary design and Arabian hospitality.',970,4.91,287,'https://images.unsplash.com/photo-1553484042-920a72ec7d26','New',ARRAY['Sea View','Private Beach','Fine Dining']),
('Aurea Muscat','Al Mouj','Muscat','Muscat','Oman','Coastal','A serene Arabian retreat between rugged mountains and the Gulf of Oman.',840,4.93,214,'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e','Rare Find',ARRAY['Mountain View','Private Beach','Desert Tours']),

-- AFRICA
('Aurea Accra','Labadi','Accra','Greater Accra','Ghana','Beachfront','A contemporary West African coastal retreat overlooking the Atlantic.',510,4.84,167,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e','New',ARRAY['Beachfront','Pool','Cultural Tours']),
('Aurea Cape Winelands','Stellenbosch','Stellenbosch','Western Cape','South Africa','Wine Estate','A vineyard estate surrounded by mountains and historic wine farms.',890,4.95,236,'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb','Editor''s Pick',ARRAY['Vineyard','Wine Tasting','Mountain View']);

-- ============================================================
-- ROOMS
-- Every hotel receives 4 room tiers.
-- ============================================================

INSERT INTO rooms
(hotel_id,name,size_sqm,capacity,price,image_url,amenities,is_available)
SELECT
    h.id,
    r.name,
    r.size_sqm,
    r.capacity,
    (r.price_factor * h.base_price)::numeric(10,2),
    r.image_url,
    r.amenities,
    r.is_available
FROM hotels h
CROSS JOIN (
    VALUES
    ('Deluxe Suite',65.0,2,1.00,'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4',ARRAY['King Bed','Ocean View','Soaking Tub','Private Terrace'],true),
    ('Executive Suite',95.0,2,1.35,'https://images.unsplash.com/photo-1731336478850-6bce7235e320',ARRAY['King Bed','Panoramic View','Living Room','Butler Service'],true),
    ('Luxury Villa',140.0,4,1.73,'https://images.unsplash.com/photo-1595161695996-f746349f4945',ARRAY['2 Bedrooms','Private Pool','Full Kitchen','Dedicated Staff'],true),
    ('Presidential Suite',220.0,6,3.06,'https://images.unsplash.com/photo-1552858725-693709cc17c7',ARRAY['3 Bedrooms','Rooftop Terrace','Private Chef','Helipad Access'],false)
) AS r(name,size_sqm,capacity,price_factor,image_url,amenities,is_available);

-- ============================================================
-- PROMO CODES
-- ============================================================

INSERT INTO promo_codes (code,discount_percent,active)
VALUES
('AUREA30',30,true),
('WELCOME15',15,true),
('LUXURY20',20,true),
('SUMMER25',25,true),
('VIP40',40,true),
('AUREA10',10,true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DEMO USERS
-- IMPORTANT: Replace placeholder password hashes with hashes
-- generated by your backend signup/authentication system.
-- ============================================================

INSERT INTO users
(first_name,last_name,email,phone,password_hash,role,loyalty_points)
VALUES
('Alexandra','Laurent','a.laurent@email.com','+33 6 12 34 56 78','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',12000),
('Aurea','Admin','admin@aurea.com','+1 555 010 0000','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','admin',0),
('Sophia','Mitchell','sophia.mitchell@example.com','+1 212 555 0181','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',8450),
('Liam','Anderson','liam.anderson@example.com','+44 20 5555 0142','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',6320),
('Mia','Rossi','mia.rossi@example.com','+39 06 555 0188','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',15400),
('Kenji','Tanaka','kenji.tanaka@example.com','+81 3 5555 0182','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',9200),
('Arjun','Mehta','arjun.mehta@example.com','+91 98 5555 0142','$2b$10$PLACEHOLDERHASHPLACEHOLDERHASHPLACEHOLDER','guest',11800)
ON CONFLICT DO NOTHING;


COMMIT;
