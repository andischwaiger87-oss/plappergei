import type { LanguageId } from './languages';

export interface VocabItem {
    id: string;
    categoryId: string;
    image: string; // URL or path
    emoji?: string; // Fallback
    translations: Record<LanguageId, string>;
    audio?: Record<LanguageId, string>; // Paths to audio files
}

export const CATEGORIES = [
    { id: 'food', icon: '🍎', color: 'bg-rose-100 text-rose-600', label: { de: 'Jause', en: 'Food' } },
    { id: 'animals', icon: '🐱', color: 'bg-orange-100 text-orange-600', label: { de: 'Tiere', en: 'Animals' } },
    { id: 'nature', icon: '🌳', color: 'bg-green-100 text-green-600', label: { de: 'Natur', en: 'Nature' } },
    { id: 'seasons', icon: '🌤️', color: 'bg-blue-100 text-blue-600', label: { de: 'Jahreszeiten', en: 'Seasons' } },
    { id: 'vehicles', icon: '🚜', color: 'bg-amber-100 text-amber-600', label: { de: 'Fahrzeuge', en: 'Vehicles' } },
    { id: 'sports', icon: '⚽', color: 'bg-emerald-100 text-emerald-600', label: { de: 'Sport', en: 'Sports' } },
    { id: 'toys', icon: '🧸', color: 'bg-pink-100 text-pink-600', label: { de: 'Spielzeug', en: 'Toys' } },
    { id: 'tech', icon: '📱', color: 'bg-sky-100 text-sky-600', label: { de: 'Technik', en: 'Technology' } },
    { id: 'school', icon: '🎒', color: 'bg-yellow-100 text-yellow-600', label: { de: 'Schule', en: 'School' } },
    { id: 'home', icon: '🏠', color: 'bg-purple-100 text-purple-600', label: { de: 'Zuhause', en: 'Home' } },
    { id: 'clothing', icon: '👕', color: 'bg-indigo-100 text-indigo-600', label: { de: 'Kleidung', en: 'Clothing' } },
    { id: 'body', icon: '👃', color: 'bg-red-100 text-red-600', label: { de: 'Körper', en: 'Body' } },
    { id: 'history', icon: '🏰', color: 'bg-stone-100 text-stone-600', label: { de: 'Geschichte', en: 'History' } },
    { id: 'music', icon: '🎸', color: 'bg-fuchsia-100 text-fuchsia-600', label: { de: 'Musik', en: 'Music' } },
];

