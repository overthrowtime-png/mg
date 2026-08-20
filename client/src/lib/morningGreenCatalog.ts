import type { Locale, Translations } from "../i18n";
import { HERO_IMAGE } from "@shared/morningGreen";

export const MENU_PRODUCTS = [
  {
    code: "S01",
    category: "smoothie",
    status: "coming",
    image: "/S01_GONBUNGNHETENH.png",
    name: "Gọn Bụng Nhẹ Tênh",
    descriptor: "Bó xôi · lê · dưa leo · cần tây",
    ingredients: ["Bó xôi", "lê", "dưa leo", "cần tây", "chanh"],
    detail: "Bó xôi và lê tạo nền vị xanh dịu; dưa leo, cần tây và chanh mang lại hậu vị thanh, gọn.",
    price: "69.000đ",
    tone: "from-[#dce8d8] to-[#f2ead8]",
    scale: 1.01,
  },
  {
    code: "S02",
    category: "smoothie",
    status: "available",
    image: "/S02_DA_S_NG_D_NG_G_N.png",
    name: "Da Sáng Dáng Gọn",
    descriptor: "Bó xôi · dưa leo · dứa · chanh",
    ingredients: ["Bó xôi", "dưa leo", "dứa", "chanh", "xoài"],
    detail: "Bó xôi và dưa leo hòa cùng dứa, xoài và chanh, tạo vị nhiệt đới chua ngọt nhẹ.",
    price: "65.000đ",
    tone: "from-[#e4e5c8] to-[#f0dfc7]",
    scale: 1.012,
  },
  {
    code: "S03",
    category: "smoothie",
    status: "available",
    image: "/S03_THAI_DOC_THANH_LOC.png",
    name: "Thải Độc Thanh Lọc",
    descriptor: "Bó xôi · táo · cần tây · chanh",
    ingredients: ["Bó xôi", "táo", "cần tây", "chanh", "ngò tây", "gừng"],
    detail: "Táo làm dịu vị bó xôi và cần tây; chanh, ngò tây cùng gừng tạo điểm nhấn thơm, tươi.",
    price: "65.000đ",
    tone: "from-[#d8e7d2] to-[#f1e7cf]",
    scale: 0.977,
  },
  {
    code: "S04",
    category: "smoothie",
    status: "available",
    image: "/S04_EO_THON_C_C_CHILL.png",
    name: "Eo Thon Cực Chill",
    descriptor: "Ổi · táo · chanh · hạt chia",
    ingredients: ["Ổi", "táo", "chanh", "hạt chia", "dưa leo", "bó xôi"],
    detail: "Ổi và táo cho vị trái cây rõ nét; dưa leo, bó xôi, chanh và hạt chia tạo kết cấu tươi, nhẹ.",
    price: "65.000đ",
    tone: "from-[#e5e8c8] to-[#f5e2b8]",
    scale: 0.973,
  },
  {
    code: "S05",
    category: "smoothie",
    status: "available",
    image: "/S05_NO_LAU_BEN_BI.png",
    name: "No Lâu Bền Bỉ",
    descriptor: "Bó xôi · sữa đậu nành · chuối · bơ",
    ingredients: ["Bó xôi", "sữa đậu nành", "chuối", "bơ", "bột quế", "mật ong"],
    detail: "Chuối, bơ và sữa đậu nành tạo độ sánh mịn; quế và mật ong hoàn thiện hương vị ấm, dịu.",
    price: "69.000đ",
    tone: "from-[#d9e5cf] to-[#eee2ca]",
    scale: 1.067,
  },
  {
    code: "S06",
    category: "smoothie",
    status: "available",
    image: "/S06_NO_L_NH_THANH_D_NG.png",
    name: "No Lành Thanh Dáng",
    descriptor: "Bó xôi · sữa đậu nành · táo · bơ",
    ingredients: ["Bó xôi", "sữa đậu nành", "táo", "bơ", "hạt lanh"],
    detail: "Táo làm sáng vị bó xôi, trong khi bơ, sữa đậu nành và hạt lanh tạo kết cấu sánh dịu.",
    price: "69.000đ",
    tone: "from-[#d9e3d2] to-[#f1e4d0]",
    scale: 1.016,
  },
  {
    code: "S07",
    category: "smoothie",
    status: "available",
    image: "/S07_BEN_SUC_TON_DANG.png",
    name: "Bền Sức Tôn Dáng",
    descriptor: "Bó xôi · sữa đậu nành · xoài · bơ",
    ingredients: ["Bó xôi", "sữa đậu nành", "xoài", "bơ", "bí ngòi", "hạt lanh"],
    detail: "Xoài và bơ mang đến vị béo ngọt dịu; bó xôi, bí ngòi, sữa đậu nành và hạt lanh cân bằng tổng thể.",
    price: "69.000đ",
    tone: "from-[#dce8d8] to-[#f2ead8]",
    scale: 0.936,
  },
  {
    code: "S08",
    category: "smoothie",
    status: "available",
    image: "/S08_TRA_XANH_THANH_LOC.png",
    name: "Trà Xanh Thanh Lọc",
    descriptor: "Bó xôi · trà xanh · dứa · táo",
    ingredients: ["Bó xôi", "trà xanh", "dứa", "táo", "dưa leo", "cần tây", "bạc hà"],
    detail: "Trà xanh và bạc hà tạo hương thơm mát, cân bằng bởi dứa, táo cùng nhóm rau xanh.",
    price: "65.000đ",
    tone: "from-[#e4e5c8] to-[#f0dfc7]",
    scale: 1.039,
  },
  {
    code: "S09",
    category: "smoothie",
    status: "available",
    image: "/S09_H_NG_H_O_R_NG_R.png",
    name: "Hồng Hào Rạng Rỡ",
    descriptor: "Dâu tây · chuối · củ dền · sữa chua",
    ingredients: ["Dâu tây", "chuối", "củ dền", "sữa chua", "sữa đậu nành"],
    detail: "Dâu tây và củ dền tạo sắc vị nổi bật; chuối, sữa chua và sữa đậu nành làm tổng thể mềm, mịn.",
    price: "69.000đ",
    tone: "from-[#d8e7d2] to-[#f1e7cf]",
    scale: 1.037,
  },
  {
    code: "S10",
    category: "smoothie",
    status: "available",
    image: "/S10_TO_S_NG_XU_T_TH_N.png",
    name: "Tỏa Sáng Xuất Thần",
    descriptor: "Cà rốt · khoai lang · xoài · cam",
    ingredients: ["Cà rốt", "khoai lang", "xoài", "cam", "hạt lanh", "gừng"],
    detail: "Cà rốt, khoai lang và xoài cho vị ngọt dịu; cam và gừng tạo hậu vị tươi, ấm nhẹ.",
    price: "65.000đ",
    tone: "from-[#e5e8c8] to-[#f5e2b8]",
    scale: 1.05,
  },
  {
    code: "S11",
    category: "smoothie",
    status: "available",
    image: "/S11_DA_M_T_M_N_M_NG.png",
    name: "Da Mướt Mịn Màng",
    descriptor: "Nước dừa · xoài · dứa · dưa leo",
    ingredients: ["Nước dừa", "xoài", "dứa", "dưa leo", "chanh", "bạc hà", "hạt chia"],
    detail: "Nước dừa, dưa leo và bạc hà tạo cảm giác thanh mát; xoài, dứa, chanh và hạt chia làm vị thêm đầy đặn.",
    price: "69.000đ",
    tone: "from-[#d9e5cf] to-[#eee2ca]",
    scale: 0.993,
  },
  {
    code: "S12",
    category: "smoothie",
    status: "coming",
    image: "/S12_DUONG_DANG_EM_BUNG_1.png",
    name: "Dưỡng Dáng Êm Bụng",
    descriptor: "Sữa yến mạch · sữa chua · xoài · chuối",
    ingredients: ["Sữa yến mạch", "sữa chua", "xoài", "chuối", "bí ngòi", "hạt chia"],
    detail: "Sữa yến mạch và sữa chua tạo nền vị dịu; xoài, chuối, bí ngòi và hạt chia mang lại kết cấu sánh mịn.",
    price: "75.000đ",
    tone: "from-[#d9e3d2] to-[#f1e4d0]",
    scale: 1.011,
  },
  {
    code: "J01",
    category: "juice",
    status: "available",
    image: "/J01_D_NG_THON_C_C_PH_M.png",
    name: "Dáng Thon Cực Phẩm",
    descriptor: "Thơm · ổi · bó xôi",
    ingredients: ["Thơm", "ổi", "bó xôi"],
    detail: "Thơm và ổi mang vị chua ngọt nhiệt đới, hòa cùng bó xôi cho hậu vị xanh nhẹ.",
    price: "85.000đ",
    tone: "from-[#dce8d8] to-[#f2ead8]",
    scale: 1.063,
  },
  {
    code: "J02",
    category: "juice",
    status: "coming",
    image: "/J01_TAO_KHOE_DEP_DA_1.png",
    name: "Táo Khoẻ Đẹp Da",
    descriptor: "Táo · cam · cà rốt",
    ingredients: ["Táo", "cam", "cà rốt"],
    detail: "Táo và cam tạo vị chua ngọt tươi sáng, cân bằng cùng vị ngọt dịu của cà rốt.",
    price: "89.000đ",
    tone: "from-[#e4e5c8] to-[#f0dfc7]",
    scale: 1.072,
  },
  {
    code: "J03",
    category: "juice",
    status: "available",
    image: "/J03_TI_N_N_T_T_1.png",
    name: "Tiên Nữ Tỷ Tỷ",
    descriptor: "Cà rốt · cam · nghệ · nước dừa",
    ingredients: ["Cà rốt", "cam", "nghệ", "nước dừa"],
    detail: "Cam và nước dừa làm sáng vị cà rốt; nghệ tạo nốt hương ấm và màu vàng nổi bật.",
    price: "79.000đ",
    tone: "from-[#d8e7d2] to-[#f1e7cf]",
    scale: 1.03,
  },
  {
    code: "J04",
    category: "juice",
    status: "coming",
    image: "/J04_T_I_TR_R_NG_NG_I.png",
    name: "Tươi Trẻ Rạng Ngời",
    descriptor: "Cà rốt · cà chua · củ dền · táo",
    ingredients: ["Cà rốt", "cà chua", "củ dền", "táo", "cần tây", "cam"],
    detail: "Củ dền, cà chua và cà rốt tạo sắc đỏ đặc trưng; táo, cam và cần tây cân bằng vị chua ngọt.",
    price: "85.000đ",
    tone: "from-[#e5e8c8] to-[#f5e2b8]",
    scale: 1.015,
  },
  {
    code: "J05",
    category: "juice",
    status: "coming",
    image: HERO_IMAGE,
    name: "Sắc Vóc Tuyệt Mỹ",
    descriptor: "Bó xôi · dưa leo · ổi · cần tây",
    ingredients: ["Bó xôi", "dưa leo", "ổi", "cần tây"],
    detail: "Ổi làm dịu nhóm rau xanh gồm bó xôi, dưa leo và cần tây, cho vị thanh, tươi và dễ uống.",
    price: "79.000đ",
    tone: "from-[#d9e5cf] to-[#eee2ca]",
    scale: 1,
  },
  {
    code: "J06",
    category: "juice",
    status: "available",
    image: "/J06_C_N_T_Y_THANH_M_T.png",
    name: "Cần Tây Thanh Mát",
    descriptor: "Cần tây · táo · dưa leo",
    ingredients: ["Cần tây", "táo", "dưa leo"],
    detail: "Cần tây và dưa leo mang vị xanh thanh mát, được cân bằng bằng vị ngọt dịu của táo.",
    price: "85.000đ",
    tone: "from-[#d9e3d2] to-[#f1e4d0]",
    scale: 0.991,
  },
  {
    code: "J07",
    category: "juice",
    status: "available",
    image: "/C_N_T_Y_CH_N_I.png",
    name: "Cần Tây Chân Ái",
    descriptor: "Cần tây",
    ingredients: ["Cần tây"],
    detail: "Một lựa chọn nguyên bản với duy nhất cần tây, giữ trọn vị xanh rõ nét và hậu vị thanh.",
    price: "89.000đ",
    tone: "from-[#dce8d8] to-[#f2ead8]",
    scale: 1.03,
  },] as const;

