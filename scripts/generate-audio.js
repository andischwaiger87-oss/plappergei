// scripts/generate-audio.js
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// --- KONFIGURATION ---
const API_KEY = "const API_KEY = "DEIN_ELEVENLABS_API_KEY_HIER_EINFÜGEN";"; // <--- HIER DEINEN KEY REIN!
const OUTPUT_DIR = './public/audio'; 

// Stimmen-Mapping
// FIX: Wir nutzen jetzt Rachel ('21m...') auch für Deutsch, falls Mimi fehlt.
// Falls du Mimi hinzugefügt hast (Option A), kannst du bei 'de' wieder 'zrHiDhphv9ZnVXBqCLjf' eintragen.
const VOICE_MAP = {
    de: '21m00Tcm4TlvDq8ikWAM',   // Rachel (statt Mimi, damit es sofort geht)
    pinz: '21m00Tcm4TlvDq8ikWAM', // Rachel
    default: '21m00Tcm4TlvDq8ikWAM' // Rachel
};

const LANG_TO_ISO = {
    de: 'de', pinz: 'de',
    en: 'en', it: 'it', fr: 'fr', tr: 'tr', es: 'es', ar: 'ar', zh: 'zh'
};

const LANGUAGES = ['de', 'pinz', 'en', 'it', 'fr', 'tr', 'es', 'ar', 'zh'];

