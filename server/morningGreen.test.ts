import { describe, expect, it } from "vitest";
import {
  MESSENGER_LINK,
  buildMessengerInquiryUrl,
  districts,
  facebookCaption,
  instagramCaption,
  products,
} from "../shared/morningGreen";

describe("Morning Green brand content", () => {
  it("keeps a complete launch menu and HCMC delivery coverage", () => {
    expect(products).toHaveLength(4);
    expect(products.every((product) => product.price.endsWith("đ"))).toBe(true);
    expect(districts).toContain("Quận 1");
    expect(districts).toContain("TP. Thủ Đức");
  });

  it("keeps platform-specific social angles in the launch captions", () => {
    expect(instagramCaption).toContain("#IngredientTransparency");
    expect(instagramCaption).toContain("Không chất bảo quản");
    expect(facebookCaption).toContain("Discovery Set");
    expect(facebookCaption).toContain("Messenger");
  });

  it("builds an encoded Messenger inquiry URL from the order form", () => {
    const url = buildMessengerInquiryUrl("An", "0901234567", "Mình muốn thử Discovery Set");
    expect(url.startsWith(`${MESSENGER_LINK}?ref=website&text=`)).toBe(true);
    expect(decodeURIComponent(url)).toContain("Mình muốn thử Discovery Set");
    expect(decodeURIComponent(url)).toContain("Số điện thoại: 0901234567");
  });
});