export const MORNING_PACKAGES = [
  { code: "MP01", collection: "Morning Packages", name: "Gói 1 Ngày", format: "1 ngày × 5 chai", price: "349.000đ", currency: "VND" },
  { code: "MP02", collection: "Morning Packages", name: "Gói 1 Ngày", format: "1 ngày × 6 chai", price: "419.000đ", currency: "VND" },
  { code: "MP03", collection: "Morning Packages", name: "Gói 3 Ngày", format: "5 chai/ngày · 15 chai", price: "1.029.000đ", currency: "VND" },
  { code: "MP04", collection: "Morning Packages", name: "Gói 5 Ngày", format: "5 chai/ngày · 25 chai", price: "1.699.000đ", currency: "VND" },
  { code: "MP05", collection: "Morning Packages", name: "Gói 7 Ngày", format: "5 chai/ngày · 35 chai", price: "2.379.000đ", currency: "VND" },
  { code: "MP06", collection: "Morning Packages", name: "Gói 14 Ngày", format: "5 chai/ngày · 70 chai", price: "4.749.000đ", currency: "VND" },
  { code: "MP07", collection: "Morning Packages", name: "Gói 5 Ngày", format: "2 chai/ngày · 10 chai", price: "739.000đ", currency: "VND" },
  { code: "MP08", collection: "Morning Packages", name: "Gói 7 Ngày", format: "2 chai/ngày · 14 chai", price: "1.029.000đ", currency: "VND" },
  { code: "MP09", collection: "Morning Packages", name: "Gói 5 Ngày", format: "3 chai/ngày · 15 chai", price: "1.049.000đ", currency: "VND" },
  { code: "MP10", collection: "Morning Packages", name: "Gói 7 Ngày", format: "3 chai/ngày · 21 chai", price: "1.459.000đ", currency: "VND" },
] as const;

