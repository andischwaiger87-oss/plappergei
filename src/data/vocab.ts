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
    { id: 'tech', icon: '📱', color: 'bg-sky-100 text-sky-600', label: { de: 'Technik', en: 'Technology' } },
    { id: 'nature', icon: '🌳', color: 'bg-green-100 text-green-600', label: { de: 'Natur', en: 'Nature' } },
    { id: 'animals', icon: '🐱', color: 'bg-orange-100 text-orange-600', label: { de: 'Tiere', en: 'Animals' } },
    { id: 'home', icon: '🏠', color: 'bg-purple-100 text-purple-600', label: { de: 'Zuhause', en: 'Home' } },
    { id: 'school', icon: '🎒', color: 'bg-yellow-100 text-yellow-600', label: { de: 'Schule', en: 'School' } },
    { id: 'clothing', icon: '👕', color: 'bg-indigo-100 text-indigo-600', label: { de: 'Kleidung', en: 'Clothing' } },
];

export const VOCAB_ITEMS: VocabItem[] = [
    // --- FOOD ---
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

    // --- TECH ---
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
    {
        id: 'mouse', categoryId: 'tech', image: '/assets/mouse.webp', emoji: '🖱️',
        translations: { de: 'Maus', pinz: 'Maus', en: 'Mouse', it: 'Mouse', fr: 'Souris', tr: 'Fare', es: 'Ratón', 'ar-sy': 'Fāʾra', zh: 'Shǔbiāo' }
    },
    {
        id: 'battery', categoryId: 'tech', image: '/assets/battery.webp', emoji: '🔋',
        translations: { de: 'Batterie', pinz: 'Batterie', en: 'Battery', it: 'Batteria', fr: 'Batterie', tr: 'Pil', es: 'Batería', 'ar-sy': 'Baṭṭāriyya', zh: 'Diànchí' }
    },

    // --- NATURE ---
    {
        id: 'tree', categoryId: 'nature', image: '/assets/tree.webp', emoji: '🌳',
        translations: { de: 'Baum', pinz: 'Bam', en: 'Tree', it: 'Albero', fr: 'Arbre', tr: 'Ağaç', es: 'Árbol', 'ar-sy': 'Shajara', zh: 'Shù' }
    },
    {
        id: 'sun', categoryId: 'nature', image: '/assets/sun.webp', emoji: '☀️',
        translations: { de: 'Sonne', pinz: 'Sunn', en: 'Sun', it: 'Sole', fr: 'Soleil', tr: 'Güneş', es: 'Sol', 'ar-sy': 'Shams', zh: 'Tàiyáng' }
    },
    {
        id: 'moon', categoryId: 'nature', image: '/assets/moon.webp', emoji: '🌙',
        translations: { de: 'Mond', pinz: 'Mond', en: 'Moon', it: 'Luna', fr: 'Lune', tr: 'Ay', es: 'Luna', 'ar-sy': 'Qamar', zh: 'Yuèliàng' }
    },
    {
        id: 'flower', categoryId: 'nature', image: '/assets/flower.webp', emoji: '🌸',
        translations: { de: 'Blume', pinz: 'Bleamal', en: 'Flower', it: 'Fiore', fr: 'Fleur', tr: 'Çiçek', es: 'Flor', 'ar-sy': 'Zahra', zh: 'Huā' }
    },
    {
        id: 'rain', categoryId: 'nature', image: '/assets/rain.webp', emoji: '🌧️',
        translations: { de: 'Regen', pinz: 'Reng', en: 'Rain', it: 'Pioggia', fr: 'Pluie', tr: 'Yağmur', es: 'Lluvia', 'ar-sy': 'Maṭar', zh: 'Yǔ' }
    },
    {
        id: 'snow', categoryId: 'nature', image: '/assets/snow.webp', emoji: '❄️',
        translations: { de: 'Schnee', pinz: 'Schne', en: 'Snow', it: 'Neve', fr: 'Neige', tr: 'Kar', es: 'Nieve', 'ar-sy': 'Thalj', zh: 'Xuě' }
    },

    // --- ANIMALS ---
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
        id: 'mouse_animal', categoryId: 'animals', image: '/assets/mouse_animal.webp', emoji: '🐭',
        translations: { de: 'Maus', pinz: 'Maus', en: 'Mouse', it: 'Topo', fr: 'Souris', tr: 'Fare', es: 'Ratón', 'ar-sy': 'Fāʾr', zh: 'Lǎoshǔ' }
    },
    {
        id: 'bird', categoryId: 'animals', image: '/assets/bird.webp', emoji: '🐦',
        translations: { de: 'Vogel', pinz: 'Vogl', en: 'Bird', it: 'Uccello', fr: 'Oiseau', tr: 'Kuş', es: 'Pájaro', 'ar-sy': 'ʿUṣfūr', zh: 'Niǎo' }
    },

    // --- HOME ---
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
        id: 'table', categoryId: 'home', image: '/assets/table.webp', emoji: '🛡️', // Emoji fallback tweak
        translations: { de: 'Tisch', pinz: 'Tisch', en: 'Table', it: 'Tavolo', fr: 'Table', tr: 'Masa', es: 'Mesa', 'ar-sy': 'Ṭāwila', zh: 'Zhuōzi' }
    },
    // --- SCHOOL ---
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
];
