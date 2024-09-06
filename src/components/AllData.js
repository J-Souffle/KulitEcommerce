import Img1 from "../img/products/1.jpeg";
import Img2 from "../img/products/2.jpeg";
import Img3 from "../img/products/3.jpeg";
import Img4 from "../img/products/4.jpeg";
// import Img5 from "../img/products/5.jpeg";
import Img6 from "../img/products/6.jpeg";
import Img7 from "../img/products/7.jpeg";
import Img8 from "../img/products/8.jpeg";
import Img9 from "../img/products/9.jpeg";
import Img10 from "../img/products/10.jpeg";
import PasawayUniversity1 from "../img/products/otherProducts/PasawayUniversityCrewneck1.jpeg";
import PasawayUniversity2 from "../img/products/otherProducts/PasawayUniversityCrewneck2.jpeg";
import FirstKulit1 from "../img/products/otherProducts/FirstKulitHoodie1.jpeg"
import FirstKulit2 from "../img/products/otherProducts/FirstKulitHoodie2.jpeg"
import Kamao1 from "../img/products/otherProducts/Kamao1.jpeg";
import Kamao2 from "../img/products/otherProducts/Kamao2.jpeg";
import KoreanShirt1 from "../img/products/otherProducts/KulitKoreanShirt1.jpeg";
import KoreanShirt2 from "../img/products/otherProducts/KulitKoreanShirt2.jpeg";
import KoreanHoodie1 from "../img/products/otherProducts/KulitKoreanHoodie1.jpeg"
import KoreanHoodie2 from "../img/products/otherProducts/KulitKoreanHoodie2.jpeg"
// import Barangay1 from "../img/products/otherProducts/BarangayKulitCrewneck1.jpeg";
// import Barangay2 from "../img/products/otherProducts/BarangayKulitCrewneck2.jpeg";
import KulitTee1 from "../img/products/otherProducts/KulitTee1.jpeg";
import KulitTee2 from "../img/products/otherProducts/KulitTee2.jpeg";
import PasawaySticker1 from "../img/products/otherProducts/PasawaySticker1.jpeg";
import PasawaySticker2 from "../img/products/otherProducts/PasawaySticker2.jpeg";
import KulitCar1 from "../img/products/otherProducts/KulitCar1.jpeg";
import KulitCar2 from "../img/products/otherProducts/KulitCar2.jpeg";
import BayaniPoster1 from "../img/products/otherProducts/BayaniPoster1.jpeg";
import BayaniPoster2 from "../img/products/otherProducts/BayaniPoster2.jpeg";