export const FILTER_INGREDIENTS = ["bó xôi", "dưa leo", "ổi", "cần tây", "táo", "dứa", "cà rốt", "củ dền"] as const;

export const CATALOG_VOLUME = "330 ml";
export const CATALOG_STORAGE = "0–4°C";

export function localizedCategory(category: "smoothie" | "juice", locale: Locale) {
  if (locale === "en") return category === "smoothie" ? "Smoothie" : "Juice";
  if (locale === "zh") return category === "smoothie" ? "蔬果昔" : "果蔬汁";
  return category === "smoothie" ? "Sinh tố" : "Nước ép";
}

export function getProductBySlug(slug: string) {
  return MENU_PRODUCTS.find((product) => product.code.toLowerCase() === slug.toLowerCase());
}

export function normalizeIngredientLabel(value: string) {
  const normalized = value.trim().toLocaleLowerCase("vi-VN");
  return normalized ? normalized.charAt(0).toLocaleUpperCase("vi-VN") + normalized.slice(1) : normalized;
}

const ingredientTranslations: Record<string, { en: string; zh: string }> = {
  "bạc hà": { en: "Mint", zh: "薄荷" },
  "bí ngòi": { en: "Zucchini", zh: "西葫芦" },
  "bơ": { en: "Avocado", zh: "牛油果" },
  "bó xôi": { en: "Spinach", zh: "菠菜" },
  "bột quế": { en: "Cinnamon", zh: "肉桂粉" },
  "cà chua": { en: "Tomato", zh: "番茄" },
  "cà rốt": { en: "Carrot", zh: "胡萝卜" },
  "cam": { en: "Orange", zh: "橙子" },
  "cần tây": { en: "Celery", zh: "芹菜" },
  "chanh": { en: "Lime", zh: "青柠" },
  "chuối": { en: "Banana", zh: "香蕉" },
  "củ dền": { en: "Beetroot", zh: "甜菜根" },
  "dâu tây": { en: "Strawberry", zh: "草莓" },
  "dứa": { en: "Pineapple", zh: "菠萝" },
  "dưa leo": { en: "Cucumber", zh: "黄瓜" },
  "gừng": { en: "Ginger", zh: "姜" },
  "hạt chia": { en: "Chia seeds", zh: "奇亚籽" },
  "hạt lanh": { en: "Flaxseed", zh: "亚麻籽" },
  "khoai lang": { en: "Sweet potato", zh: "红薯" },
  "lê": { en: "Pear", zh: "梨" },
  "mật ong": { en: "Honey", zh: "蜂蜜" },
  "nghệ": { en: "Turmeric", zh: "姜黄" },
  "ngò tây": { en: "Parsley", zh: "欧芹" },
  "nước dừa": { en: "Coconut water", zh: "椰子水" },
  "ổi": { en: "Guava", zh: "番石榴" },
  "sữa chua": { en: "Yogurt", zh: "酸奶" },
  "sữa đậu nành": { en: "Soy milk", zh: "豆浆" },
  "sữa yến mạch": { en: "Oat milk", zh: "燕麦奶" },
  "táo": { en: "Apple", zh: "苹果" },
  "thơm": { en: "Pineapple", zh: "菠萝" },
  "trà xanh": { en: "Green tea", zh: "绿茶" },
  "xoài": { en: "Mango", zh: "芒果" },
};

