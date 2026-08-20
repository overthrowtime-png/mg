export const HERO_IMAGE = "/SACVOCTUYETMY.png";
export const FACEBOOK_OFFICE_IMAGE = "/manus-storage/morning-green-facebook-office_add3feda.png";
export const MESSENGER_LINK = "https://m.me/morninggreen";
export const FACEBOOK_LINK = "https://www.facebook.com/morninggreenvn";
export const ZALO_LINK = "https://zalo.me/morninggreen";
export const PHONE_NUMBER = "0839 761 494";
export const PHONE_LINK = "tel:+84839761494";
export const WHATSAPP_LINK = "https://wa.me/84839761494";

export type Product = {
  name: string;
  descriptor: string;
  ingredients: string[];
  detail: string;
  price: string;
  tone: string;
};

export const products: Product[] = [
  {
    name: "Green No. 01",
    descriptor: "Kale · Táo xanh · Cần tây",
    ingredients: ["Kale tươi Đà Lạt", "Táo xanh tươi", "Cần tây nguyên bản", "Nước dừa tươi nguyên chất (không đường)", "Chanh vàng"],
    detail: "Vị xanh thanh, hậu táo nhẹ và kết cấu mượt. Một lựa chọn dễ bắt đầu cho buổi sáng đô thị.",
    price: "79.000đ",
    tone: "from-[#d9ead7] to-[#f4f0df]",
  },
  {
    name: "Cucumber Mint",
    descriptor: "Dưa leo · Bạc hà · Chanh vàng",
    ingredients: ["Dưa leo tươi", "Lá bạc hà tươi nguyên cành", "Chanh vàng ép lạnh", "Nước khoáng thiên nhiên", "Mật ong hoa rừng tự nhiên (lượng vừa đủ)"],
    detail: "Mát, sáng vị và gọn gàng. Phù hợp cho những ngày cần một khoảng nghỉ tươi mới giữa lịch trình.",
    price: "79.000đ",
    tone: "from-[#d8efde] to-[#eef6e9]",
  },
  {
    name: "Ruby Root",
    descriptor: "Củ dền · Táo · Gừng",
    ingredients: ["Củ dền đỏ tươi", "Táo tươi chọn lọc", "Gừng tươi ép lạnh", "Nước cam tươi nguyên chất"],
    detail: "Màu ruby tự nhiên, vị ngọt dịu từ rau củ quả thật và một điểm chạm ấm của gừng.",
    price: "89.000đ",
    tone: "from-[#e9d4cc] to-[#f6e9dd]",
  },
  {
    name: "Oat Green",
    descriptor: "Rau xanh · Chuối · Oat milk",
    ingredients: ["Rau bina (spinach) tươi", "Chuối chín tự nhiên", "Sữa yến mạch (oat milk) không đường", "Hạt chia hữu cơ"],
    detail: "Sánh mịn, cân bằng và dịu vị. Oat milk không đường cho trải nghiệm mềm mại hơn.",
    price: "89.000đ",
    tone: "from-[#dce3c8] to-[#f1e7cf]",
  },
];

export const districts = [
  "Quận 1",
  "Quận 3",
  "Quận 5",
  "Quận 10",
  "Bình Thạnh",
  "Phú Nhuận",
  "Thảo Điền",
  "TP. Thủ Đức",
] as const;

export const instagramCaption = `Có gì trong một chai Morning Green?\n\nRau xanh thật, trái cây thật và một kết cấu được xay mượt trong ngày. Mỗi công thức được xây quanh nguyên liệu dễ nhận biết — để bạn nhìn thấy, nếm thấy và hiểu mình đang chọn gì cho buổi sáng.\n\nKhông thêm đường tinh luyện. Không chất bảo quản. Chỉ là một lựa chọn tươi, gọn và vừa đủ cho nhịp sống thành phố.\n\nVuốt sang trái để xem chi tiết từng lớp nguyên liệu trong bộ sưu tập khởi đầu.\n\n#MorningGreen #FreshnessRefined #IngredientTransparency #FreshSmoothie #UrbanWellness #SaigonWellness`;

export const instagramCarouselSlides = [
  { slide: "01", title: "The Hero Bottle", desc: "Chai 330ml trên nền đá marble và nguyên liệu thật." },
  { slide: "02", title: "Ingredient Transparency", desc: "Liệt kê rõ từng loại rau củ tươi, không ẩn giấu thành phần." },
  { slide: "03", title: "Blended in Day", desc: "Chế biến và giữ lạnh trong ngày giao tại TP.HCM." },
  { slide: "04", title: "Discovery Set", desc: "Bộ 4 chai trải nghiệm cho tuần đầu tiên." },
];

export const facebookCaption = `Một buổi sáng gọn hơn, bắt đầu bằng một lựa chọn xanh.\n\nMorning Green chuẩn bị sinh tố rau tươi 330ml từ nguyên liệu thật, xay trong ngày và giữ lạnh để giao đến bạn tại TP.HCM. Không cần chuẩn bị nhiều bước trước giờ làm — chỉ cần đặt chai Morning Green ngay cạnh bàn làm việc để nạp lại năng lượng thanh mát.\n\nDiscovery Set là bộ trải nghiệm đầu tiên gồm 4 chai được tuyển chọn để bạn thử nhiều sắc vị: thanh mát, sánh mịn và cân bằng.\n\nNhắn tin cho Morning Green để nhận menu và khung giờ giao phù hợp.\n\nMessenger: m.me/morninggreen`;

export function buildMessengerInquiryUrl(name: string, phone: string, message: string) {
  const body = `Xin chào Morning Green, mình là ${name || "khách hàng"}. ${message || "Mình muốn nhận menu và tư vấn Discovery Set."} Số điện thoại: ${phone || "chưa để lại"}.`;
  return `${MESSENGER_LINK}?ref=website&text=${encodeURIComponent(body)}`;
}