export const items = [
  {
    id: 1,
    category: "tops",
    img: Img1,
    description: "Pasaway University Crewneck",
    price: 24.99,
    shippingCost: 8.49,
    additionalShippingCost: 2.09,
    otherImgs: [PasawayUniversity1, PasawayUniversity2],
    specs:
      "This CrewNeck sweatshirt is inspired by basketball teams made in the Philippines and is designed with a streetwear style. Made with cotton and polyester for a comfortable, relaxed fit, Perfect for cool weather.",
    texture: "50% Cotton / 50% Polyester",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    colors: [
      { color: "Red", img: PasawayUniversity1 },
      { color: "Blue", img: PasawayUniversity2 },
    ],
  },
  {
    id: 2,
    category: "tops",
    img: Img2,
    description: "Classic Kulit Hoodie",
    price: 39.99,
    shippingCost: 8.49, // Base shipping cost
    additionalShippingCost: 2.09, // Reduced cost for each additional item
    otherImgs: [FirstKulit1, FirstKulit2],
    specs:
      "A classic styled hoodie respresenting the Kulit brand. Made with a thick blend of cotton and polyester, feels plush, soft and warm, a perfect choice for any cold day.",
    texture: "50% Cotton / 50% Polyester",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: 3,
    category: "tops",
    img: Img3,
    description: "Kamao T-Shirt",
    price: 24.99,
    shippingCost: 4.75, // Base shipping cost
    additionalShippingCost: 2.40, // Reduced cost for each additional item
    otherImgs: [Kamao1, Kamao2],
    specs:
      "This Tee is designed with a 2d pixelated style and is inspired by our pambansang kamao to represent the bravery and dedication of Filipinos. Made with 100% ringspun cotton to make it an excellent daily choice.",
    texture: "100% Cotton", 
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: 4,
    category: "tops",
    img: Img4,
    description: "Korean Kulit T-Shirt",
    price: 24.99,
    shippingCost: 4.75, // Base shipping cost
    additionalShippingCost: 2.40, // Reduced cost for each additional item
    otherImgs: [KoreanShirt1, KoreanShirt2],
    specs:
      "A simple styled tee representing the Kulit brand in Korean. Made with 100% wingspun cotton to make it an excellent daily choice.",
    texture: "100% Cotton",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: 5,
    category: "tops",
    img: Img6,
    description: "Kulit T-Shirt",
    price: 24.99,
    shippingCost: 4.75, // Base shipping cost
    additionalShippingCost: 2.40, // Reduced cost for each additional item
    otherImgs: [KulitTee1, KulitTee2],
    specs:
      "A classic styled tee representing the Kulit brand. Made with 100% wingspun cotton to make it an excellent daily choice.",
    texture: "100% Cotton",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
  {
    id: 6,
    category: "accessories",
    img: Img7,
    description: "Pasaway Sticker",
    price: 1.99,
    shippingCost: 4.69, // Base shipping cost
    additionalShippingCost: 0.09, // Reduced cost for each additional item
    otherImgs: [PasawaySticker1, PasawaySticker2],
    specs:
      "A decal representing the Pasaway University. Made with a high quality white vinyl, these decals deliver great looks that are water, scratch, and UV-resistant.",
    texture: "White vinyl with a satin finish",
    size: "10cm x 5cm",
  },
  {
    id: 7,
    category: "accessories",
    img: Img8,
    description: "Kulit Drift Sticker",
    price: 1.99,
    shippingCost: 4.69, // Base shipping cost
    additionalShippingCost: 0.09, // Reduced cost for each additional item
    otherImgs: [KulitCar1, KulitCar2],
    specs:
      "A decal representing a Japanese drift vehicle and is design with a cool blue background. Made with a high quality white vinyl, these decals deliver great looks that are water, scratch, and UV-resistant.",
    texture: "White vinyl with a satin finish",
    size: "10cm x 5cm",
  },
  {
    id: 8,
    category: "accessories",
    img: Img9,
    description: "Bayani Poster",
    price: 7.99,
    shippingCost: 6.79, // Base shipping cost
    additionalShippingCost: 0.99, // Reduced cost for each additional item
    prices: { 
      "9 x 11": 7.99, 
      "12 x 18": 14.99, 
      "24 x 36": 24.99 
    },
    otherImgs: [BayaniPoster1, BayaniPoster2],
    specs: "A poster representing a bayani in the Philippines, José Rizal. Made with a modern style poster and a collage of different colored paint splatters in the background. Made with museum grade paper, available in 3 sizes.",
    texture: "Cotton",
    sizes: ["9 x 11", "12 x 18", "24 x 36"],
  },  
  {
    id: 9,
    category: "tops",
    img: Img10,
    description: "Korean Kulit Hoodie",
    price: 39.99,
    shippingCost: 8.49, // Base shipping cost
    additionalShippingCost: 2.09, // Reduced cost for each additional item
    otherImgs: [KoreanHoodie1, KoreanHoodie2],
    specs:
      "A simple styled hoodie representing the Kulit brand in Korean. Made with a thick blend of cotton and polyester, feels plush, soft and warm, a perfect choice for any cold day.",
    texture: "50% Cotton / 50% Polyester",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
  },
];