export function localizedIngredient(value: string, locale: Locale) {
  const key = value.trim().toLocaleLowerCase("vi-VN");
  if (locale === "vi") return normalizeIngredientLabel(value);
  return ingredientTranslations[key]?.[locale] ?? normalizeIngredientLabel(value);
}

export function localizedDescriptor(ingredients: readonly string[], locale: Locale) {
  return ingredients.slice(0, 4).map((ingredient) => localizedIngredient(ingredient, locale)).join(" · ");
}

const TASTE_DESCRIPTIONS_BY_NAME: Partial<Record<string, string>> = {
  "Gọn Bụng Nhẹ Tênh": "Bó xôi và dưa leo tạo nền xanh mát; lê và chanh mang đến vị thanh, nhẹ và dễ bắt đầu.",
  "Da Sáng Dáng Gọn": "Vị xanh dịu từ bó xôi và dưa leo, điểm bằng dứa, chanh và xoài cho cảm giác tươi, thơm và cân bằng.",
  "Thải Độc Thanh Lọc": "Bó xôi, táo và cần tây tạo nên vị xanh rõ; chanh, gừng và ngò tây giúp hậu vị gọn, thơm và tươi.",
  "Eo Thon Cực Chill": "Ổi và táo tạo vị quả nhẹ; dưa leo, chanh và hạt chia đem lại kết cấu thanh, mát và dễ uống lạnh.",
  "No Lâu Bền Bỉ": "Chuối và bơ tạo độ mượt, sữa đậu nành không đường làm vị tròn hơn, bột quế thêm một điểm thơm ấm.",
  "Bền Sức Tôn Dáng": "Xoài và bơ tạo vị mượt, bó xôi và bí ngòi cân bằng độ ngọt tự nhiên, hậu vị dịu và đầy đặn.",
  "Trà Xanh Thanh Lọc": "Trà xanh, dứa và táo tạo vị tươi có chút chát nhẹ; dưa leo, cần tây và mint giúp tổng thể thanh hơn.",
  "Hồng Hào Rạng Rỡ": "Dâu tây và củ dền tạo sắc vị nổi bật; chuối, sữa chua và sữa đậu nành giúp kết cấu mượt, chua ngọt tự nhiên.",
  "Tỏa Sáng Xuất Thần": "Cà rốt, xoài và cam tạo vị quả sáng; khoai lang và hạt lanh làm hậu vị tròn, gừng thêm điểm ấm nhẹ.",
  "Da Mướt Mịn Màng": "Nước dừa, xoài và dứa tạo vị tươi mềm; dưa leo, chanh, mint và hạt chia giữ tổng thể nhẹ và mát.",
  "Táo Khoẻ Đẹp Da": "Táo và cam tạo vị chua ngọt tươi sáng, cà rốt làm hậu vị tròn và dịu hơn.",
  "Tiên Nữ Tỷ Tỷ": "Cà rốt và cam mang vị sáng, nước dừa làm mềm tổng thể, nghệ tạo một điểm thơm ấm nhẹ.",
  "Tươi Trẻ Rạng Ngời": "Cà rốt, cà chua và củ dền tạo vị rau củ đậm đà; táo và cam thêm độ tươi, cần tây tạo hậu xanh rõ.",
  "Cần Tây Thanh Mát": "Cần tây và dưa leo mang đến vị mát, táo tạo độ tròn và cân bằng cho hậu vị xanh.",
  "Cần Tây Chân Ái": "Vị cần tây nguyên bản, rõ và mát; dành cho người yêu hương vị xanh tối giản.",
};