// --- DEINE KOMPLETTE VOKABEL-LISTE ---
const VOCAB_ITEMS = [
    // --- FOOD (JAUSE) ---
    { id: 'apple', translations: { de: 'Apfel', pinz: 'Oapfi', en: 'Apple', it: 'Mela', fr: 'Pomme', tr: 'Elma', es: 'Manzana', 'ar': 'Tuffāḥa', zh: 'Píngguǒ' } },
    { id: 'banana', translations: { de: 'Banane', pinz: 'Banane', en: 'Banana', it: 'Banana', fr: 'Banane', tr: 'Muz', es: 'Plátano', 'ar': 'Mawz', zh: 'Xiāngjiāo' } },
    { id: 'bread', translations: { de: 'Brot', pinz: 'Broud', en: 'Bread', it: 'Pane', fr: 'Pain', tr: 'Ekmek', es: 'Pan', 'ar': 'Khubz', zh: 'Miànbāo' } },
    { id: 'water', translations: { de: 'Wasser', pinz: 'Wossa', en: 'Water', it: 'Acqua', fr: 'Eau', tr: 'Su', es: 'Agua', 'ar': 'Māʾ', zh: 'Shuǐ' } },
    { id: 'milk', translations: { de: 'Milch', pinz: 'Müch', en: 'Milk', it: 'Latte', fr: 'Lait', tr: 'Süt', es: 'Leche', 'ar': 'Ḥalīb', zh: 'Niúnǎi' } },
    { id: 'egg', translations: { de: 'Ei', pinz: 'Oa', en: 'Egg', it: 'Uovo', fr: 'Œuf', tr: 'Yumurta', es: 'Huevo', 'ar': 'Bayḍa', zh: 'Jīdàn' } },
    { id: 'cheese', translations: { de: 'Käse', pinz: 'Kas', en: 'Cheese', it: 'Formaggio', fr: 'Fromage', tr: 'Peynir', es: 'Queso', 'ar': 'Jibn', zh: 'Nǎilào' } },
    { id: 'potato', translations: { de: 'Kartoffel', pinz: 'Eadepfi', en: 'Potato', it: 'Patata', fr: 'Pomme de terre', tr: 'Patates', es: 'Patata', 'ar': 'Baṭāṭā', zh: 'Tǔdòu' } },
    { id: 'carrot', translations: { de: 'Karotte', pinz: 'Gelbarübn', en: 'Carrot', it: 'Carota', fr: 'Carotte', tr: 'Havuç', es: 'Zanahoria', 'ar': 'Jazar', zh: 'Húluóbo' } },
    { id: 'corn', translations: { de: 'Mais', pinz: 'Kukuruz', en: 'Corn', it: 'Mais', fr: 'Maïs', tr: 'Mısır', es: 'Maíz', 'ar': 'Dhurra', zh: 'Yùmǐ' } },
    { id: 'strawberry', translations: { de: 'Erdbeere', pinz: 'Eadbea', en: 'Strawberry', it: 'Fragola', fr: 'Fraise', tr: 'Çilek', es: 'Fresa', 'ar': 'Frawla', zh: 'Cǎoméi' } },
    { id: 'icecream', translations: { de: 'Eis', pinz: 'Eis', en: 'Ice Cream', it: 'Gelato', fr: 'Glace', tr: 'Dondurma', es: 'Helado', 'ar': 'Būẓa', zh: 'Bīngqílín' } },
    { id: 'cake', translations: { de: 'Kuchen', pinz: 'Kuachn', en: 'Cake', it: 'Torta', fr: 'Gâteau', tr: 'Kek', es: 'Pastel', 'ar': 'Kaʿk', zh: 'Dàngāo' } },
    { id: 'chocolate', translations: { de: 'Schokolade', pinz: 'Schoklad', en: 'Chocolate', it: 'Cioccolato', fr: 'Chocolat', tr: 'Çikolata', es: 'Chocolate', 'ar': 'Shūkūlātah', zh: 'Qiǎokèlì' } },
    { id: 'pizza', translations: { de: 'Pizza', pinz: 'Pizza', en: 'Pizza', it: 'Pizza', fr: 'Pizza', tr: 'Pizza', es: 'Pizza', 'ar': 'Bītzā', zh: 'Pīsà' } },
    { id: 'hamburger', translations: { de: 'Burger', pinz: 'Burger', en: 'Burger', it: 'Hamburger', fr: 'Burger', tr: 'Hamburger', es: 'Hamburguesa', 'ar': 'Burghar', zh: 'Hànbǎo' } },
    { id: 'fries', translations: { de: 'Pommes', pinz: 'Pommes', en: 'Fries', it: 'Patatine', fr: 'Frites', tr: 'Patates Kızartması', es: 'Papas fritas', 'ar': 'Baṭāṭā maqliyya', zh: 'Shǔtiáo' } },
    { id: 'soup', translations: { de: 'Suppe', pinz: 'Suppn', en: 'Soup', it: 'Zuppa', fr: 'Soupe', tr: 'Çorba', es: 'Sopa', 'ar': 'Ḥasāʾ', zh: 'Tāng' } },
    { id: 'sandwich', translations: { de: 'Sandwich', pinz: 'Jause', en: 'Sandwich', it: 'Panino', fr: 'Sandwich', tr: 'Sandviç', es: 'Sándwich', 'ar': 'Shaṭīra', zh: 'Sānmíngzhì' } },
    { id: 'salad', translations: { de: 'Salat', pinz: 'Salat', en: 'Salad', it: 'Insalata', fr: 'Salade', tr: 'Salata', es: 'Ensalada', 'ar': 'Salaṭa', zh: 'Shālā' } },
    { id: 'grapes', translations: { de: 'Trauben', pinz: 'Weinbeal', en: 'Grapes', it: 'Uva', fr: 'Raisin', tr: 'Üzüm', es: 'Uvas', 'ar': 'ʿInab', zh: 'Pútáo' } },
    { id: 'melon', translations: { de: 'Melone', pinz: 'Melone', en: 'Melon', it: 'Melone', fr: 'Melon', tr: 'Kavun', es: 'Melón', 'ar': 'Baṭṭīkh', zh: 'Xīguā' } },
    { id: 'orange', translations: { de: 'Orange', pinz: 'Orangsch', en: 'Orange', it: 'Arancia', fr: 'Orange', tr: 'Portakal', es: 'Naranja', 'ar': 'Burtuqāl', zh: 'Chéngzi' } },
    { id: 'cucumber', translations: { de: 'Gurke', pinz: 'Gukumer', en: 'Cucumber', it: 'Cetriolo', fr: 'Concombre', tr: 'Salatalık', es: 'Pepino', 'ar': 'Khiyār', zh: 'Huángguā' } },
    { id: 'tomato', translations: { de: 'Tomate', pinz: 'Paradeiser', en: 'Tomato', it: 'Pomodoro', fr: 'Tomate', tr: 'Domates', es: 'Tomate', 'ar': 'Ṭamāṭim', zh: 'Xīhóngshì' } },

    // --- ANIMALS (TIERE) ---
    { id: 'cat', translations: { de: 'Katze', pinz: 'Kotz', en: 'Cat', it: 'Gatto', fr: 'Chat', tr: 'Kedi', es: 'Gato', 'ar': 'Qiṭṭa', zh: 'Māo' } },
    { id: 'dog', translations: { de: 'Hund', pinz: 'Hund', en: 'Dog', it: 'Cane', fr: 'Chien', tr: 'Köpek', es: 'Perro', 'ar': 'Kalb', zh: 'Gǒu' } },
    { id: 'cow', translations: { de: 'Kuh', pinz: 'Kua', en: 'Cow', it: 'Mucca', fr: 'Vache', tr: 'İnek', es: 'Vaca', 'ar': 'Baqara', zh: 'Niú' } },
    { id: 'horse', translations: { de: 'Pferd', pinz: 'Ressl', en: 'Horse', it: 'Cavallo', fr: 'Cheval', tr: 'At', es: 'Caballo', 'ar': 'Ḥiṣān', zh: 'Mǎ' } },
    { id: 'chicken', translations: { de: 'Huhn', pinz: 'Hendl', en: 'Chicken', it: 'Pollo', fr: 'Poulet', tr: 'Tavuk', es: 'Pollo', 'ar': 'Dajāja', zh: 'Jī' } },
    { id: 'pig', translations: { de: 'Schwein', pinz: 'Sau', en: 'Pig', it: 'Maiale', fr: 'Cochon', tr: 'Domuz', es: 'Cerdo', 'ar': 'Khinzīr', zh: 'Zhū' } },
    { id: 'sheep', translations: { de: 'Schaf', pinz: 'Schof', en: 'Sheep', it: 'Pecora', fr: 'Mouton', tr: 'Koyun', es: 'Oveja', 'ar': 'Kharūf', zh: 'Yáng' } },
    { id: 'bird', translations: { de: 'Vogel', pinz: 'Vogl', en: 'Bird', it: 'Uccello', fr: 'Oiseau', tr: 'Kuş', es: 'Pájaro', 'ar': 'ʿUṣfūr', zh: 'Niǎo' } },
    { id: 'lion', translations: { de: 'Löwe', pinz: 'Löwe', en: 'Lion', it: 'Leone', fr: 'Lion', tr: 'Aslan', es: 'León', 'ar': 'Asad', zh: 'Shīzi' } },
    { id: 'elephant', translations: { de: 'Elefant', pinz: 'Elefant', en: 'Elephant', it: 'Elefante', fr: 'Éléphant', tr: 'Fil', es: 'Elefante', 'ar': 'Fīl', zh: 'Dàxiàng' } },
    { id: 'tiger', translations: { de: 'Tiger', pinz: 'Tiger', en: 'Tiger', it: 'Tigre', fr: 'Tigre', tr: 'Kaplan', es: 'Tigre', 'ar': 'Nimr', zh: 'Lǎohǔ' } },
    { id: 'monkey', translations: { de: 'Affe', pinz: 'Off', en: 'Monkey', it: 'Scimmia', fr: 'Singe', tr: 'Maymun', es: 'Mono', 'ar': 'Qird', zh: 'Hóuzi' } },
    { id: 'rabbit', translations: { de: 'Hase', pinz: 'Hos', en: 'Rabbit', it: 'Coniglio', fr: 'Lapin', tr: 'Tavşan', es: 'Conejo', 'ar': 'Arnab', zh: 'Tùzi' } },
    { id: 'mouse_anim', translations: { de: 'Maus', pinz: 'Maus', en: 'Mouse', it: 'Topo', fr: 'Souris', tr: 'Fare', es: 'Ratón', 'ar': 'Fāʾr', zh: 'Lǎoshǔ' } },
    { id: 'frog', translations: { de: 'Frosch', pinz: 'Frosch', en: 'Frog', it: 'Rana', fr: 'Grenouille', tr: 'Kurbağa', es: 'Rana', 'ar': 'Ḍifdaʿ', zh: 'Qīngwā' } },
    { id: 'fish', translations: { de: 'Fisch', pinz: 'Fisch', en: 'Fish', it: 'Pesce', fr: 'Poisson', tr: 'Balık', es: 'Pez', 'ar': 'Samaka', zh: 'Yú' } },
    { id: 'dolphin', translations: { de: 'Delfin', pinz: 'Delfin', en: 'Dolphin', it: 'Delfino', fr: 'Dauphin', tr: 'Yunus', es: 'Delfín', 'ar': 'Dūlfīn', zh: 'Hǎitún' } },
    { id: 'penguin', translations: { de: 'Pinguin', pinz: 'Pinguin', en: 'Penguin', it: 'Pinguino', fr: 'Manchot', tr: 'Penguen', es: 'Pingüino', 'ar': 'Biṭrīq', zh: 'Qì\'é' } },
    { id: 'snake', translations: { de: 'Schlange', pinz: 'Schlang', en: 'Snake', it: 'Serpente', fr: 'Serpent', tr: 'Yılan', es: 'Serpiente', 'ar': 'Thuʿbān', zh: 'Shé' } },
    { id: 'spider', translations: { de: 'Spinne', pinz: 'Spinne', en: 'Spider', it: 'Ragno', fr: 'Araignée', tr: 'Örümcek', es: 'Araña', 'ar': 'ʿAnkabūt', zh: 'Zhīzhū' } },
    { id: 'butterfly', translations: { de: 'Schmetterling', pinz: 'Pifolter', en: 'Butterfly', it: 'Farfalla', fr: 'Papillon', tr: 'Kelebek', es: 'Mariposa', 'ar': 'Farāsha', zh: 'Húdié' } },
    { id: 'bee', translations: { de: 'Biene', pinz: 'Imp', en: 'Bee', it: 'Ape', fr: 'Abeille', tr: 'Arı', es: 'Abeja', 'ar': 'Naḥla', zh: 'Mìfēng' } },
    { id: 'turtle', translations: { de: 'Schildkröte', pinz: 'Schildkrot', en: 'Turtle', it: 'Tartaruga', fr: 'Tortue', tr: 'Kaplumbağa', es: 'Tortuga', 'ar': 'Sulḥafāt', zh: 'Wūguī' } },
    { id: 'giraffe', translations: { de: 'Giraffe', pinz: 'Giraffe', en: 'Giraffe', it: 'Giraffa', fr: 'Girafe', tr: 'Zürafa', es: 'Jirafa', 'ar': 'Zarāfa', zh: 'Chángjǐnglù' } },
    { id: 'zebra', translations: { de: 'Zebra', pinz: 'Zebra', en: 'Zebra', it: 'Zebra', fr: 'Zèbre', tr: 'Zebra', es: 'Cebra', 'ar': 'Ḥimār waḥshī', zh: 'Bānmǎ' } },
    { id: 'bear', translations: { de: 'Bär', pinz: 'Bär', en: 'Bear', it: 'Orso', fr: 'Ours', tr: 'Ayı', es: 'Oso', 'ar': 'Dubb', zh: 'Xióng' } },
    { id: 'fox', translations: { de: 'Fuchs', pinz: 'Fuchs', en: 'Fox', it: 'Volpe', fr: 'Renard', tr: 'Tilki', es: 'Zorro', 'ar': 'Thaʿlab', zh: 'Húlí' } },
    { id: 'owl', translations: { de: 'Eule', pinz: 'Eule', en: 'Owl', it: 'Gufo', fr: 'Hibou', tr: 'Baykuş', es: 'Búho', 'ar': 'Būma', zh: 'Māotóuyīng' } },

    // --- NATURE (NATUR) ---
    { id: 'tree', translations: { de: 'Baum', pinz: 'Bam', en: 'Tree', it: 'Albero', fr: 'Arbre', tr: 'Ağaç', es: 'Árbol', 'ar': 'Shajara', zh: 'Shù' } },
    { id: 'flower', translations: { de: 'Blume', pinz: 'Bleamal', en: 'Flower', it: 'Fiore', fr: 'Fleur', tr: 'Çiçek', es: 'Flor', 'ar': 'Zahra', zh: 'Huā' } },
    { id: 'forest', translations: { de: 'Wald', pinz: 'Woid', en: 'Forest', it: 'Foresta', fr: 'Forêt', tr: 'Orman', es: 'Bosque', 'ar': 'Ghāba', zh: 'Sēnlín' } },
    { id: 'mountain', translations: { de: 'Berg', pinz: 'Beag', en: 'Mountain', it: 'Montagna', fr: 'Montagne', tr: 'Dağ', es: 'Montaña', 'ar': 'Jabal', zh: 'Shān' } },
    { id: 'lake', translations: { de: 'See', pinz: 'See', en: 'Lake', it: 'Lago', fr: 'Lac', tr: 'Göl', es: 'Lago', 'ar': 'Buḥayra', zh: 'Hú' } },
    { id: 'river', translations: { de: 'Fluss', pinz: 'Fluss', en: 'River', it: 'Fiume', fr: 'Rivière', tr: 'Nehir', es: 'Río', 'ar': 'Nahr', zh: 'Hé' } },
    { id: 'beach', translations: { de: 'Strand', pinz: 'Strond', en: 'Beach', it: 'Spiaggia', fr: 'Plage', tr: 'Plaj', es: 'Playa', 'ar': 'Shāṭiʾ', zh: 'Hǎitān' } },
    { id: 'sea', translations: { de: 'Meer', pinz: 'Mea', en: 'Sea', it: 'Mare', fr: 'Mer', tr: 'Deniz', es: 'Mar', 'ar': 'Baḥr', zh: 'Hǎi' } },
    { id: 'sky', translations: { de: 'Himmel', pinz: 'Himmi', en: 'Sky', it: 'Cielo', fr: 'Ciel', tr: 'Gökyüzü', es: 'Cielo', 'ar': 'Samāʾ', zh: 'Tiānkōng' } },
    { id: 'cloud', translations: { de: 'Wolke', pinz: 'Woikn', en: 'Cloud', it: 'Nuvola', fr: 'Nuage', tr: 'Bulut', es: 'Nube', 'ar': 'Ghayma', zh: 'Yún' } },
    { id: 'star', translations: { de: 'Stern', pinz: 'Stean', en: 'Star', it: 'Stella', fr: 'Étoile', tr: 'Yıldız', es: 'Estrella', 'ar': 'Najma', zh: 'Xīngxīng' } },
    { id: 'moon', translations: { de: 'Mond', pinz: 'Mond', en: 'Moon', it: 'Luna', fr: 'Lune', tr: 'Ay', es: 'Luna', 'ar': 'Qamar', zh: 'Yuèliàng' } },
    { id: 'sun', translations: { de: 'Sonne', pinz: 'Sunn', en: 'Sun', it: 'Sole', fr: 'Soleil', tr: 'Güneş', es: 'Sol', 'ar': 'Shams', zh: 'Tàiyáng' } },
    { id: 'rainbow', translations: { de: 'Regenbogen', pinz: 'Regnbogn', en: 'Rainbow', it: 'Arcobaleno', fr: 'Arc-en-ciel', tr: 'Gökkuşağı', es: 'Arcoíris', 'ar': 'Qaws quzaḥ', zh: 'Cáihóng' } },
    { id: 'fire', translations: { de: 'Feuer', pinz: 'Feia', en: 'Fire', it: 'Fuoco', fr: 'Feu', tr: 'Ateş', es: 'Fuego', 'ar': 'Nār', zh: 'Huǒ' } },
    { id: 'stone', translations: { de: 'Stein', pinz: 'Stoa', en: 'Stone', it: 'Pietra', fr: 'Pierre', tr: 'Taş', es: 'Piedra', 'ar': 'Ḥajar', zh: 'Shítou' } },
    { id: 'sand', translations: { de: 'Sand', pinz: 'Sond', en: 'Sand', it: 'Sabbia', fr: 'Sable', tr: 'Kum', es: 'Arena', 'ar': 'Raml', zh: 'Shāzi' } },
    { id: 'grass', translations: { de: 'Gras', pinz: 'Gros', en: 'Grass', it: 'Erba', fr: 'Herbe', tr: 'Çim', es: 'Césped', 'ar': 'ʿUshb', zh: 'Cǎo' } },
    { id: 'leaf', translations: { de: 'Blatt', pinz: 'Blattl', en: 'Leaf', it: 'Foglia', fr: 'Feuille', tr: 'Yaprak', es: 'Hoja', 'ar': 'Waraqa', zh: 'Yèzi' } },

    // --- SEASONS (JAHRESZEITEN) ---
    { id: 'spring', translations: { de: 'Frühling', pinz: 'Frialing', en: 'Spring', it: 'Primavera', fr: 'Printemps', tr: 'İlkbahar', es: 'Primavera', 'ar': 'Rabīʿ', zh: 'Chūntiān' } },
    { id: 'summer', translations: { de: 'Sommer', pinz: 'Summa', en: 'Summer', it: 'Estate', fr: 'Été', tr: 'Yaz', es: 'Verano', 'ar': 'Ṣayf', zh: 'Xiàtiān' } },
    { id: 'autumn', translations: { de: 'Herbst', pinz: 'Heabst', en: 'Autumn', it: 'Autunno', fr: 'Automne', tr: 'Sonbahar', es: 'Otoño', 'ar': 'Kharīf', zh: 'Qiūtiān' } },
    { id: 'winter', translations: { de: 'Winter', pinz: 'Winta', en: 'Winter', it: 'Inverno', fr: 'Hiver', tr: 'Kış', es: 'Invierno', 'ar': 'Shitāʾ', zh: 'Dōngtiān' } },
    { id: 'rain', translations: { de: 'Regen', pinz: 'Reng', en: 'Rain', it: 'Pioggia', fr: 'Pluie', tr: 'Yağmur', es: 'Lluvia', 'ar': 'Maṭar', zh: 'Yǔ' } },
    { id: 'snow', translations: { de: 'Schnee', pinz: 'Schne', en: 'Snow', it: 'Neve', fr: 'Neige', tr: 'Kar', es: 'Nieve', 'ar': 'Thalj', zh: 'Xuě' } },
    { id: 'wind', translations: { de: 'Wind', pinz: 'Wind', en: 'Wind', it: 'Vento', fr: 'Vent', tr: 'Rüzgar', es: 'Viento', 'ar': 'Rīḥ', zh: 'Fēng' } },
    { id: 'storm', translations: { de: 'Gewitter', pinz: 'Wetta', en: 'Thunderstorm', it: 'Temporale', fr: 'Orage', tr: 'Fırtına', es: 'Tormenta', 'ar': 'ʿĀṣifa', zh: 'Bàofēngyǔ' } },
    { id: 'fog', translations: { de: 'Nebel', pinz: 'Nebi', en: 'Fog', it: 'Nebbia', fr: 'Brouillard', tr: 'Sis', es: 'Niebla', 'ar': 'Ḍabāb', zh: 'Wù' } },
    { id: 'ice', translations: { de: 'Eis', pinz: 'Eis', en: 'Ice', it: 'Ghiaccio', fr: 'Glace', tr: 'Buz', es: 'Hielo', 'ar': 'Jalīd', zh: 'Bīng' } },
    { id: 'hot', translations: { de: 'Heiß', pinz: 'Hoaß', en: 'Hot', it: 'Caldo', fr: 'Chaud', tr: 'Sıcak', es: 'Caliente', 'ar': 'Ḥārr', zh: 'Rè' } },
    { id: 'cold', translations: { de: 'Kalt', pinz: 'Koid', en: 'Cold', it: 'Freddo', fr: 'Froid', tr: 'Soğuk', es: 'Frío', 'ar': 'Bārid', zh: 'Lěng' } },

    // --- VEHICLES (FAHRZEUGE) ---
    { id: 'car', translations: { de: 'Auto', pinz: 'Auto', en: 'Car', it: 'Auto', fr: 'Voiture', tr: 'Araba', es: 'Coche', 'ar': 'Sayyāra', zh: 'Qìchē' } },
    { id: 'bicycle', translations: { de: 'Fahrrad', pinz: 'Radl', en: 'Bicycle', it: 'Bicicletta', fr: 'Vélo', tr: 'Bisiklet', es: 'Bicicleta', 'ar': 'Darrāja', zh: 'Zìxíngchē' } },
    { id: 'bus', translations: { de: 'Bus', pinz: 'Bus', en: 'Bus', it: 'Autobus', fr: 'Bus', tr: 'Otobüs', es: 'Autobús', 'ar': 'Bāṣ', zh: 'Gōnggòng qìchē' } },
    { id: 'train', translations: { de: 'Zug', pinz: 'Zug', en: 'Train', it: 'Treno', fr: 'Train', tr: 'Tren', es: 'Tren', 'ar': 'Qiṭār', zh: 'Huǒchē' } },
    { id: 'boat', translations: { de: 'Boot', pinz: 'Boot', en: 'Boat', it: 'Barca', fr: 'Bateau', tr: 'Tekne', es: 'Barco', 'ar': 'Qārib', zh: 'Chuán' } },
    { id: 'helicopter', translations: { de: 'Hubschrauber', pinz: 'Helikopta', en: 'Helicopter', it: 'Elicottero', fr: 'Hélicoptère', tr: 'Helikopter', es: 'Helicóptero', 'ar': 'Mirwaḥiyya', zh: 'Zhíshēngjī' } },
    { id: 'tractor', translations: { de: 'Traktor', pinz: 'Trakta', en: 'Tractor', it: 'Trattore', fr: 'Tracteur', tr: 'Traktör', es: 'Tractor', 'ar': 'Jarrār', zh: 'Tuōlājī' } },
    { id: 'airplane', translations: { de: 'Flugzeug', pinz: 'Fliaga', en: 'Airplane', it: 'Aereo', fr: 'Avion', tr: 'Uçak', es: 'Avión', 'ar': 'Ṭāʾira', zh: 'Fēijī' } },
    { id: 'firetruck', translations: { de: 'Feuerwehr', pinz: 'Feiawea', en: 'Fire Truck', it: 'Pompieri', fr: 'Pompier', tr: 'İtfaiye', es: 'Bomberos', 'ar': 'Sayyārat iṭfāʾ', zh: 'Xiāofángchē' } },
    { id: 'ambulance', translations: { de: 'Krankenwagen', pinz: 'Rettung', en: 'Ambulance', it: 'Ambulanza', fr: 'Ambulance', tr: 'Ambulans', es: 'Ambulancia', 'ar': 'Sayyārat isʿāf', zh: 'Jiùhùchē' } },
    { id: 'police', translations: { de: 'Polizei', pinz: 'Polizei', en: 'Police Car', it: 'Polizia', fr: 'Police', tr: 'Polis', es: 'Policía', 'ar': 'Shurṭa', zh: 'Jǐngchē' } },
    { id: 'motorcycle', translations: { de: 'Motorrad', pinz: 'Moped', en: 'Motorcycle', it: 'Moto', fr: 'Moto', tr: 'Motosiklet', es: 'Motocicleta', 'ar': 'Darrāja nāriyya', zh: 'Mótuōchē' } },
    { id: 'taxi', translations: { de: 'Taxi', pinz: 'Taxi', en: 'Taxi', it: 'Taxi', fr: 'Taxi', tr: 'Taksi', es: 'Taxi', 'ar': 'Tāksī', zh: 'Chūzūchē' } },
    { id: 'truck', translations: { de: 'LKW', pinz: 'Lasster', en: 'Truck', it: 'Camion', fr: 'Camion', tr: 'Kamyon', es: 'Camión', 'ar': 'Shāḥina', zh: 'Kǎchē' } },
    { id: 'rocket', translations: { de: 'Rakete', pinz: 'Rakete', en: 'Rocket', it: 'Razzo', fr: 'Fusée', tr: 'Roket', es: 'Cohete', 'ar': 'Ṣārūkh', zh: 'Huǒjiàn' } },
    { id: 'scooter', translations: { de: 'Roller', pinz: 'Rolla', en: 'Scooter', it: 'Monopattino', fr: 'Trottinette', tr: 'Scooter', es: 'Patinete', 'ar': 'Sikūtar', zh: 'Huábǎnchē' } },
    { id: 'ship', translations: { de: 'Schiff', pinz: 'Schiff', en: 'Ship', it: 'Nave', fr: 'Navire', tr: 'Gemi', es: 'Barco', 'ar': 'Safīna', zh: 'Chuán' } },
    { id: 'submarine', translations: { de: 'U-Boot', pinz: 'U-Boot', en: 'Submarine', it: 'Sottomarino', fr: 'Sous-marin', tr: 'Denizaltı', es: 'Submarino', 'ar': 'Ghawwāṣa', zh: 'Qiánshuǐtǐng' } },

    // --- SPORTS (SPORT) ---
    { id: 'soccer', translations: { de: 'Fußball', pinz: 'Fuassboi', en: 'Soccer', it: 'Calcio', fr: 'Football', tr: 'Futbol', es: 'Fútbol', 'ar': 'Kurat al-qadam', zh: 'Zúqiú' } },
    { id: 'ski', translations: { de: 'Ski', pinz: 'Schi', en: 'Ski', it: 'Sci', fr: 'Ski', tr: 'Kayak', es: 'Esquí', 'ar': 'Tazalluj', zh: 'Huáxuě' } },
    { id: 'swim', translations: { de: 'Schwimmen', pinz: 'Schwimma', en: 'Swimming', it: 'Nuoto', fr: 'Natation', tr: 'Yüzme', es: 'Natación', 'ar': 'Sibāḥa', zh: 'Yóuyǒng' } },
    { id: 'tennis', translations: { de: 'Tennis', pinz: 'Tennis', en: 'Tennis', it: 'Tennis', fr: 'Tennis', tr: 'Tenis', es: 'Tenis', 'ar': 'Tinnis', zh: 'Wǎngqiú' } },
    { id: 'basketball', translations: { de: 'Basketball', pinz: 'Basketboi', en: 'Basketball', it: 'Pallacanestro', fr: 'Basketball', tr: 'Basketbol', es: 'Baloncesto', 'ar': 'Kurat al-salla', zh: 'Lánqiú' } },
    { id: 'volleyball', translations: { de: 'Volleyball', pinz: 'Volleyboi', en: 'Volleyball', it: 'Pallavolo', fr: 'Volleyball', tr: 'Voleybol', es: 'Voleibol', 'ar': 'Kurat al-ṭāʾira', zh: 'Páiqiú' } },
    { id: 'baseball', translations: { de: 'Baseball', pinz: 'Baseball', en: 'Baseball', it: 'Baseball', fr: 'Baseball', tr: 'Beyzbol', es: 'Béisbol', 'ar': 'Bīsbūl', zh: 'Bàngqiú' } },
    { id: 'cycling', translations: { de: 'Radfahren', pinz: 'Radlfoahn', en: 'Cycling', it: 'Ciclismo', fr: 'Cyclisme', tr: 'Bisiklet sürme', es: 'Ciclismo', 'ar': 'Rukūb al-darrāja', zh: 'Qí chē' } },
    { id: 'running', translations: { de: 'Laufen', pinz: 'Laufn', en: 'Running', it: 'Corsa', fr: 'Course', tr: 'Koşu', es: 'Correr', 'ar': 'Rakḍ', zh: 'Pǎobù' } },
    { id: 'gymnastics', translations: { de: 'Turnen', pinz: 'Turnen', en: 'Gymnastics', it: 'Ginnastica', fr: 'Gymnastique', tr: 'Jimnastik', es: 'Gimnasia', 'ar': 'Jumbāz', zh: 'Tǐcāo' } },
    { id: 'climb', translations: { de: 'Klettern', pinz: 'Kraxln', en: 'Climbing', it: 'Arrampicata', fr: 'Escalade', tr: 'Tırmanma', es: 'Escalada', 'ar': 'Tasalluq', zh: 'Pānyán' } },
    { id: 'karate', translations: { de: 'Karate', pinz: 'Karate', en: 'Karate', it: 'Karate', fr: 'Karaté', tr: 'Karate', es: 'Kárate', 'ar': 'Karātīh', zh: 'Kōngshǒudào' } },
    { id: 'boxing', translations: { de: 'Boxen', pinz: 'Boxn', en: 'Boxing', it: 'Pugilato', fr: 'Boxe', tr: 'Boks', es: 'Boxeo', 'ar': 'Mulākama', zh: 'Quánjī' } },
    { id: 'golf', translations: { de: 'Golf', pinz: 'Golf', en: 'Golf', it: 'Golf', fr: 'Golf', tr: 'Golf', es: 'Golf', 'ar': 'Ghūlf', zh: 'Gāo\'ěrfū' } },
    { id: 'hockey', translations: { de: 'Eishockey', pinz: 'Eishockey', en: 'Ice Hockey', it: 'Hockey', fr: 'Hockey', tr: 'Hokey', es: 'Hockey', 'ar': 'Hūkī', zh: 'Bīngqiú' } },

    // --- TOYS (SPIELZEUG) ---
    { id: 'ball', translations: { de: 'Ball', pinz: 'Boi', en: 'Ball', it: 'Palla', fr: 'Balle', tr: 'Top', es: 'Pelota', 'ar': 'Kura', zh: 'Qiú' } },
    { id: 'doll', translations: { de: 'Puppe', pinz: 'Puppn', en: 'Doll', it: 'Bambola', fr: 'Poupée', tr: 'Oyuncak Bebek', es: 'Muñeca', 'ar': 'Dumya', zh: 'Wáwá' } },
    { id: 'teddy', translations: { de: 'Teddybär', pinz: 'Teddy', en: 'Teddy Bear', it: 'Orsacchiotto', fr: 'Ours en peluche', tr: 'Oyuncak Ayı', es: 'Oso de peluche', 'ar': 'Dubb', zh: 'Tàidíxióng' } },
    { id: 'blocks', translations: { de: 'Bausteine', pinz: 'Baustana', en: 'Blocks', it: 'Costruzioni', fr: 'Blocs', tr: 'Bloklar', es: 'Bloques', 'ar': 'Mukaʿʿabāt', zh: 'Jīmù' } },
    { id: 'kite', translations: { de: 'Drachen', pinz: 'Drachn', en: 'Kite', it: 'Aquilone', fr: 'Cerf-volant', tr: 'Uçurtma', es: 'Cometa', 'ar': 'Ṭāʾira waraqiyya', zh: 'Fēngzhēng' } },
    { id: 'car_toy', translations: { de: 'Spielzeugauto', pinz: 'Auto', en: 'Toy Car', it: 'Macchinina', fr: 'Petite voiture', tr: 'Oyuncak Araba', es: 'Coche de juguete', 'ar': 'Sayyārat laʿib', zh: 'Wánjù chē' } },
    { id: 'puzzle', translations: { de: 'Puzzle', pinz: 'Puzzle', en: 'Puzzle', it: 'Puzzle', fr: 'Puzzle', tr: 'Yapboz', es: 'Rompecabezas', 'ar': 'Lughz', zh: 'Pīntú' } },
    { id: 'yo-yo', translations: { de: 'Jojo', pinz: 'Jojo', en: 'Yo-yo', it: 'Yo-yo', fr: 'Yo-yo', tr: 'Yoyo', es: 'Yoyó', 'ar': 'Yūyū', zh: 'Liūliūqiú' } },
    { id: 'robot_toy', translations: { de: 'Roboter', pinz: 'Robota', en: 'Robot', it: 'Robot', fr: 'Robot', tr: 'Robot', es: 'Robot', 'ar': 'Insān āli', zh: 'Jīqìrén' } },
    { id: 'balloon', translations: { de: 'Luftballon', pinz: 'Ballon', en: 'Balloon', it: 'Palloncino', fr: 'Ballon', tr: 'Balon', es: 'Globo', 'ar': 'Bālūn', zh: 'Qìqiú' } },
    { id: 'drum_toy', translations: { de: 'Trommel', pinz: 'Trommi', en: 'Drum', it: 'Tamburo', fr: 'Tambour', tr: 'Davul', es: 'Tambor', 'ar': 'Ṭabl', zh: 'Gǔ' } },
    { id: 'joystick', translations: { de: 'Videospiel', pinz: 'Gämboi', en: 'Video Game', it: 'Videogioco', fr: 'Jeu vidéo', tr: 'Video Oyunu', es: 'Videojuego', 'ar': 'Laʿbat vīdiyū', zh: 'Diànzǐ yóuxì' } },

    // --- TECH (TECHNIK) ---
    { id: 'smartphone', translations: { de: 'Smartphone', pinz: 'Händi', en: 'Smartphone', it: 'Smartphone', fr: 'Smartphone', tr: 'Akıllı Telefon', es: 'Móvil', 'ar': 'Jawwāl', zh: 'Shǒujī' } },
    { id: 'computer', translations: { de: 'Computer', pinz: 'Kompjuta', en: 'Computer', it: 'Computer', fr: 'Ordinateur', tr: 'Bilgisayar', es: 'Ordenador', 'ar': 'Ḥāsūb', zh: 'Diànnǎo' } },
    { id: 'robot', translations: { de: 'Roboter', pinz: 'Robota', en: 'Robot', it: 'Robot', fr: 'Robot', tr: 'Robot', es: 'Robot', 'ar': 'Insān āli', zh: 'Jīqìrén' } },
    { id: 'headphones', translations: { de: 'Kopfhörer', pinz: 'Kopfhörer', en: 'Headphones', it: 'Cuffie', fr: 'Écouteurs', tr: 'Kulaklık', es: 'Auriculares', 'ar': 'Samāʿāt', zh: 'Ěrjī' } },
    { id: 'mouse', translations: { de: 'Maus', pinz: 'Maus', en: 'Mouse', it: 'Mouse', fr: 'Souris', tr: 'Fare', es: 'Ratón', 'ar': 'Fāʾra', zh: 'Shǔbiāo' } },
    { id: 'keyboard', translations: { de: 'Tastatur', pinz: 'Tastatur', en: 'Keyboard', it: 'Tastiera', fr: 'Clavier', tr: 'Klavye', es: 'Teclado', 'ar': 'Lawḥat mafātīḥ', zh: 'Jiànpán' } },
    { id: 'battery', translations: { de: 'Batterie', pinz: 'Batterie', en: 'Battery', it: 'Batteria', fr: 'Batterie', tr: 'Pil', es: 'Batería', 'ar': 'Baṭṭāriyya', zh: 'Diànchí' } },
    { id: 'camera', translations: { de: 'Kamera', pinz: 'Kamera', en: 'Camera', it: 'Fotocamera', fr: 'Caméra', tr: 'Kamera', es: 'Cámara', 'ar': 'Kāmīrā', zh: 'Xiàngjī' } },
    { id: 'printer', translations: { de: 'Drucker', pinz: 'Drucka', en: 'Printer', it: 'Stampante', fr: 'Imprimante', tr: 'Yazıcı', es: 'Impresora', 'ar': 'Ṭābiʿa', zh: 'Dǎyìnjī' } },
    { id: 'tv', translations: { de: 'Fernseher', pinz: 'Feanseha', en: 'TV', it: 'TV', fr: 'Télé', tr: 'Televizyon', es: 'Televisión', 'ar': 'Tilfāz', zh: 'Diànshì' } },
    { id: 'gamepad', translations: { de: 'Controller', pinz: 'Drücka', en: 'Gamepad', it: 'Gamepad', fr: 'Manette', tr: 'Oyun Kolu', es: 'Mando', 'ar': 'Yad taḥakkum', zh: 'Shǒubǐng' } },
    { id: 'watch', translations: { de: 'Uhr', pinz: 'Uah', en: 'Watch', it: 'Orologio', fr: 'Montre', tr: 'Saat', es: 'Reloj', 'ar': 'Sāʿa', zh: 'Shǒubiǎo' } },
    { id: 'tablet', translations: { de: 'Tablet', pinz: 'Tablet', en: 'Tablet', it: 'Tablet', fr: 'Tablette', tr: 'Tablet', es: 'Tableta', 'ar': 'Tāblit', zh: 'Píngbǎn' } },
    { id: 'speaker', translations: { de: 'Lautsprecher', pinz: 'Boxn', en: 'Speaker', it: 'Altoparlante', fr: 'Haut-parleur', tr: 'Hoparlör', es: 'Altavoz', 'ar': 'Mukabbir ṣawt', zh: 'Yāngshēngqì' } },
    { id: 'wifi', translations: { de: 'WLAN', pinz: 'Internet', en: 'WiFi', it: 'WiFi', fr: 'WiFi', tr: 'WiFi', es: 'WiFi', 'ar': 'Wāy fāy', zh: 'Wúxiàn' } },
    { id: 'plug', translations: { de: 'Stecker', pinz: 'Stecka', en: 'Plug', it: 'Spina', fr: 'Prise', tr: 'Fiş', es: 'Enchufe', 'ar': 'Qābis', zh: 'Chātóu' } },
    { id: 'bulb', translations: { de: 'Glühbirne', pinz: 'Biral', en: 'Light Bulb', it: 'Lampadina', fr: 'Ampoule', tr: 'Ampul', es: 'Bombilla', 'ar': 'Miṣbāḥ', zh: 'Dēngpào' } },

    // --- SCHOOL (SCHULE) ---
    { id: 'book', translations: { de: 'Buch', pinz: 'Buach', en: 'Book', it: 'Libro', fr: 'Livre', tr: 'Kitap', es: 'Libro', 'ar': 'Kitāb', zh: 'Shū' } },
    { id: 'pencil', translations: { de: 'Stift', pinz: 'Stift', en: 'Pencil', it: 'Matita', fr: 'Crayon', tr: 'Kalem', es: 'Lápiz', 'ar': 'Qalam', zh: 'Qiānbǐ' } },
    { id: 'bag', translations: { de: 'Schultasche', pinz: 'Toschn', en: 'Bag', it: 'Borsa', fr: 'Sac', tr: 'Çanta', es: 'Bolsa', 'ar': 'Ḥaqība', zh: 'Bāo' } },
    { id: 'scissors', translations: { de: 'Schere', pinz: 'Schea', en: 'Scissors', it: 'Forbici', fr: 'Ciseaux', tr: 'Makas', es: 'Tijeras', 'ar': 'Miqaṣṣ', zh: 'Jiǎndāo' } },
    { id: 'ruler', translations: { de: 'Lineal', pinz: 'Lineal', en: 'Ruler', it: 'Righello', fr: 'Règle', tr: 'Cetvel', es: 'Regla', 'ar': 'Misṭara', zh: 'Chǐzi' } },
    { id: 'eraser', translations: { de: 'Radiergummi', pinz: 'Gummi', en: 'Eraser', it: 'Gomma', fr: 'Gomme', tr: 'Silgi', es: 'Borrador', 'ar': 'Mimḥāt', zh: 'Xiàngpí' } },
    { id: 'paper', translations: { de: 'Papier', pinz: 'Papia', en: 'Paper', it: 'Carta', fr: 'Papier', tr: 'Kağıt', es: 'Papel', 'ar': 'Waraqa', zh: 'Zhǐ' } },
    { id: 'desk', translations: { de: 'Schreibtisch', pinz: 'Tisch', en: 'Desk', it: 'Scrivania', fr: 'Bureau', tr: 'Sıra', es: 'Escritorio', 'ar': 'Maktab', zh: 'Shūzhuō' } },
    { id: 'blackboard', translations: { de: 'Tafel', pinz: 'Tofl', en: 'Blackboard', it: 'Lavagna', fr: 'Tableau noir', tr: 'Tahta', es: 'Pizarra', 'ar': 'Sabbūra', zh: 'Hēibǎn' } },
    { id: 'chalk', translations: { de: 'Kreide', pinz: 'Kreidn', en: 'Chalk', it: 'Gesso', fr: 'Craie', tr: 'Tebeşir', es: 'Tiza', 'ar': 'Ṭabāshīr', zh: 'Fěnbǐ' } },
    { id: 'glue', translations: { de: 'Kleber', pinz: 'Kleba', en: 'Glue', it: 'Colla', fr: 'Colle', tr: 'Yapıştırıcı', es: 'Pegamento', 'ar': 'Ghirāʾ', zh: 'Jiāoshuǐ' } },
    { id: 'calculator', translations: { de: 'Taschenrechner', pinz: 'Rechner', en: 'Calculator', it: 'Calcolatrice', fr: 'Calculatrice', tr: 'Hesap Makinesi', es: 'Calculadora', 'ar': 'Āla ḥāsiba', zh: 'Jìsuànqì' } },
    { id: 'map', translations: { de: 'Landkarte', pinz: 'Koatn', en: 'Map', it: 'Mappa', fr: 'Carte', tr: 'Harita', es: 'Mapa', 'ar': 'Kharīṭa', zh: 'Dìtú' } },
    { id: 'globe', translations: { de: 'Globus', pinz: 'Wödkugel', en: 'Globe', it: 'Globo', fr: 'Globe', tr: 'Küre', es: 'Globo', 'ar': 'Kura arḍiyya', zh: 'Dìqiúyí' } },
    { id: 'notebook', translations: { de: 'Heft', pinz: 'Heftl', en: 'Notebook', it: 'Quaderno', fr: 'Cahier', tr: 'Defter', es: 'Cuaderno', 'ar': 'Daftar', zh: 'Bǐjìběn' } },

    // --- HOME (ZUHAUSE) ---
    { id: 'house', translations: { de: 'Haus', pinz: 'Haisl', en: 'House', it: 'Casa', fr: 'Maison', tr: 'Ev', es: 'Casa', 'ar': 'Bayt', zh: 'Fángzi' } },
    { id: 'bed', translations: { de: 'Bett', pinz: 'Bett', en: 'Bed', it: 'Letto', fr: 'Lit', tr: 'Yatak', es: 'Cama', 'ar': 'Sarīr', zh: 'Chuáng' } },
    { id: 'chair', translations: { de: 'Sessel', pinz: 'Sessl', en: 'Chair', it: 'Sedia', fr: 'Chaise', tr: 'Sandalye', es: 'Silla', 'ar': 'Kursī', zh: 'Yǐzi' } },
    { id: 'table', translations: { de: 'Tisch', pinz: 'Tisch', en: 'Table', it: 'Tavolo', fr: 'Table', tr: 'Masa', es: 'Mesa', 'ar': 'Ṭāwila', zh: 'Zhuōzi' } },
    { id: 'lamp', translations: { de: 'Lampe', pinz: 'Lompm', en: 'Lamp', it: 'Lampada', fr: 'Lampe', tr: 'Lamba', es: 'Lámpara', 'ar': 'Miṣbāḥ', zh: 'Dēng' } },
    { id: 'couch', translations: { de: 'Sofa', pinz: 'Kanapee', en: 'Sofa', it: 'Divano', fr: 'Canapé', tr: 'Kanepe', es: 'Sofá', 'ar': 'Arīka', zh: 'Shāfā' } },
    { id: 'door', translations: { de: 'Tür', pinz: 'Tia', en: 'Door', it: 'Porta', fr: 'Porte', tr: 'Kapı', es: 'Puerta', 'ar': 'Bāb', zh: 'Mén' } },
    { id: 'window', translations: { de: 'Fenster', pinz: 'Fensta', en: 'Window', it: 'Finestra', fr: 'Fenêtre', tr: 'Pencere', es: 'Ventana', 'ar': 'Nāfidha', zh: 'Chuānghù' } },
    { id: 'clock', translations: { de: 'Wecker', pinz: 'Wecka', en: 'Alarm Clock', it: 'Sveglia', fr: 'Réveil', tr: 'Çalar Saat', es: 'Despertador', 'ar': 'Munabbih', zh: 'Nàozhōng' } },
    { id: 'toilet', translations: { de: 'Toilette', pinz: 'Klo', en: 'Toilet', it: 'Bagno', fr: 'Toilettes', tr: 'Tuvalet', es: 'Inodoro', 'ar': 'Mirḥāḍ', zh: 'Cèsuǒ' } },
    { id: 'shower', translations: { de: 'Dusche', pinz: 'Dusch', en: 'Shower', it: 'Doccia', fr: 'Douche', tr: 'Duş', es: 'Ducha', 'ar': 'Dūsh', zh: 'Línyù' } },
    { id: 'bathtub', translations: { de: 'Badewanne', pinz: 'Wanne', en: 'Bathtub', it: 'Vasca', fr: 'Baignoire', tr: 'Küvet', es: 'Bañera', 'ar': 'Ḥawḍ istiḥmām', zh: 'Yùgāng' } },
    { id: 'fridge', translations: { de: 'Kühlschrank', pinz: 'Eiskostn', en: 'Fridge', it: 'Frigorifero', fr: 'Réfrigérateur', tr: 'Buzdolabı', es: 'Refrigerador', 'ar': 'Thallāja', zh: 'Bīngxiāng' } },
    { id: 'oven', translations: { de: 'Herd', pinz: 'Head', en: 'Stove', it: 'Fornello', fr: 'Cuisinière', tr: 'Ocak', es: 'Estufa', 'ar': 'Mawqid', zh: 'Lúzào' } },
    { id: 'pot', translations: { de: 'Topf', pinz: 'Topf', en: 'Pot', it: 'Pentola', fr: 'Casserole', tr: 'Tencere', es: 'Olla', 'ar': 'Qidr', zh: 'Guō' } },

    // --- CLOTHING (KLEIDUNG) ---
    { id: 'tshirt', translations: { de: 'T-Shirt', pinz: 'Leibal', en: 'T-Shirt', it: 'Maglietta', fr: 'T-shirt', tr: 'Tişört', es: 'Camiseta', 'ar': 'Qamīṣ', zh: 'T-xù' } },
    { id: 'pants', translations: { de: 'Hose', pinz: 'Hosn', en: 'Pants', it: 'Pantaloni', fr: 'Pantalon', tr: 'Pantolon', es: 'Pantalones', 'ar': 'Banṭalūn', zh: 'Kùzi' } },
    { id: 'shoes', translations: { de: 'Schuhe', pinz: 'Schuach', en: 'Shoes', it: 'Scarpe', fr: 'Chaussures', tr: 'Ayakkabı', es: 'Zapatos', 'ar': 'Ḥidhāʾ', zh: 'Xiézi' } },
    { id: 'hat', translations: { de: 'Hut', pinz: 'Huad', en: 'Hat', it: 'Cappello', fr: 'Chapeau', tr: 'Şapka', es: 'Sombrero', 'ar': 'Qubbaʿa', zh: 'Màozi' } },
    { id: 'jacket', translations: { de: 'Jacke', pinz: 'Jackn', en: 'Jacket', it: 'Giacca', fr: 'Veste', tr: 'Ceket', es: 'Chaqueta', 'ar': 'Muʿṭaf', zh: 'Jiákè' } },
    { id: 'socks', translations: { de: 'Socken', pinz: 'Sockn', en: 'Socks', it: 'Calzini', fr: 'Chaussettes', tr: 'Çorap', es: 'Calcetines', 'ar': 'Jawrab', zh: 'Wàzi' } },
    { id: 'dress', translations: { de: 'Kleid', pinz: 'Kload', en: 'Dress', it: 'Vestito', fr: 'Robe', tr: 'Elbise', es: 'Vestido', 'ar': 'Fustān', zh: 'Liányīqún' } },
    { id: 'skirt', translations: { de: 'Rock', pinz: 'Kittl', en: 'Skirt', it: 'Gonna', fr: 'Jupe', tr: 'Etek', es: 'Falda', 'ar': 'Tannūra', zh: 'Qúnzi' } },
    { id: 'gloves', translations: { de: 'Handschuhe', pinz: 'Hantsch', en: 'Gloves', it: 'Guanti', fr: 'Gants', tr: 'Eldiven', es: 'Guantes', 'ar': 'Quffāz', zh: 'Shǒutào' } },
    { id: 'scarf', translations: { de: 'Schal', pinz: 'Schal', en: 'Scarf', it: 'Sciarpa', fr: 'Écharpe', tr: 'Atkı', es: 'Bufanda', 'ar': 'Wishāḥ', zh: 'Wéijīn' } },
    { id: 'glasses', translations: { de: 'Brille', pinz: 'Brülln', en: 'Glasses', it: 'Occhiali', fr: 'Lunettes', tr: 'Gözlük', es: 'Gafas', 'ar': 'Naẓẓāra', zh: 'Yǎnjìng' } },
    { id: 'belt', translations: { de: 'Gürtel', pinz: 'Giatl', en: 'Belt', it: 'Cintura', fr: 'Ceinture', tr: 'Kemer', es: 'Cinturón', 'ar': 'Ḥizām', zh: 'Pídài' } },
    { id: 'boots', translations: { de: 'Stiefel', pinz: 'Stiefi', en: 'Boots', it: 'Stivali', fr: 'Bottes', tr: 'Çizme', es: 'Botas', 'ar': 'Jazma', zh: 'Xuēzi' } },
    { id: 'swimsuit', translations: { de: 'Badeanzug', pinz: 'Bodeanzug', en: 'Swimsuit', it: 'Costume', fr: 'Maillot de bain', tr: 'Mayo', es: 'Bañador', 'ar': 'Māyūh', zh: 'Yǒngyī' } },

    // --- BODY (KÖRPER) ---
    { id: 'head', translations: { de: 'Kopf', pinz: 'Kopf', en: 'Head', it: 'Testa', fr: 'Tête', tr: 'Baş', es: 'Cabeza', 'ar': 'Raʾs', zh: 'Tóu' } },
    { id: 'hand', translations: { de: 'Hand', pinz: 'Hond', en: 'Hand', it: 'Mano', fr: 'Main', tr: 'El', es: 'Mano', 'ar': 'Yad', zh: 'Shǒu' } },
    { id: 'foot', translations: { de: 'Fuß', pinz: 'Fuaß', en: 'Foot', it: 'Piede', fr: 'Pied', tr: 'Ayak', es: 'Pie', 'ar': 'Qadam', zh: 'Jiǎo' } },
    { id: 'eye', translations: { de: 'Auge', pinz: 'Aug', en: 'Eye', it: 'Occhio', fr: 'Œil', tr: 'Göz', es: 'Ojo', 'ar': 'ʿAyn', zh: 'Yǎnjīng' } },
    { id: 'mouth', translations: { de: 'Mund', pinz: 'Mund', en: 'Mouth', it: 'Bocca', fr: 'Bouche', tr: 'Ağız', es: 'Boca', 'ar': 'Fam', zh: 'Zuǐ' } },
    { id: 'nose', translations: { de: 'Nase', pinz: 'Nosn', en: 'Nose', it: 'Naso', fr: 'Nez', tr: 'Burun', es: 'Nariz', 'ar': 'Anf', zh: 'Bízi' } },
    { id: 'ear', translations: { de: 'Ohr', pinz: 'Ohr', en: 'Ear', it: 'Orecchio', fr: 'Oreille', tr: 'Kulak', es: 'Oreja', 'ar': 'Udhn', zh: 'Ěrduǒ' } },
    { id: 'hair', translations: { de: 'Haare', pinz: 'Hoar', en: 'Hair', it: 'Capelli', fr: 'Cheveux', tr: 'Saç', es: 'Pelo', 'ar': 'Shaʿr', zh: 'Tóufǎ' } },
    { id: 'finger', translations: { de: 'Finger', pinz: 'Finga', en: 'Finger', it: 'Dito', fr: 'Doigt', tr: 'Parmak', es: 'Dedo', 'ar': 'Iṣbaʿ', zh: 'Shǒuzhǐ' } },
    { id: 'tooth', translations: { de: 'Zahn', pinz: 'Zoh', en: 'Tooth', it: 'Dente', fr: 'Dent', tr: 'Diş', es: 'Diente', 'ar': 'Sinn', zh: 'Yáchǐ' } },
    { id: 'tongue', translations: { de: 'Zunge', pinz: 'Zung', en: 'Tongue', it: 'Lingua', fr: 'Langue', tr: 'Dil', es: 'Lengua', 'ar': 'Lisān', zh: 'Shétou' } },
    { id: 'leg', translations: { de: 'Bein', pinz: 'Haxn', en: 'Leg', it: 'Gamba', fr: 'Jambe', tr: 'Bacak', es: 'Pierna', 'ar': 'Sāq', zh: 'Tuǐ' } },
    { id: 'arm', translations: { de: 'Arm', pinz: 'Oam', en: 'Arm', it: 'Braccio', fr: 'Bras', tr: 'Kol', es: 'Brazo', 'ar': 'Dhirāʿ', zh: 'Gēbó' } },
    { id: 'knee', translations: { de: 'Knie', pinz: 'Knia', en: 'Knee', it: 'Ginocchio', fr: 'Genou', tr: 'Diz', es: 'Rodilla', 'ar': 'Rukba', zh: 'Xīgài' } },
    { id: 'belly', translations: { de: 'Bauch', pinz: 'Wompn', en: 'Belly', it: 'Pancia', fr: 'Ventre', tr: 'Karın', es: 'Barriga', 'ar': 'Baṭn', zh: 'Dùzi' } },
    { id: 'back', translations: { de: 'Rücken', pinz: 'Buckl', en: 'Back', it: 'Schiena', fr: 'Dos', tr: 'Sırt', es: 'Espalda', 'ar': 'Ẓahr', zh: 'Bèi' } },
    { id: 'bone', translations: { de: 'Knochen', pinz: 'Knochn', en: 'Bone', it: 'Osso', fr: 'Os', tr: 'Kemik', es: 'Hueso', 'ar': 'ʿAẓm', zh: 'Gǔtóu' } },
    { id: 'brain', translations: { de: 'Gehirn', pinz: 'Hirn', en: 'Brain', it: 'Cervello', fr: 'Cerveau', tr: 'Beyin', es: 'Cerebro', 'ar': 'Dhimāgh', zh: 'Dànǎo' } },
    { id: 'heart', translations: { de: 'Herz', pinz: 'Heaz', en: 'Heart', it: 'Cuore', fr: 'Cœur', tr: 'Kalp', es: 'Corazón', 'ar': 'Qalb', zh: 'Xīnzàng' } },
    { id: 'lips', translations: { de: 'Lippen', pinz: 'Lippn', en: 'Lips', it: 'Labbra', fr: 'Lèvres', tr: 'Dudaklar', es: 'Labios', 'ar': 'Shifāh', zh: 'Zuǐchún' } },

    // --- HISTORY (GESCHICHTE) ---
    { id: 'castle', translations: { de: 'Burg', pinz: 'Buag', en: 'Castle', it: 'Castello', fr: 'Château', tr: 'Kale', es: 'Castillo', 'ar': 'Qalʿa', zh: 'Chéngbǎo' } },
    { id: 'knight', translations: { de: 'Ritter', pinz: 'Ritta', en: 'Knight', it: 'Cavaliere', fr: 'Chevalier', tr: 'Şövalye', es: 'Caballero', 'ar': 'Fāris', zh: 'Qíshì' } },
    { id: 'king', translations: { de: 'König', pinz: 'Kini', en: 'King', it: 'Re', fr: 'Roi', tr: 'Kral', es: 'Rey', 'ar': 'Malik', zh: 'Guówáng' } },
    { id: 'queen', translations: { de: 'Königin', pinz: 'Kinis', en: 'Queen', it: 'Regina', fr: 'Reine', tr: 'Kraliçe', es: 'Reina', 'ar': 'Malika', zh: 'Nǚwáng' } },
    { id: 'dragon', translations: { de: 'Drache', pinz: 'Drach', en: 'Dragon', it: 'Drago', fr: 'Dragon', tr: 'Ejderha', es: 'Dragón', 'ar': 'Tinnīn', zh: 'Lóng' } },
    { id: 'pyramid', translations: { de: 'Pyramide', pinz: 'Pyramide', en: 'Pyramid', it: 'Piramide', fr: 'Pyramide', tr: 'Piramit', es: 'Pirámide', 'ar': 'Haram', zh: 'Jīnzìtǎ' } },
    { id: 'sword', translations: { de: 'Schwert', pinz: 'Schweat', en: 'Sword', it: 'Spada', fr: 'Épée', tr: 'Kılıç', es: 'Espada', 'ar': 'Sayf', zh: 'Jiàn' } },
    { id: 'shield', translations: { de: 'Schild', pinz: 'Schild', en: 'Shield', it: 'Scudo', fr: 'Bouclier', tr: 'Kalkan', es: 'Escudo', 'ar': 'Dirʿ', zh: 'Dùnpái' } },
    { id: 'crown', translations: { de: 'Krone', pinz: 'Kron', en: 'Crown', it: 'Corona', fr: 'Couronne', tr: 'Taç', es: 'Corona', 'ar': 'Tāj', zh: 'Huángguān' } },
    { id: 'ghost', translations: { de: 'Geist', pinz: 'Goast', en: 'Ghost', it: 'Fantasma', fr: 'Fantôme', tr: 'Hayalet', es: 'Fantasma', 'ar': 'Shabaḥ', zh: 'Guǐ' } },

    // --- MUSIC (MUSIK) ---
    { id: 'guitar', translations: { de: 'Gitarre', pinz: 'Gitarre', en: 'Guitar', it: 'Chitarra', fr: 'Guitare', tr: 'Gitar', es: 'Guitarra', 'ar': 'Gītār', zh: 'Jítā' } },
    { id: 'piano', translations: { de: 'Klavier', pinz: 'Klavia', en: 'Piano', it: 'Pianoforte', fr: 'Piano', tr: 'Piyano', es: 'Piano', 'ar': 'Biyānū', zh: 'Gāngqín' } },
    { id: 'drum', translations: { de: 'Trommel', pinz: 'Trommi', en: 'Drum', it: 'Tamburo', fr: 'Tambour', tr: 'Davul', es: 'Tambor', 'ar': 'Ṭabl', zh: 'Gǔ' } },
    { id: 'microphone', translations: { de: 'Mikrofon', pinz: 'Mikro', en: 'Microphone', it: 'Microfono', fr: 'Micro', tr: 'Mikrofon', es: 'Micrófono', 'ar': 'Mīkrūfūn', zh: 'Màikèfēng' } },
    { id: 'violin', translations: { de: 'Geige', pinz: 'Geig', en: 'Violin', it: 'Violino', fr: 'Violon', tr: 'Keman', es: 'Violín', 'ar': 'Kamān', zh: 'Xiǎotíqín' } },
    { id: 'trumpet', translations: { de: 'Trompete', pinz: 'Trompetn', en: 'Trumpet', it: 'Tromba', fr: 'Trompette', tr: 'Trompet', es: 'Trompeta', 'ar': 'Būq', zh: 'Xiǎohào' } },
    { id: 'saxophone', translations: { de: 'Saxophon', pinz: 'Sax', en: 'Saxophone', it: 'Sassofono', fr: 'Saxophone', tr: 'Saksafon', es: 'Saxofón', 'ar': 'Sāksūfūn', zh: 'Sàkèsī' } },
    { id: 'note', translations: { de: 'Note', pinz: 'Notn', en: 'Note', it: 'Nota', fr: 'Note', tr: 'Nota', es: 'Nota', 'ar': 'Nūṭa', zh: 'Yīnfú' } },
    { id: 'radio', translations: { de: 'Radio', pinz: 'Radio', en: 'Radio', it: 'Radio', fr: 'Radio', tr: 'Radyo', es: 'Radio', 'ar': 'Rādyū', zh: 'Shōuyīnjī' } },
    { id: 'singer', translations: { de: 'Sänger', pinz: 'Sänga', en: 'Singer', it: 'Cantante', fr: 'Chanteur', tr: 'Şarkıcı', es: 'Cantante', 'ar': 'Mughannī', zh: 'Gēshǒu' } },

    // --- DINOSAURS ---
    { id: 'trex', translations: { de: 'T-Rex', pinz: 'T-Rex', en: 'T-Rex', it: 'T-Rex', fr: 'T-Rex', tr: 'T-Rex', es: 'T-Rex', 'ar': 'Tī-Riks', zh: 'Bàwánglóng' } },
    { id: 'triceratops', translations: { de: 'Triceratops', pinz: 'Triceratops', en: 'Triceratops', it: 'Triceratopo', fr: 'Tricératops', tr: 'Triceratops', es: 'Triceratops', 'ar': 'Trīsīrātūbs', zh: 'Sānjiǎolóng' } },
    { id: 'stegosaurus', translations: { de: 'Stegosaurus', pinz: 'Stegosaurus', en: 'Stegosaurus', it: 'Stegosauro', fr: 'Stégosaure', tr: 'Stegozor', es: 'Estegosaurio', 'ar': 'Stīghūsūrus', zh: 'Jiànlóng' } },
    { id: 'velociraptor', translations: { de: 'Velociraptor', pinz: 'Raptor', en: 'Velociraptor', it: 'Velociraptor', fr: 'Vélociraptor', tr: 'Velociraptor', es: 'Velociraptor', 'ar': 'Fīlūsīrābtūr', zh: 'Xùnměnglóng' } },
    { id: 'brachiosaurus', translations: { de: 'Brachiosaurus', pinz: 'Langhois', en: 'Brachiosaurus', it: 'Brachiosauro', fr: 'Brachiosaure', tr: 'Brakiyozor', es: 'Braquiosaurio', 'ar': 'Brākiyūsūrus', zh: 'Wànlóng' } },
    { id: 'pterodactyl', translations: { de: 'Pterodaktylus', pinz: 'Flugsaurier', en: 'Pterodactyl', it: 'Pterodattilo', fr: 'Ptérodactyle', tr: 'Pterodaktil', es: 'Pterodáctilo', 'ar': 'Btīrūdāktīl', zh: 'Yìlóng' } },
    { id: 'diplodocus', translations: { de: 'Diplodocus', pinz: 'Diplodocus', en: 'Diplodocus', it: 'Diplodoco', fr: 'Diplodocus', tr: 'Diplodokus', es: 'Diplodocus', 'ar': 'Dīblūdūkus', zh: 'Liánglóng' } },
    { id: 'spinosaurus', translations: { de: 'Spinosaurus', pinz: 'Spinosaurus', en: 'Spinosaurus', it: 'Spinosauro', fr: 'Spinosaure', tr: 'Spinozor', es: 'Espinosaurio', 'ar': 'Sbīnūsūrus', zh: 'Jílóng' } },
    { id: 'ankylosaurus', translations: { de: 'Ankylosaurus', pinz: 'Panzersaurier', en: 'Ankylosaurus', it: 'Anchilosauro', fr: 'Ankylosaure', tr: 'Ankilozor', es: 'Anquilosaurio', 'ar': 'Ankīlūsūrus', zh: 'Jiǎlóng' } },
    { id: 'parasaurolophus', translations: { de: 'Parasaurolophus', pinz: 'Kammkopf', en: 'Parasaurolophus', it: 'Parasaurolofo', fr: 'Parasaurolophus', tr: 'Parasaurolopus', es: 'Parasaurolofus', 'ar': 'Bārāsūrūlūfus', zh: 'Fùshìlóng' } },
    { id: 'dino_egg', translations: { de: 'Dino-Ei', pinz: 'Dino-Oa', en: 'Dino Egg', it: 'Uovo di Dino', fr: 'Œuf de Dino', tr: 'Dino Yumurtası', es: 'Huevo de Dino', 'ar': 'Bayḍat Dīnū', zh: 'Kǒnglóngdàn' } },
    { id: 'fossil', translations: { de: 'Fossil', pinz: 'Fossil', en: 'Fossil', it: 'Fossile', fr: 'Fossile', tr: 'Fosil', es: 'Fósil', 'ar': 'Ḥafriyya', zh: 'Huàshí' } },
    { id: 'meteor', translations: { de: 'Meteor', pinz: 'Meteor', en: 'Meteor', it: 'Meteora', fr: 'Météore', tr: 'Meteor', es: 'Meteoro', 'ar': 'Nīzak', zh: 'Liúxīng' } },
    { id: 'volcano_dino', translations: { de: 'Vulkan', pinz: 'Vulkan', en: 'Volcano', it: 'Vulcano', fr: 'Volcan', tr: 'Yanardağ', es: 'Volcán', 'ar': 'Burkān', zh: 'Huǒshān' } },
    { id: 'dino_footprint', translations: { de: 'Fußabdruck', pinz: 'Fußspur', en: 'Footprint', it: 'Impronta', fr: 'Empreinte', tr: 'Ayak İzi', es: 'Huella', 'ar': 'Athar Qadam', zh: 'Zújì' } },
    { id: 'paleontologist', translations: { de: 'Forscher', pinz: 'Forscha', en: 'Paleontologist', it: 'Paleontologo', fr: 'Paléontologue', tr: 'Paleontolog', es: 'Paleontólogo', 'ar': 'ʿĀlim Ḥafriyyāt', zh: 'Gǔshēngwùxuéjiā' } },

    // --- HEROES ---
    { id: 'superhero', translations: { de: 'Superheld', pinz: 'Superheld', en: 'Superhero', it: 'Supereroe', fr: 'Super-héros', tr: 'Süper Kahraman', es: 'Superhéroe', 'ar': 'Baṭal Khāriq', zh: 'Chāojí yīngxióng' } },
    { id: 'cape', translations: { de: 'Umhang', pinz: 'Umhang', en: 'Cape', it: 'Mantello', fr: 'Cape', tr: 'Pelerin', es: 'Capa', 'ar': 'ʿAbāʾa', zh: 'Dǒupéng' } },
    { id: 'mask', translations: { de: 'Maske', pinz: 'Maskn', en: 'Mask', it: 'Maschera', fr: 'Masque', tr: 'Maske', es: 'Máscara', 'ar': 'Qināʿ', zh: 'Miànjù' } },
    { id: 'shield', translations: { de: 'Schild', pinz: 'Schüd', en: 'Shield', it: 'Scudo', fr: 'Bouclier', tr: 'Kalkan', es: 'Escudo', 'ar': 'Diriʿ', zh: 'Dùnpái' } },
    { id: 'superpower', translations: { de: 'Superkraft', pinz: 'Supakroft', en: 'Superpower', it: 'Superpotere', fr: 'Super-pouvoir', tr: 'Süper Güç', es: 'Superpoder', 'ar': 'Quwwa Khāriqa', zh: 'Chāonénglì' } },
    { id: 'hero_fly', translations: { de: 'Fliegen', pinz: 'Fliagn', en: 'Flying', it: 'Volare', fr: 'Voler', tr: 'Uçmak', es: 'Volar', 'ar': 'Ṭayarān', zh: 'Fēixíng' } },
    { id: 'rescue_hero', translations: { de: 'Retten', pinz: 'Rettn', en: 'Rescue', it: 'Salvare', fr: 'Sauver', tr: 'Kurtarmak', es: 'Rescatar', 'ar': 'Inqādh', zh: 'Yíngjiù' } },
    { id: 'villain', translations: { de: 'Bösewicht', pinz: 'Bösewicht', en: 'Villain', it: 'Cattivo', fr: 'Méchant', tr: 'Kötü Adam', es: 'Villano', 'ar': 'Sharīr', zh: 'Fǎnpài' } },
    { id: 'secret_base', translations: { de: 'Geheimbasis', pinz: 'Geheimbasis', en: 'Secret Base', it: 'Base Segreta', fr: 'Base Secrète', tr: 'Gizli Üs', es: 'Base Secreta', 'ar': 'Qāʿida Sirriyya', zh: 'Mìmì jīdì' } },
    { id: 'laser', translations: { de: 'Laser', pinz: 'Laser', en: 'Laser', it: 'Laser', fr: 'Laser', tr: 'Lazer', es: 'Láser', 'ar': 'Līzir', zh: 'Jīguāng' } },
    { id: 'xray', translations: { de: 'Röntgenblick', pinz: 'Röntgenblick', en: 'X-Ray Vision', it: 'Vista a Raggi X', fr: 'Vision Rayons X', tr: 'X-Ray Görüşü', es: 'Visión de Rayos X', 'ar': 'Ruʾya Ashiʿʿa', zh: 'Tòushì' } },
    { id: 'sidekick', translations: { de: 'Helfer', pinz: 'Heifa', en: 'Sidekick', it: 'Aiutante', fr: 'Acolyte', tr: 'Yardımcı', es: 'Compañero', 'ar': 'Musāʿid', zh: 'Zhùshǒu' } },
    { id: 'hero_medal', translations: { de: 'Heldenorden', pinz: 'Heldenordn', en: 'Medal', it: 'Medaglia', fr: 'Médaille', tr: 'Madalya', es: 'Medalla', 'ar': 'Wisām', zh: 'Jiǎngzhāng' } },

    // --- CONSTRUCTION ---
    { id: 'excavator', translations: { de: 'Bagger', pinz: 'Bogga', en: 'Excavator', it: 'Escavatore', fr: 'Pelleteuse', tr: 'Ekskavatör', es: 'Excavadora', 'ar': 'Ḥaffāra', zh: 'Wājuéjī' } },
    { id: 'crane', translations: { de: 'Kran', pinz: 'Kran', en: 'Crane', it: 'Gru', fr: 'Grue', tr: 'Vinç', es: 'Grúa', 'ar': 'Rāfiʿa', zh: 'Qǐzhòngjī' } },
    { id: 'cement_mixer', translations: { de: 'Betonmischer', pinz: 'Betonmischa', en: 'Cement Mixer', it: 'Betoniera', fr: 'Bétonnière', tr: 'Beton Mikseri', es: 'Hormigonera', 'ar': 'Khallāṭ Ismant', zh: 'Shuǐní jiǎobànjī' } },
    { id: 'bulldozer', translations: { de: 'Bulldozer', pinz: 'Bulldozer', en: 'Bulldozer', it: 'Bulldozer', fr: 'Bulldozer', tr: 'Buldozer', es: 'Bulldozer', 'ar': 'Jaraffāt', zh: 'Tuītǔjī' } },
    { id: 'dump_truck', translations: { de: 'Kipplaster', pinz: 'Kipplosta', en: 'Dump Truck', it: 'Camion', fr: 'Camion-benne', tr: 'Damperli Kamyon', es: 'Volquete', 'ar': 'Shāḥina Qallāba', zh: 'Fānchē' } },
    { id: 'hammer', translations: { de: 'Hammer', pinz: 'Hommer', en: 'Hammer', it: 'Martello', fr: 'Marteau', tr: 'Çekiç', es: 'Martillo', 'ar': 'Miṭraqa', zh: 'Chuízi' } },
    { id: 'drill', translations: { de: 'Bohrmaschine', pinz: 'Bohrmaschine', en: 'Drill', it: 'Trapano', fr: 'Perceuse', tr: 'Matkap', es: 'Taladro', 'ar': 'Miṯqab', zh: 'Zuànjī' } },
    { id: 'saw', translations: { de: 'Säge', pinz: 'Sog', en: 'Saw', it: 'Sega', fr: 'Scie', tr: 'Testere', es: 'Sierra', 'ar': 'Minshār', zh: 'Jùzi' } },
    { id: 'bricks', translations: { de: 'Ziegel', pinz: 'Ziagl', en: 'Bricks', it: 'Mattoni', fr: 'Briques', tr: 'Tuğla', es: 'Ladrillos', 'ar': 'Ṭūb', zh: 'Zhuān' } },
    { id: 'hard_hat', translations: { de: 'Bauhelm', pinz: 'Bauhelm', en: 'Hard Hat', it: 'Casco', fr: 'Casque', tr: 'Baret', es: 'Casco', 'ar': 'Khūdha', zh: 'Ānquánmào' } },
    { id: 'construction_worker', translations: { de: 'Bauarbeiter', pinz: 'Bauarbeita', en: 'Worker', it: 'Operaio', fr: 'Ouvrier', tr: 'İşçi', es: 'Obrero', 'ar': 'ʿĀmil Bināʾ', zh: 'Jiànzhù gōngrén' } },
    { id: 'blueprint', translations: { de: 'Bauplan', pinz: 'Bauplan', en: 'Blueprint', it: 'Progetto', fr: 'Plan', tr: 'Plan', es: 'Plano', 'ar': 'Mukhaṭṭaṭ', zh: 'Lántú' } },
    { id: 'scaffolding', translations: { de: 'Gerüst', pinz: 'Gerüst', en: 'Scaffolding', it: 'Impalcatura', fr: 'Échafaudage', tr: 'İskele', es: 'Andamio', 'ar': 'Siqāla', zh: 'Jiǎoshǒujià' } },


    // --- RESCUE ---
    { id: 'fire_truck', translations: { de: 'Feuerwehrauto', pinz: 'Feiawehauto', en: 'Fire Truck', it: 'Autopompa', fr: 'Camion de pompiers', tr: 'İtfaiye Aracı', es: 'Camión de bomberos', 'ar': 'Sayyārat Iṭfāʾ', zh: 'Xiāofángchē' } },
    { id: 'ambulance', translations: { de: 'Rettungswagen', pinz: 'Rettungswogn', en: 'Ambulance', it: 'Ambulanza', fr: 'Ambulance', tr: 'Ambulans', es: 'Ambulancia', 'ar': 'Sayyārat Isʿāf', zh: 'Jiùhùchē' } },
    { id: 'police_car', translations: { de: 'Polizeiauto', pinz: 'Polizeiauto', en: 'Police Car', it: 'Auto della polizia', fr: 'Voiture de police', tr: 'Polis Arabası', es: 'Coche de policía', 'ar': 'Sayyārat Shurṭa', zh: 'Jǐngchē' } },
    { id: 'firefighter', translations: { de: 'Feuerwehrmann', pinz: 'Feiaweamann', en: 'Firefighter', it: 'Pompiere', fr: 'Pompier', tr: 'İtfaiyeci', es: 'Bombero', 'ar': 'Rajul Iṭfāʾ', zh: 'Xiāofángyuán' } },
    { id: 'paramedic', translations: { de: 'Sanitäter', pinz: 'Sanitäta', en: 'Paramedic', it: 'Paramedico', fr: 'Ambulancier', tr: 'Sağlık Görevlisi', es: 'Paramédico', 'ar': 'Musʿif', zh: 'Jíjiùyuán' } },
    { id: 'police_officer', translations: { de: 'Polizist', pinz: 'Polizist', en: 'Police Officer', it: 'Poliziotto', fr: 'Policier', tr: 'Polis Memuru', es: 'Policía', 'ar': 'Shurṭī', zh: 'Jǐngchá' } },
    { id: 'helicopter_rescue', translations: { de: 'Rettungshubschrauber', pinz: 'Rettungsheli', en: 'Rescue Helicopter', it: 'Elicottero', fr: 'Hélicoptère', tr: 'Kurtarma Helikopteri', es: 'Helicóptero', 'ar': 'Ṭāʾira Mirwaḥiyya', zh: 'Jiùyuán zhíshēngjī' } },
    { id: 'fire_hose', translations: { de: 'Feuerwehrschlauch', pinz: 'Schlauch', en: 'Fire Hose', it: 'Manichetta', fr: 'Tuyau', tr: 'Yangın Hortumu', es: 'Manguera', 'ar': 'Khurṭūm Māʾ', zh: 'Xiāofáng shuǐguǎn' } },
    { id: 'siren', translations: { de: 'Sirene', pinz: 'Sirene', en: 'Siren', it: 'Sirena', fr: 'Sirène', tr: 'Siren', es: 'Sirena', 'ar': 'Ṣaffāra', zh: 'Jǐngdí' } },
    { id: 'first_aid', translations: { de: 'Erste Hilfe', pinz: 'Erste Hüfe', en: 'First Aid', it: 'Primo Soccorso', fr: 'Premiers Secours', tr: 'İlk Yardım', es: 'Primeros Auxilios', 'ar': 'Isʿāfāt Awwaliyya', zh: 'Jíjiù' } },
    { id: 'fire_extinguisher', translations: { de: 'Feuerlöscher', pinz: 'Feialöscha', en: 'Fire Extinguisher', it: 'Estintore', fr: 'Extincteur', tr: 'Yangın Söndürücü', es: 'Extintor', 'ar': 'Ṭaffāya', zh: 'Mièhuǒqì' } },
    { id: 'rescue_dog', translations: { de: 'Rettungshund', pinz: 'Rettungshund', en: 'Rescue Dog', it: 'Cane da soccorso', fr: 'Chien de sauvetage', tr: 'Kurtarma Köpeği', es: 'Perro de rescate', 'ar': 'Kalb Inqādh', zh: 'Sōujiù quǎn' } },

    // --- CITY & TRAFFIC ---
    { id: 'traffic_light', translations: { de: 'Ampel', pinz: 'Ampel', en: 'Traffic Light', it: 'Semaforo', fr: 'Feu tricolore', tr: 'Trafik Işığı', es: 'Semáforo', 'ar': 'Ishāra Murūr', zh: 'Hónglǜdēng' } },
    { id: 'crosswalk', translations: { de: 'Zebrastreifen', pinz: 'Zebrastreifn', en: 'Crosswalk', it: 'Strisce pedonali', fr: 'Passage piéton', tr: 'Yaya Geçidi', es: 'Paso de cebra', 'ar': 'Mamarr Mushāh', zh: 'Bānmǎxiàn' } },
    { id: 'tram', translations: { de: 'Straßenbahn', pinz: 'Straßnbahn', en: 'Tram', it: 'Tram', fr: 'Tramway', tr: 'Tramvay', es: 'Tranvía', 'ar': 'Trāmwāy', zh: 'Yǒuguǐ diànchē' } },
    { id: 'skyscraper', translations: { de: 'Hochhaus', pinz: 'Hochhaus', en: 'Skyscraper', it: 'Grattacielo', fr: 'Gratte-ciel', tr: 'Gökdelen', es: 'Rascacielos', 'ar': 'Nāṭiḥat Saḥāb', zh: 'Mótiān dàlóu' } },
    { id: 'bridge', translations: { de: 'Brücke', pinz: 'Bruckn', en: 'Bridge', it: 'Ponte', fr: 'Pont', tr: 'Köprü', es: 'Puente', 'ar': 'Jisr', zh: 'Qiáo' } },
    { id: 'train_station', translations: { de: 'Bahnhof', pinz: 'Bahnhof', en: 'Train Station', it: 'Stazione', fr: 'Gare', tr: 'Tren İstasyonu', es: 'Estación', 'ar': 'Maḥaṭṭat Qiṭār', zh: 'Huǒchē zhàn' } },
    { id: 'subway', translations: { de: 'U-Bahn', pinz: 'U-Bahn', en: 'Subway', it: 'Metro', fr: 'Métro', tr: 'Metro', es: 'Metro', 'ar': 'Mītrū', zh: 'Dìtiě' } },
    { id: 'parking', translations: { de: 'Parkplatz', pinz: 'Parkplotz', en: 'Parking', it: 'Parcheggio', fr: 'Parking', tr: 'Otopark', es: 'Estacionamiento', 'ar': 'Mawqif Sayyārāt', zh: 'Tíngchēchǎng' } },
    { id: 'street_sign', translations: { de: 'Verkehrsschild', pinz: 'Schüd', en: 'Street Sign', it: 'Segnale stradale', fr: 'Panneau', tr: 'Trafik Levhası', es: 'Señal de tráfico', 'ar': 'Lāfita', zh: 'Jiāotōng biāozhì' } },
    { id: 'shop', translations: { de: 'Geschäft', pinz: 'Gschäft', en: 'Shop', it: 'Negozio', fr: 'Magasin', tr: 'Dükkan', es: 'Tienda', 'ar': 'Maḥall', zh: 'Shāngdiàn' } },

    // --- FARM ---
    { id: 'barn', translations: { de: 'Scheune', pinz: 'Stadl', en: 'Barn', it: 'Fienile', fr: 'Grange', tr: 'Ahır', es: 'Granero', 'ar': 'Ḥaẓīra', zh: 'Gǔcāng' } },
    { id: 'rooster', translations: { de: 'Hahn', pinz: 'Gockel', en: 'Rooster', it: 'Gallo', fr: 'Coq', tr: 'Horoz', es: 'Gallo', 'ar': 'Dīk', zh: 'Gōngjī' } },
    { id: 'goat', translations: { de: 'Ziege', pinz: 'Goaß', en: 'Goat', it: 'Capra', fr: 'Chèvre', tr: 'Keçi', es: 'Cabra', 'ar': 'Maʿza', zh: 'Shānyáng' } },
    { id: 'horse_farm', translations: { de: 'Pferd', pinz: 'Ross', en: 'Horse', it: 'Cavallo', fr: 'Cheval', tr: 'At', es: 'Caballo', 'ar': 'Ḥiṣān', zh: 'Mǎ' } },
    { id: 'hay', translations: { de: 'Heu', pinz: 'Hei', en: 'Hay', it: 'Fieno', fr: 'Foin', tr: 'Saman', es: 'Heno', 'ar': 'Qaṣṣ', zh: 'Gāncǎo' } },
    { id: 'combine', translations: { de: 'Mähdrescher', pinz: 'Mähdrescha', en: 'Combine', it: 'Mietitrebbia', fr: 'Moissonneuse', tr: 'Biçerdöver', es: 'Cosechadora', 'ar': 'Ḥaṣṣāda', zh: 'Liánhé shōugējī' } },
    { id: 'farmer', translations: { de: 'Bauer', pinz: 'Baua', en: 'Farmer', it: 'Contadino', fr: 'Fermier', tr: 'Çiftçi', es: 'Granjero', 'ar': 'Fallāḥ', zh: 'Nóngmín' } },
    { id: 'fence', translations: { de: 'Zaun', pinz: 'Zaun', en: 'Fence', it: 'Recinto', fr: 'Clôture', tr: 'Çit', es: 'Cerca', 'ar': 'Siyāj', zh: 'Zhàlán' } },
    { id: 'milk_pail', translations: { de: 'Milcheimer', pinz: 'Mücheimer', en: 'Milk Pail', it: 'Secchio', fr: 'Seau', tr: 'Süt Kovası', es: 'Cubo de leche', 'ar': 'Dalw Ḥalīb', zh: 'Nǎitǒng' } },

    // --- FANTASY ---
    { id: 'fairy', translations: { de: 'Fee', pinz: 'Fee', en: 'Fairy', it: 'Fata', fr: 'Fée', tr: 'Peri', es: 'Hada', 'ar': 'Jinniyya', zh: 'Xiānnǚ' } },
    { id: 'unicorn', translations: { de: 'Einhorn', pinz: 'Oahorn', en: 'Unicorn', it: 'Unicorno', fr: 'Licorne', tr: 'Tek Boynuzlu At', es: 'Unicornio', 'ar': 'Waḥīd al-Qarn', zh: 'Dújiǎoshòu' } },
    { id: 'mermaid', translations: { de: 'Meerjungfrau', pinz: 'Wasserfei', en: 'Mermaid', it: 'Sirena', fr: 'Sirène', tr: 'Deniz Kızı', es: 'Sirena', 'ar': 'ʿArūs al-Baḥr', zh: 'Měirényú' } },
    { id: 'wizard', translations: { de: 'Zauberer', pinz: 'Zaubara', en: 'Wizard', it: 'Mago', fr: 'Sorcier', tr: 'Büyücü', es: 'Mago', 'ar': 'Sāḥir', zh: 'Wūshī' } },
    { id: 'witch', translations: { de: 'Hexe', pinz: 'Hex', en: 'Witch', it: 'Strega', fr: 'Sorcière', tr: 'Cadı', es: 'Bruja', 'ar': 'Sāḥira', zh: 'Nǚwū' } },
    { id: 'elf', translations: { de: 'Elfe', pinz: 'Elfe', en: 'Elf', it: 'Elfo', fr: 'Elfe', tr: 'Elf', es: 'Elfo', 'ar': 'Ilfī', zh: 'Jīnglíng' } },
    { id: 'gnome', translations: { de: 'Zwerg', pinz: 'Zwerg', en: 'Gnome', it: 'Gnomo', fr: 'Gnome', tr: 'Cüce', es: 'Gnomo', 'ar': 'Qazam', zh: 'Tǔdì gōng' } },
    { id: 'giant', translations: { de: 'Riese', pinz: 'Ries', en: 'Giant', it: 'Gigante', fr: 'Géant', tr: 'Dev', es: 'Gigante', 'ar': 'ʿImlāq', zh: 'Jùrén' } },
    { id: 'magic_wand', translations: { de: 'Zauberstab', pinz: 'Zaubastob', en: 'Magic Wand', it: 'Bacchetta', fr: 'Baguette', tr: 'Sihirli Değnek', es: 'Varita mágica', 'ar': 'ʿAṣā Siḥriyya', zh: 'Mófǎ bàng' } },
    { id: 'crystal_ball', translations: { de: 'Kristallkugel', pinz: 'Kristallkugel', en: 'Crystal Ball', it: 'Sfera di cristallo', fr: 'Boule de cristal', tr: 'Kristal Küre', es: 'Bola de cristal', 'ar': 'Kurat Billawr', zh: 'Shuǐjīng qiú' } },
    { id: 'phoenix', translations: { de: 'Phönix', pinz: 'Phönix', en: 'Phoenix', it: 'Fenice', fr: 'Phénix', tr: 'Anka Kuşu', es: 'Fénix', 'ar': 'ʿAnqāʾ', zh: 'Fènghuáng' } },
    { id: 'pegasus', translations: { de: 'Pegasus', pinz: 'Pegasus', en: 'Pegasus', it: 'Pegaso', fr: 'Pégase', tr: 'Pegasus', es: 'Pegaso', 'ar': 'Bīghāsūs', zh: 'Fēimǎ' } },
    { id: 'treasure', translations: { de: 'Schatz', pinz: 'Schotz', en: 'Treasure', it: 'Tesoro', fr: 'Trésor', tr: 'Hazine', es: 'Tesoro', 'ar': 'Kanz', zh: 'Bǎozàng' } },

    // --- SPACE (WELTRAUM) ---
    { id: 'astronaut', translations: { de: 'Astronaut', pinz: 'Astronaut', en: 'Astronaut', it: 'Astronauta', fr: 'Astronaute', tr: 'Astronot', es: 'Astronauta', 'ar': 'Rāʾid Faḍāʾ', zh: 'Yǔhángyuán' } },
    { id: 'sun_space', translations: { de: 'Sonne', pinz: 'Sunn', en: 'Sun', it: 'Sole', fr: 'Soleil', tr: 'Güneş', es: 'Sol', 'ar': 'Shams', zh: 'Tàiyáng' } },
    { id: 'planet', translations: { de: 'Planet', pinz: 'Planet', en: 'Planet', it: 'Pianeta', fr: 'Planète', tr: 'Gezegen', es: 'Planeta', 'ar': 'Kawkab', zh: 'Xíngxīng' } },
    { id: 'earth', translations: { de: 'Erde', pinz: 'Eadn', en: 'Earth', it: 'Terra', fr: 'Terre', tr: 'Dünya', es: 'Tierra', 'ar': 'Arḍ', zh: 'Dìqiú' } },
    { id: 'mars', translations: { de: 'Mars', pinz: 'Mars', en: 'Mars', it: 'Marte', fr: 'Mars', tr: 'Mars', es: 'Marte', 'ar': 'Mirrīkh', zh: 'Huǒxīng' } },
    { id: 'ufo', translations: { de: 'UFO', pinz: 'UFO', en: 'UFO', it: 'UFO', fr: 'OVNI', tr: 'UFO', es: 'OVNI', 'ar': 'Ṣaḥn Ṭāʾir', zh: 'Fēidié' } },
    { id: 'alien', translations: { de: 'Außerirdischer', pinz: 'Außerirdischer', en: 'Alien', it: 'Alieno', fr: 'Extraterrestre', tr: 'Uzaylı', es: 'Extraterrestre', 'ar': 'Kāʾin Faḍāʾī', zh: 'Wàixīngrén' } },
    { id: 'satellite', translations: { de: 'Satellit', pinz: 'Satellit', en: 'Satellite', it: 'Satellite', fr: 'Satellite', tr: 'Uydu', es: 'Satélite', 'ar': 'Qamar Ṣināʿī', zh: 'Wèixīng' } },
    { id: 'telescope', translations: { de: 'Teleskop', pinz: 'Fernrohr', en: 'Telescope', it: 'Telescopio', fr: 'Télescope', tr: 'Teleskop', es: 'Telescopio', 'ar': 'Miqrāb', zh: 'Wàngyuǎnjìng' } },
    { id: 'space_station', translations: { de: 'Raumstation', pinz: 'Raumstation', en: 'Space Station', it: 'Stazione spaziale', fr: 'Station spatiale', tr: 'Uzay İstasyonu', es: 'Estación espacial', 'ar': 'Maḥaṭṭat Faḍāʾ', zh: 'Kōngjiān zhàn' } },
    { id: 'comet', translations: { de: 'Komet', pinz: 'Komet', en: 'Comet', it: 'Cometa', fr: 'Comète', tr: 'Kuyruklu Yıldız', es: 'Cometa', 'ar': 'Mudhannab', zh: 'Huìxīng' } },
    { id: 'galaxy', translations: { de: 'Galaxie', pinz: 'Galaxie', en: 'Galaxy', it: 'Galassia', fr: 'Galaxie', tr: 'Galaksi', es: 'Galaxia', 'ar': 'Majarra', zh: 'Xīngxì' } },
    { id: 'black_hole', translations: { de: 'Schwarzes Loch', pinz: 'Schwarzes Loch', en: 'Black Hole', it: 'Buco nero', fr: 'Trou noir', tr: 'Kara Delik', es: 'Agujero negro', 'ar': 'Thuqb Aswad', zh: 'Hēidòng' } },
    { id: 'spacesuit', translations: { de: 'Raumanzug', pinz: 'Raumanzug', en: 'Spacesuit', it: 'Tuta spaziale', fr: 'Combinaison', tr: 'Uzay Giysisi', es: 'Traje espacial', 'ar': 'Badlat Faḍāʾ', zh: 'Yǔháng fú' } },

    // --- ADDITIONAL TOYS (SPIELZEUG) ---
    { id: 'lego', translations: { de: 'LEGO', pinz: 'LEGO', en: 'LEGO', it: 'LEGO', fr: 'LEGO', tr: 'LEGO', es: 'LEGO', 'ar': 'Līghū', zh: 'Lègāo' } },
    { id: 'train_toy', translations: { de: 'Spielzeugeisenbahn', pinz: 'Eisnbahn', en: 'Toy Train', it: 'Trenino', fr: 'Petit train', tr: 'Oyuncak Tren', es: 'Tren de juguete', 'ar': 'Qiṭār Laʿib', zh: 'Wánjù huǒchē' } },
    { id: 'sandbox', translations: { de: 'Sandkasten', pinz: 'Sandkistl', en: 'Sandbox', it: 'Sabbiera', fr: 'Bac à sable', tr: 'Kum Havuzu', es: 'Arenero', 'ar': 'Ḥawḍ Raml', zh: 'Shāchí' } },
    { id: 'swing', translations: { de: 'Schaukel', pinz: 'Schaukl', en: 'Swing', it: 'Altalena', fr: 'Balançoire', tr: 'Salıncak', es: 'Columpio', 'ar': 'Arjūḥa', zh: 'Qiūqiān' } },
    { id: 'slide', translations: { de: 'Rutsche', pinz: 'Rutschn', en: 'Slide', it: 'Scivolo', fr: 'Toboggan', tr: 'Kaydırak', es: 'Tobogán', 'ar': 'Zulāqa', zh: 'Huátī' } },
    { id: 'rocking_horse', translations: { de: 'Schaukelpferd', pinz: 'Schaukelpferd', en: 'Rocking Horse', it: 'Cavallo a dondolo', fr: 'Cheval à bascule', tr: 'Sallanan At', es: 'Caballo mecedor', 'ar': 'Ḥiṣān Hazzāz', zh: 'Yáomǎ' } },
    { id: 'marbles', translations: { de: 'Murmeln', pinz: 'Schusser', en: 'Marbles', it: 'Biglie', fr: 'Billes', tr: 'Bilye', es: 'Canicas', 'ar': 'Kulāt', zh: 'Dànzi' } },
    { id: 'trampoline', translations: { de: 'Trampolin', pinz: 'Trampolin', en: 'Trampoline', it: 'Trampolino', fr: 'Trampoline', tr: 'Trambolin', es: 'Trampolín', 'ar': 'Tarāmbūlīn', zh: 'Bèngchuáng' } },

    // --- ADDITIONAL TECH (TECHNIK) ---
    { id: 'drone', translations: { de: 'Drohne', pinz: 'Drohne', en: 'Drone', it: 'Drone', fr: 'Drone', tr: 'Drone', es: 'Dron', 'ar': 'Ṭāʾira Bidūn Ṭayyār', zh: 'Wúrénjī' } },
    { id: 'vr_headset', translations: { de: 'VR-Brille', pinz: 'VR-Brille', en: 'VR Headset', it: 'Visore VR', fr: 'Casque VR', tr: 'VR Gözlüğü', es: 'Gafas VR', 'ar': 'Naẓẓārat VR', zh: 'VR yǎnjìng' } },
    { id: 'smartwatch', translations: { de: 'Smartwatch', pinz: 'Smartwatch', en: 'Smartwatch', it: 'Smartwatch', fr: 'Montre connectée', tr: 'Akıllı Saat', es: 'Reloj inteligente', 'ar': 'Sāʿa Dhakiyya', zh: 'Zhìnéng shǒubiǎo' } },
    { id: 'usb', translations: { de: 'USB-Stick', pinz: 'USB-Stick', en: 'USB Drive', it: 'Chiavetta USB', fr: 'Clé USB', tr: 'USB Bellek', es: 'USB', 'ar': 'Dhākira USB', zh: 'U pán' } },
    { id: 'microphone_tech', translations: { de: 'Mikrofon', pinz: 'Mikro', en: 'Microphone', it: 'Microfono', fr: 'Microphone', tr: 'Mikrofon', es: 'Micrófono', 'ar': 'Mīkrūfūn', zh: 'Màikèfēng' } },
    { id: 'webcam', translations: { de: 'Webcam', pinz: 'Webcam', en: 'Webcam', it: 'Webcam', fr: 'Webcam', tr: 'Web Kamerası', es: 'Cámara web', 'ar': 'Kāmīra Wīb', zh: 'Wǎngluò shèxiàngtóu' } },
    { id: 'router', translations: { de: 'Router', pinz: 'Router', en: 'Router', it: 'Router', fr: 'Routeur', tr: 'Router', es: 'Router', 'ar': 'Rāwtir', zh: 'Lùyóuqì' } },
    { id: 'projector', translations: { de: 'Projektor', pinz: 'Beamer', en: 'Projector', it: 'Proiettore', fr: 'Projecteur', tr: 'Projektör', es: 'Proyector', 'ar': 'Jihāz ʿArḍ', zh: 'Tóuyǐngyí' } },
];