export const VOCAB_ITEMS: VocabItem[] = [
    // --- FOOD (JAUSE) ---
    {
        id: 'apple', categoryId: 'food', image: '/assets/apple.webp', emoji: '🍎',
        translations: { de: 'Apfel', pinz: 'Oapfi', en: 'Apple', it: 'Mela', fr: 'Pomme', tr: 'Elma', es: 'Manzana', 'ar-sy': 'Tuffāḥa', zh: 'Píngguǒ' }
    },
    {
        id: 'banana', categoryId: 'food', image: '/assets/banana.webp', emoji: '🍌',
        translations: { de: 'Banane', pinz: 'Banane', en: 'Banana', it: 'Banana', fr: 'Banane', tr: 'Muz', es: 'Plátano', 'ar-sy': 'Mawz', zh: 'Xiāngjiāo' }
    },
    {
        id: 'bread', categoryId: 'food', image: '/assets/bread.webp', emoji: '🍞',
        translations: { de: 'Brot', pinz: 'Broud', en: 'Bread', it: 'Pane', fr: 'Pain', tr: 'Ekmek', es: 'Pan', 'ar-sy': 'Khubz', zh: 'Miànbāo' }
    },
    {
        id: 'water', categoryId: 'food', image: '/assets/water.webp', emoji: '💧',
        translations: { de: 'Wasser', pinz: 'Wossa', en: 'Water', it: 'Acqua', fr: 'Eau', tr: 'Su', es: 'Agua', 'ar-sy': 'Māʾ', zh: 'Shuǐ' }
    },
    {
        id: 'milk', categoryId: 'food', image: '/assets/milk.webp', emoji: '🥛',
        translations: { de: 'Milch', pinz: 'Müch', en: 'Milk', it: 'Latte', fr: 'Lait', tr: 'Süt', es: 'Leche', 'ar-sy': 'Ḥalīb', zh: 'Niúnǎi' }
    },
    {
        id: 'egg', categoryId: 'food', image: '/assets/egg.webp', emoji: '🥚',
        translations: { de: 'Ei', pinz: 'Oa', en: 'Egg', it: 'Uovo', fr: 'Œuf', tr: 'Yumurta', es: 'Huevo', 'ar-sy': 'Bayḍa', zh: 'Jīdàn' }
    },
    {
        id: 'cheese', categoryId: 'food', image: '/assets/cheese.webp', emoji: '🧀',
        translations: { de: 'Käse', pinz: 'Kas', en: 'Cheese', it: 'Formaggio', fr: 'Fromage', tr: 'Peynir', es: 'Queso', 'ar-sy': 'Jibn', zh: 'Nǎilào' }
    },
    {
        id: 'strawberry', categoryId: 'food', image: '/assets/strawberry.webp', emoji: '🍓',
        translations: { de: 'Erdbeere', pinz: 'Eadbea', en: 'Strawberry', it: 'Fragola', fr: 'Fraise', tr: 'Çilek', es: 'Fresa', 'ar-sy': 'Frawla', zh: 'Cǎoméi' }
    },
    {
        id: 'icecream', categoryId: 'food', image: '/assets/icecream.webp', emoji: '🍦',
        translations: { de: 'Eis', pinz: 'Eis', en: 'Ice Cream', it: 'Gelato', fr: 'Glace', tr: 'Dondurma', es: 'Helado', 'ar-sy': 'Būẓa', zh: 'Bīngqílín' }
    },

    // --- ANIMALS (TIERE) ---
    {
        id: 'cat', categoryId: 'animals', image: '/assets/cat.webp', emoji: '🐱',
        translations: { de: 'Katze', pinz: 'Kotz', en: 'Cat', it: 'Gatto', fr: 'Chat', tr: 'Kedi', es: 'Gato', 'ar-sy': 'Qiṭṭa', zh: 'Māo' }
    },
    {
        id: 'dog', categoryId: 'animals', image: '/assets/dog.webp', emoji: '🐶',
        translations: { de: 'Hund', pinz: 'Hund', en: 'Dog', it: 'Cane', fr: 'Chien', tr: 'Köpek', es: 'Perro', 'ar-sy': 'Kalb', zh: 'Gǒu' }
    },
    {
        id: 'cow', categoryId: 'animals', image: '/assets/cow.webp', emoji: '🐮',
        translations: { de: 'Kuh', pinz: 'Kua', en: 'Cow', it: 'Mucca', fr: 'Vache', tr: 'İnek', es: 'Vaca', 'ar-sy': 'Baqara', zh: 'Niú' }
    },
    {
        id: 'pig', categoryId: 'animals', image: '/assets/pig.webp', emoji: '🐷',
        translations: { de: 'Schwein', pinz: 'Sau', en: 'Pig', it: 'Maiale', fr: 'Cochon', tr: 'Domuz', es: 'Cerdo', 'ar-sy': 'Khinzīr', zh: 'Zhū' }
    },
    {
        id: 'sheep', categoryId: 'animals', image: '/assets/sheep.webp', emoji: '🐑',
        translations: { de: 'Schaf', pinz: 'Schof', en: 'Sheep', it: 'Pecora', fr: 'Mouton', tr: 'Koyun', es: 'Oveja', 'ar-sy': 'Kharūf', zh: 'Yáng' }
    },
    {
        id: 'bird', categoryId: 'animals', image: '/assets/bird.webp', emoji: '🐦',
        translations: { de: 'Vogel', pinz: 'Vogl', en: 'Bird', it: 'Uccello', fr: 'Oiseau', tr: 'Kuş', es: 'Pájaro', 'ar-sy': 'ʿUṣfūr', zh: 'Niǎo' }
    },
    {
        id: 'lion', categoryId: 'animals', image: '/assets/lion.webp', emoji: '🦁',
        translations: { de: 'Löwe', pinz: 'Löwe', en: 'Lion', it: 'Leone', fr: 'Lion', tr: 'Aslan', es: 'León', 'ar-sy': 'Asad', zh: 'Shīzi' }
    },
    {
        id: 'elephant', categoryId: 'animals', image: '/assets/elephant.webp', emoji: '🐘',
        translations: { de: 'Elefant', pinz: 'Elefant', en: 'Elephant', it: 'Elefante', fr: 'Éléphant', tr: 'Fil', es: 'Elefante', 'ar-sy': 'Fīl', zh: 'Dàxiàng' }
    },

    // --- NATURE (NATUR) ---
    {
        id: 'tree', categoryId: 'nature', image: '/assets/tree.webp', emoji: '🌳',
        translations: { de: 'Baum', pinz: 'Bam', en: 'Tree', it: 'Albero', fr: 'Arbre', tr: 'Ağaç', es: 'Árbol', 'ar-sy': 'Shajara', zh: 'Shù' }
    },
    {
        id: 'flower', categoryId: 'nature', image: '/assets/flower.webp', emoji: '🌸',
        translations: { de: 'Blume', pinz: 'Bleamal', en: 'Flower', it: 'Fiore', fr: 'Fleur', tr: 'Çiçek', es: 'Flor', 'ar-sy': 'Zahra', zh: 'Huā' }
    },
    {
        id: 'forest', categoryId: 'nature', image: '/assets/forest.webp', emoji: '🌲',
        translations: { de: 'Wald', pinz: 'Woid', en: 'Forest', it: 'Foresta', fr: 'Forêt', tr: 'Orman', es: 'Bosque', 'ar-sy': 'Ghāba', zh: 'Sēnlín' }
    },
    {
        id: 'mountain', categoryId: 'nature', image: '/assets/mountain.webp', emoji: '🏔️',
        translations: { de: 'Berg', pinz: 'Beag', en: 'Mountain', it: 'Montagna', fr: 'Montagne', tr: 'Dağ', es: 'Montaña', 'ar-sy': 'Jabal', zh: 'Shān' }
    },
    {
        id: 'lake', categoryId: 'nature', image: '/assets/lake.webp', emoji: '🌊',
        translations: { de: 'See', pinz: 'See', en: 'Lake', it: 'Lago', fr: 'Lac', tr: 'Göl', es: 'Lago', 'ar-sy': 'Buḥayra', zh: 'Hú' }
    },

    // --- SEASONS & WEATHER (JAHRESZEITEN) ---
    {
        id: 'spring', categoryId: 'seasons', image: '/assets/spring.webp', emoji: '🌱',
        translations: { de: 'Frühling', pinz: 'Frialing', en: 'Spring', it: 'Primavera', fr: 'Printemps', tr: 'İlkbahar', es: 'Primavera', 'ar-sy': 'Rabīʿ', zh: 'Chūntiān' }
    },
    {
        id: 'summer', categoryId: 'seasons', image: '/assets/summer.webp', emoji: '☀️',
        translations: { de: 'Sommer', pinz: 'Summa', en: 'Summer', it: 'Estate', fr: 'Été', tr: 'Yaz', es: 'Verano', 'ar-sy': 'Ṣayf', zh: 'Xiàtiān' }
    },
    {
        id: 'autumn', categoryId: 'seasons', image: '/assets/autumn.webp', emoji: '🍂',
        translations: { de: 'Herbst', pinz: 'Heabst', en: 'Autumn', it: 'Autunno', fr: 'Automne', tr: 'Sonbahar', es: 'Otoño', 'ar-sy': 'Kharīf', zh: 'Qiūtiān' }
    },
    {
        id: 'winter', categoryId: 'seasons', image: '/assets/winter.webp', emoji: '⛄',
        translations: { de: 'Winter', pinz: 'Winta', en: 'Winter', it: 'Inverno', fr: 'Hiver', tr: 'Kış', es: 'Invierno', 'ar-sy': 'Shitāʾ', zh: 'Dōngtiān' }
    },
    {
        id: 'sun', categoryId: 'seasons', image: '/assets/sun.webp', emoji: '☀️',
        translations: { de: 'Sonne', pinz: 'Sunn', en: 'Sun', it: 'Sole', fr: 'Soleil', tr: 'Güneş', es: 'Sol', 'ar-sy': 'Shams', zh: 'Tàiyáng' }
    },
    {
        id: 'rain', categoryId: 'seasons', image: '/assets/rain.webp', emoji: '🌧️',
        translations: { de: 'Regen', pinz: 'Reng', en: 'Rain', it: 'Pioggia', fr: 'Pluie', tr: 'Yağmur', es: 'Lluvia', 'ar-sy': 'Maṭar', zh: 'Yǔ' }
    },
    {
        id: 'snow', categoryId: 'seasons', image: '/assets/snow.webp', emoji: '❄️',
        translations: { de: 'Schnee', pinz: 'Schne', en: 'Snow', it: 'Neve', fr: 'Neige', tr: 'Kar', es: 'Nieve', 'ar-sy': 'Thalj', zh: 'Xuě' }
    },

    // --- VEHICLES (FAHRZEUGE) ---
    {
        id: 'car', categoryId: 'vehicles', image: '/assets/car.webp', emoji: '🚗',
        translations: { de: 'Auto', pinz: 'Auto', en: 'Car', it: 'Auto', fr: 'Voiture', tr: 'Araba', es: 'Coche', 'ar-sy': 'Sayyāra', zh: 'Qìchē' }
    },
    {
        id: 'bicycle', categoryId: 'vehicles', image: '/assets/bicycle.webp', emoji: '🚲',
        translations: { de: 'Fahrrad', pinz: 'Radl', en: 'Bicycle', it: 'Bicicletta', fr: 'Vélo', tr: 'Bisiklet', es: 'Bicicleta', 'ar-sy': 'Darrāja', zh: 'Zìxíngchē' }
    },
    {
        id: 'bus', categoryId: 'vehicles', image: '/assets/bus.webp', emoji: '🚌',
        translations: { de: 'Bus', pinz: 'Bus', en: 'Bus', it: 'Autobus', fr: 'Bus', tr: 'Otobüs', es: 'Autobús', 'ar-sy': 'Bāṣ', zh: 'Gōnggòng qìchē' }
    },
    {
        id: 'train', categoryId: 'vehicles', image: '/assets/train.webp', emoji: '🚂',
        translations: { de: 'Zug', pinz: 'Zug', en: 'Train', it: 'Treno', fr: 'Train', tr: 'Tren', es: 'Tren', 'ar-sy': 'Qiṭār', zh: 'Huǒchē' }
    },
    {
        id: 'tractor', categoryId: 'vehicles', image: '/assets/tractor.webp', emoji: '🚜',
        translations: { de: 'Traktor', pinz: 'Trakta', en: 'Tractor', it: 'Trattore', fr: 'Tracteur', tr: 'Traktör', es: 'Tractor', 'ar-sy': 'Jarrār', zh: 'Tuōlājī' }
    },
    {
        id: 'airplane', categoryId: 'vehicles', image: '/assets/airplane.webp', emoji: '✈️',
        translations: { de: 'Flugzeug', pinz: 'Fliaga', en: 'Airplane', it: 'Aereo', fr: 'Avion', tr: 'Uçak', es: 'Avión', 'ar-sy': 'Ṭāʾira', zh: 'Fēijī' }
    },
    {
        id: 'firetruck', categoryId: 'vehicles', image: '/assets/firetruck.webp', emoji: '🚒',
        translations: { de: 'Feuerwehr', pinz: 'Feiawea', en: 'Fire Truck', it: 'Pompieri', fr: 'Pompier', tr: 'İtfaiye', es: 'Bomberos', 'ar-sy': 'Sayyārat iṭfāʾ', zh: 'Xiāofángchē' }
    },

    // --- SPORTS (SPORT) ---
    {
        id: 'soccer', categoryId: 'sports', image: '/assets/soccer.webp', emoji: '⚽',
        translations: { de: 'Fußball', pinz: 'Fuassboi', en: 'Soccer', it: 'Calcio', fr: 'Football', tr: 'Futbol', es: 'Fútbol', 'ar-sy': 'Kurat al-qadam', zh: 'Zúqiú' }
    },
    {
        id: 'ski', categoryId: 'sports', image: '/assets/ski.webp', emoji: '🎿',
        translations: { de: 'Ski', pinz: 'Schi', en: 'Ski', it: 'Sci', fr: 'Ski', tr: 'Kayak', es: 'Esquí', 'ar-sy': 'Tazalluj', zh: 'Huáxuě' }
    },
    {
        id: 'swim', categoryId: 'sports', image: '/assets/swim.webp', emoji: '🏊',
        translations: { de: 'Schwimmen', pinz: 'Schwimma', en: 'Swimming', it: 'Nuoto', fr: 'Natation', tr: 'Yüzme', es: 'Natación', 'ar-sy': 'Sibāḥa', zh: 'Yóuyǒng' }
    },
    {
        id: 'tennis', categoryId: 'sports', image: '/assets/tennis.webp', emoji: '🎾',
        translations: { de: 'Tennis', pinz: 'Tennis', en: 'Tennis', it: 'Tennis', fr: 'Tennis', tr: 'Tenis', es: 'Tenis', 'ar-sy': 'Tinnis', zh: 'Wǎngqiú' }
    },
    {
        id: 'running', categoryId: 'sports', image: '/assets/running.webp', emoji: '🏃',
        translations: { de: 'Laufen', pinz: 'Laufn', en: 'Running', it: 'Corsa', fr: 'Course', tr: 'Koşu', es: 'Correr', 'ar-sy': 'Rakḍ', zh: 'Pǎobù' }
    },

    // --- TOYS (SPIELZEUG) ---
    {
        id: 'ball', categoryId: 'toys', image: '/assets/ball.webp', emoji: '🏐',
        translations: { de: 'Ball', pinz: 'Boi', en: 'Ball', it: 'Palla', fr: 'Balle', tr: 'Top', es: 'Pelota', 'ar-sy': 'Kura', zh: 'Qiú' }
    },
    {
        id: 'doll', categoryId: 'toys', image: '/assets/doll.webp', emoji: '🎎',
        translations: { de: 'Puppe', pinz: 'Puppn', en: 'Doll', it: 'Bambola', fr: 'Poupée', tr: 'Oyuncak Bebek', es: 'Muñeca', 'ar-sy': 'Dumya', zh: 'Wáwá' }
    },
    {
        id: 'teddy', categoryId: 'toys', image: '/assets/teddy.webp', emoji: '🧸',
        translations: { de: 'Teddybär', pinz: 'Teddy', en: 'Teddy Bear', it: 'Orsacchiotto', fr: 'Ours en peluche', tr: 'Oyuncak Ayı', es: 'Oso de peluche', 'ar-sy': 'Dubb', zh: 'Tàidíxióng' }
    },
    {
        id: 'blocks', categoryId: 'toys', image: '/assets/blocks.webp', emoji: '🧱',
        translations: { de: 'Bausteine', pinz: 'Baustana', en: 'Blocks', it: 'Costruzioni', fr: 'Blocs', tr: 'Bloklar', es: 'Bloques', 'ar-sy': 'Mukaʿʿabāt', zh: 'Jīmù' }
    },
    {
        id: 'kite', categoryId: 'toys', image: '/assets/kite.webp', emoji: '🪁',
        translations: { de: 'Drachen', pinz: 'Drachn', en: 'Kite', it: 'Aquilone', fr: 'Cerf-volant', tr: 'Uçurtma', es: 'Cometa', 'ar-sy': 'Ṭāʾira waraqiyya', zh: 'Fēngzhēng' }
    },

    // --- TECH (TECHNIK) ---
    {
        id: 'smartphone', categoryId: 'tech', image: '/assets/smartphone.webp', emoji: '📱',
        translations: { de: 'Smartphone', pinz: 'Händi', en: 'Smartphone', it: 'Smartphone', fr: 'Smartphone', tr: 'Akıllı Telefon', es: 'Móvil', 'ar-sy': 'Jawwāl', zh: 'Shǒujī' }
    },
    {
        id: 'computer', categoryId: 'tech', image: '/assets/computer.webp', emoji: '💻',
        translations: { de: 'Computer', pinz: 'Kompjuta', en: 'Computer', it: 'Computer', fr: 'Ordinateur', tr: 'Bilgisayar', es: 'Ordenador', 'ar-sy': 'Ḥāsūb', zh: 'Diànnǎo' }
    },
    {
        id: 'robot', categoryId: 'tech', image: '/assets/robot.webp', emoji: '🤖',
        translations: { de: 'Roboter', pinz: 'Robota', en: 'Robot', it: 'Robot', fr: 'Robot', tr: 'Robot', es: 'Robot', 'ar-sy': 'Insān āli', zh: 'Jīqìrén' }
    },
    {
        id: 'headphones', categoryId: 'tech', image: '/assets/headphones.webp', emoji: '🎧',
        translations: { de: 'Kopfhörer', pinz: 'Kopfhörer', en: 'Headphones', it: 'Cuffie', fr: 'Écouteurs', tr: 'Kulaklık', es: 'Auriculares', 'ar-sy': 'Samāʿāt', zh: 'Ěrjī' }
    },

    // --- SCHOOL (SCHULE) ---
    {
        id: 'book', categoryId: 'school', image: '/assets/book.webp', emoji: '📚',
        translations: { de: 'Buch', pinz: 'Buach', en: 'Book', it: 'Libro', fr: 'Livre', tr: 'Kitap', es: 'Libro', 'ar-sy': 'Kitāb', zh: 'Shū' }
    },
    {
        id: 'pencil', categoryId: 'school', image: '/assets/pencil.webp', emoji: '✏️',
        translations: { de: 'Stift', pinz: 'Stift', en: 'Pencil', it: 'Matita', fr: 'Crayon', tr: 'Kalem', es: 'Lápiz', 'ar-sy': 'Qalam', zh: 'Qiānbǐ' }
    },
    {
        id: 'bag', categoryId: 'school', image: '/assets/bag.webp', emoji: '🎒',
        translations: { de: 'Schultasche', pinz: 'Toschn', en: 'Bag', it: 'Borsa', fr: 'Sac', tr: 'Çanta', es: 'Bolsa', 'ar-sy': 'Ḥaqība', zh: 'Bāo' }
    },
    {
        id: 'scissors', categoryId: 'school', image: '/assets/scissors.webp', emoji: '✂️',
        translations: { de: 'Schere', pinz: 'Schea', en: 'Scissors', it: 'Forbici', fr: 'Ciseaux', tr: 'Makas', es: 'Tijeras', 'ar-sy': 'Miqaṣṣ', zh: 'Jiǎndāo' }
    },

    // --- HOME (ZUHAUSE) ---
    {
        id: 'house', categoryId: 'home', image: '/assets/house.webp', emoji: '🏠',
        translations: { de: 'Haus', pinz: 'Haisl', en: 'House', it: 'Casa', fr: 'Maison', tr: 'Ev', es: 'Casa', 'ar-sy': 'Bayt', zh: 'Fángzi' }
    },
    {
        id: 'bed', categoryId: 'home', image: '/assets/bed.webp', emoji: '🛏️',
        translations: { de: 'Bett', pinz: 'Bett', en: 'Bed', it: 'Letto', fr: 'Lit', tr: 'Yatak', es: 'Cama', 'ar-sy': 'Sarīr', zh: 'Chuáng' }
    },
    {
        id: 'chair', categoryId: 'home', image: '/assets/chair.webp', emoji: '🪑',
        translations: { de: 'Sessel', pinz: 'Sessl', en: 'Chair', it: 'Sedia', fr: 'Chaise', tr: 'Sandalye', es: 'Silla', 'ar-sy': 'Kursī', zh: 'Yǐzi' }
    },
    {
        id: 'table', categoryId: 'home', image: '/assets/table.webp', emoji: '🛡️',
        translations: { de: 'Tisch', pinz: 'Tisch', en: 'Table', it: 'Tavolo', fr: 'Table', tr: 'Masa', es: 'Mesa', 'ar-sy': 'Ṭāwila', zh: 'Zhuōzi' }
    },
    {
        id: 'lamp', categoryId: 'home', image: '/assets/lamp.webp', emoji: '💡',
        translations: { de: 'Lampe', pinz: 'Lompm', en: 'Lamp', it: 'Lampada', fr: 'Lampe', tr: 'Lamba', es: 'Lámpara', 'ar-sy': 'Miṣbāḥ', zh: 'Dēng' }
    },

    // --- CLOTHING (KLEIDUNG) ---
    {
        id: 'tshirt', categoryId: 'clothing', image: '/assets/tshirt.webp', emoji: '👕',
        translations: { de: 'T-Shirt', pinz: 'Leibal', en: 'T-Shirt', it: 'Maglietta', fr: 'T-shirt', tr: 'Tişört', es: 'Camiseta', 'ar-sy': 'Qamīṣ', zh: 'T-xù' }
    },
    {
        id: 'pants', categoryId: 'clothing', image: '/assets/pants.webp', emoji: '👖',
        translations: { de: 'Hose', pinz: 'Hosn', en: 'Pants', it: 'Pantaloni', fr: 'Pantalon', tr: 'Pantolon', es: 'Pantalones', 'ar-sy': 'Banṭalūn', zh: 'Kùzi' }
    },
    {
        id: 'shoes', categoryId: 'clothing', image: '/assets/shoes.webp', emoji: '👟',
        translations: { de: 'Schuhe', pinz: 'Schuach', en: 'Shoes', it: 'Scarpe', fr: 'Chaussures', tr: 'Ayakkabı', es: 'Zapatos', 'ar-sy': 'Ḥidhāʾ', zh: 'Xiézi' }
    },
    {
        id: 'hat', categoryId: 'clothing', image: '/assets/hat.webp', emoji: '🧢',
        translations: { de: 'Hut', pinz: 'Huad', en: 'Hat', it: 'Cappello', fr: 'Chapeau', tr: 'Şapka', es: 'Sombrero', 'ar-sy': 'Qubbaʿa', zh: 'Màozi' }
    },
    {
        id: 'jacket', categoryId: 'clothing', image: '/assets/jacket.webp', emoji: '🧥',
        translations: { de: 'Jacke', pinz: 'Jackn', en: 'Jacket', it: 'Giacca', fr: 'Veste', tr: 'Ceket', es: 'Chaqueta', 'ar-sy': 'Muʿṭaf', zh: 'Jiákè' }
    },

    // --- BODY (KÖRPER) ---
    {
        id: 'head', categoryId: 'body', image: '/assets/head.webp', emoji: '😶',
        translations: { de: 'Kopf', pinz: 'Kopf', en: 'Head', it: 'Testa', fr: 'Tête', tr: 'Baş', es: 'Cabeza', 'ar-sy': 'Raʾs', zh: 'Tóu' }
    },
    {
        id: 'hand', categoryId: 'body', image: '/assets/hand.webp', emoji: '🖐️',
        translations: { de: 'Hand', pinz: 'Hond', en: 'Hand', it: 'Mano', fr: 'Main', tr: 'El', es: 'Mano', 'ar-sy': 'Yad', zh: 'Shǒu' }
    },
    {
        id: 'foot', categoryId: 'body', image: '/assets/foot.webp', emoji: '🦶',
        translations: { de: 'Fuß', pinz: 'Fuaß', en: 'Foot', it: 'Piede', fr: 'Pied', tr: 'Ayak', es: 'Pie', 'ar-sy': 'Qadam', zh: 'Jiǎo' }
    },
    {
        id: 'eye', categoryId: 'body', image: '/assets/eye.webp', emoji: '👁️',
        translations: { de: 'Auge', pinz: 'Aug', en: 'Eye', it: 'Occhio', fr: 'Œil', tr: 'Göz', es: 'Ojo', 'ar-sy': 'ʿAyn', zh: 'Yǎnjīng' }
    },
    {
        id: 'mouth', categoryId: 'body', image: '/assets/mouth.webp', emoji: '👄',
        translations: { de: 'Mund', pinz: 'Mund', en: 'Mouth', it: 'Bocca', fr: 'Bouche', tr: 'Ağız', es: 'Boca', 'ar-sy': 'Fam', zh: 'Zuǐ' }
    },
    {
        id: 'nose', categoryId: 'body', image: '/assets/nose.webp', emoji: '👃',
        translations: { de: 'Nase', pinz: 'Nosn', en: 'Nose', it: 'Naso', fr: 'Nez', tr: 'Burun', es: 'Nariz', 'ar-sy': 'Anf', zh: 'Bízi' }
    },

    // --- HISTORY (GESCHICHTE) ---
    {
        id: 'castle', categoryId: 'history', image: '/assets/castle.webp', emoji: '🏰',
        translations: { de: 'Burg', pinz: 'Buag', en: 'Castle', it: 'Castello', fr: 'Château', tr: 'Kale', es: 'Castillo', 'ar-sy': 'Qalʿa', zh: 'Chéngbǎo' }
    },
    {
        id: 'knight', categoryId: 'history', image: '/assets/knight.webp', emoji: '⚔️',
        translations: { de: 'Ritter', pinz: 'Ritta', en: 'Knight', it: 'Cavaliere', fr: 'Chevalier', tr: 'Şövalye', es: 'Caballero', 'ar-sy': 'Fāris', zh: 'Qíshì' }
    },
    {
        id: 'king', categoryId: 'history', image: '/assets/king.webp', emoji: '👑',
        translations: { de: 'König', pinz: 'Kini', en: 'King', it: 'Re', fr: 'Roi', tr: 'Kral', es: 'Rey', 'ar-sy': 'Malik', zh: 'Guówáng' }
    },
    {
        id: 'dragon', categoryId: 'history', image: '/assets/dragon.webp', emoji: '🐉',
        translations: { de: 'Drache', pinz: 'Drach', en: 'Dragon', it: 'Drago', fr: 'Dragon', tr: 'Ejderha', es: 'Dragón', 'ar-sy': 'Tinnīn', zh: 'Lóng' }
    },
    {
        id: 'pyramid', categoryId: 'history', image: '/assets/pyramid.webp', emoji: '🔺',
        translations: { de: 'Pyramide', pinz: 'Pyramide', en: 'Pyramid', it: 'Piramide', fr: 'Pyramide', tr: 'Piramit', es: 'Pirámide', 'ar-sy': 'Haram', zh: 'Jīnzìtǎ' }
    },

    // --- MUSIC (MUSIK) ---
    {
        id: 'guitar', categoryId: 'music', image: '/assets/guitar.webp', emoji: '🎸',
        translations: { de: 'Gitarre', pinz: 'Gitarre', en: 'Guitar', it: 'Chitarra', fr: 'Guitare', tr: 'Gitar', es: 'Guitarra', 'ar-sy': 'Gītār', zh: 'Jítā' }
    },
    {
        id: 'piano', categoryId: 'music', image: '/assets/piano.webp', emoji: '🎹',
        translations: { de: 'Klavier', pinz: 'Klavia', en: 'Piano', it: 'Pianoforte', fr: 'Piano', tr: 'Piyano', es: 'Piano', 'ar-sy': 'Biyānū', zh: 'Gāngqín' }
    },
    {
        id: 'drum', categoryId: 'music', image: '/assets/drum.webp', emoji: '🥁',
        translations: { de: 'Trommel', pinz: 'Trommi', en: 'Drum', it: 'Tamburo', fr: 'Tambour', tr: 'Davul', es: 'Tambor', 'ar-sy': 'Ṭabl', zh: 'Gǔ' }
    },
    {
        id: 'microphone', categoryId: 'music', image: '/assets/microphone.webp', emoji: '🎤',
        translations: { de: 'Singen', pinz: 'Singa', en: 'Singing', it: 'Cantare', fr: 'Chanter', tr: 'Şarkı söylemek', es: 'Cantar', 'ar-sy': 'Ghināʾ', zh: 'Chànggē' }
    },
];