export function tasteDescriptionForProduct(product: (typeof MENU_PRODUCTS)[number]) {
  return TASTE_DESCRIPTIONS_BY_NAME[product.name] ?? product.detail;
}

export function localizedProductDetail(product: (typeof MENU_PRODUCTS)[number], locale: Locale) {
  if (locale === "vi") return product.detail;
  const ingredientList = product.ingredients.map((ingredient) => localizedIngredient(ingredient, locale));
  if (locale === "zh") return `由${ingredientList.join("、")}均衡调制，口感清新顺滑。`;
  const lastIngredient = ingredientList.at(-1);
  const readableList = ingredientList.length > 1 ? `${ingredientList.slice(0, -1).join(", ")} and ${lastIngredient}` : lastIngredient;
  return `A fresh, balanced blend of ${readableList}.`;
}


const PRODUCT_PRICES_BY_NAME: Record<string, string> = {
  "Gọn Bụng Nhẹ Tênh": "69.000đ",
  "Da Sáng Dáng Gọn": "65.000đ",
  "Thải Độc Thanh Lọc": "65.000đ",
  "Eo Thon Cực Chill": "65.000đ",
  "No Lâu Bền Bỉ": "69.000đ",
  "No Lành Thanh Dáng": "69.000đ",
  "Bền Sức Tôn Dáng": "69.000đ",
  "Trà Xanh Thanh Lọc": "65.000đ",
  "Hồng Hào Rạng Rỡ": "69.000đ",
  "Tỏa Sáng Xuất Thần": "65.000đ",
  "Da Mướt Mịn Màng": "69.000đ",
  "Dưỡng Dáng Êm Bụng": "75.000đ",
  "Dáng Thon Cực Phẩm": "85.000đ",
  "Táo Khoẻ Đẹp Da": "89.000đ",
  "Tiên Nữ Tỷ Tỷ": "79.000đ",
  "Tươi Trẻ Rạng Ngời": "85.000đ",
  "Sắc Vóc Tuyệt Mỹ": "79.000đ",
  "Cần Tây Thanh Mát": "85.000đ",
  "Cần Tây Chân Ái": "89.000đ",
};