async function generate() {
    if (!API_KEY || API_KEY.includes("HIER")) {
        console.error("❌ Bitte API Key oben eintragen!");
        return;
    }

    for (const lang of LANGUAGES) {
        const dir = path.join(OUTPUT_DIR, lang);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`🚀 Starte Generierung...`);

    for (const item of VOCAB_ITEMS) {
        for (const lang of LANGUAGES) {
            const text = item.translations[lang];
            if (!text) continue;

            const fileName = `${item.id}.mp3`;
            const filePath = path.join(OUTPUT_DIR, lang, fileName);

            // Überspringen, wenn Datei schon da ist (Spart Credits!)
            if (fs.existsSync(filePath)) {
                // Nur ein kleiner Punkt für "schon erledigt"
                // process.stdout.write('.'); 
                continue;
            }

            const voiceId = VOICE_MAP[lang] || VOICE_MAP.default;
            const isoLang = LANG_TO_ISO[lang] || 'en';

            try {
                // Kurze Pause
                await new Promise(r => setTimeout(r, 250));

                const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'xi-api-key': API_KEY,
                    },
                    body: JSON.stringify({
                        text: text,
                        model_id: 'eleven_turbo_v2_5',
                        language_code: isoLang,
                        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                    }),
                });

                if (!response.ok) {
                    const err = await response.text();
                    console.error(`\n❌ API Error bei ${item.id} (${lang}): ${err}`);
                    continue;
                }

                // FIX für die Warnung: arrayBuffer statt buffer
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                
                fs.writeFileSync(filePath, buffer);
                process.stdout.write('✅'); 

            } catch (e) {
                console.error(`\n❌ Fehler bei ${item.id} (${lang}):`, e.message);
            }
        }
    }
    console.log(`\n🎉 Fertig!`);
}

generate();