export function priceForProduct(product: (typeof MENU_PRODUCTS)[number]) {
  return PRODUCT_PRICES_BY_NAME[product.name] ?? product.price;
}


export const ENGLISH_PRODUCT_NAMES: Record<string, string> = {
  S01: "Purely Light",
  S02: "Shine & Lean",
  S03: "Fresh & Clear",
  S04: "Slim & Chill",
  S05: "Power Fuel",
  S06: "Clean Blend",
  S07: "Active Tone",
  S08: "Green Tea Refresh",
  S09: "Rosy Radiance",
  S10: "Golden Glow",
  S11: "Aqua Dew",
  S12: "Calm & Shape",
  J01: "Green Queen",
  J02: "Apple Glow",
  J03: "Golden Fairy",
  J04: "Radiant Red",
  J05: "Fresh Green",
  J06: "Celery Refresh",
  J07: "True Celery",
};

export const CHINESE_PRODUCT_NAMES: Record<string, string> = {
  S01: "轻盈无负担",
  S02: "清亮轻盈",
  S03: "清新蔬果",
  S04: "轻盈畅享",
  S05: "饱腹活力",
  S06: "轻盈好状态",
  S07: "充沛活力",
  S08: "绿茶清新",
  S09: "红润光彩",
  S10: "金色焕亮",
  S11: "清润水感",
  S12: "温和轻盈",
  J01: "轻盈鲜果",
  J02: "苹果焕亮",
  J03: "金色仙子",
  J04: "红润焕彩",
  J05: "清新绿意",
  J06: "芹菜清爽",
  J07: "纯粹芹菜",
};

export function localizedProductName(product: (typeof MENU_PRODUCTS)[number], locale: Locale) {
  if (locale === "en") return ENGLISH_PRODUCT_NAMES[product.code] ?? product.name;
  if (locale === "zh") return CHINESE_PRODUCT_NAMES[product.code] ?? product.name;
  return product.name;
}

const PACKAGE_NAMES: Record<string, { en: string; zh: string }> = {
  MP01: { en: "1-Day Package", zh: "1 天套餐" },
  MP02: { en: "1-Day Package", zh: "1 天套餐" },
  MP03: { en: "3-Day Package", zh: "3 天套餐" },
  MP04: { en: "5-Day Package", zh: "5 天套餐" },
  MP05: { en: "7-Day Package", zh: "7 天套餐" },
  MP06: { en: "14-Day Package", zh: "14 天套餐" },
  MP07: { en: "5-Day Package", zh: "5 天套餐" },
  MP08: { en: "7-Day Package", zh: "7 天套餐" },
  MP09: { en: "5-Day Package", zh: "5 天套餐" },
  MP10: { en: "7-Day Package", zh: "7 天套餐" },
};

export function localizedPackageName(packageItem: (typeof MORNING_PACKAGES)[number], locale: Locale) {
  if (locale === "vi") return packageItem.name;
  return PACKAGE_NAMES[packageItem.code]?.[locale] ?? packageItem.name;
}

const PACKAGE_FORMATS: Record<string, { en: string; zh: string }> = {
  MP01: { en: "1 day × 5 bottles", zh: "1 天 × 5 瓶" },
  MP02: { en: "1 day × 6 bottles", zh: "1 天 × 6 瓶" },
  MP03: { en: "5 bottles/day · 15 bottles", zh: "每天 5 瓶 · 共 15 瓶" },
  MP04: { en: "5 bottles/day · 25 bottles", zh: "每天 5 瓶 · 共 25 瓶" },
  MP05: { en: "5 bottles/day · 35 bottles", zh: "每天 5 瓶 · 共 35 瓶" },
  MP06: { en: "5 bottles/day · 70 bottles", zh: "每天 5 瓶 · 共 70 瓶" },
  MP07: { en: "2 bottles/day · 10 bottles", zh: "每天 2 瓶 · 共 10 瓶" },
  MP08: { en: "2 bottles/day · 14 bottles", zh: "每天 2 瓶 · 共 14 瓶" },
  MP09: { en: "3 bottles/day · 15 bottles", zh: "每天 3 瓶 · 共 15 瓶" },
  MP10: { en: "3 bottles/day · 21 bottles", zh: "每天 3 瓶 · 共 21 瓶" },
};

export function localizedPackageFormat(packageItem: (typeof MORNING_PACKAGES)[number], locale: Locale) {
  if (locale === "vi") return packageItem.format;
  return PACKAGE_FORMATS[packageItem.code]?.[locale] ?? packageItem.format;
}
