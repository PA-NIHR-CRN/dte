import { AxiosResponse } from "axios";
import Utils, { EmailRegex, MobileRegex, LandlineRegex } from "../Helper/Utils";

describe("Utils Tests", () => {
  describe("ConvertResponseToDTEResponse", () => {
    it("returns undefined when response is undefined", () => {
      expect(Utils.ConvertResponseToDTEResponse(undefined)).toBeUndefined();
    });

    it("returns undefined when response status is not between 200 and 299", () => {
      const resp: AxiosResponse = { status: 404, data: {} } as AxiosResponse;
      expect(Utils.ConvertResponseToDTEResponse(resp)).toBeUndefined();
    });

    it("returns response data when response status is between 200 and 299", () => {
      const resp: AxiosResponse = {
        status: 200,
        data: { message: "Success" },
      } as AxiosResponse;
      expect(Utils.ConvertResponseToDTEResponse(resp)).toEqual({
        message: "Success",
      });
    });
  });

  describe("TrimFormDataFields", () => {
    it("trims string fields in form data", () => {
      const formData = { name: " John Doe ", email: " john.doe@example.com " };
      expect(Utils.TrimFormDataFields(formData)).toEqual({
        name: "John Doe",
        email: "john.doe@example.com",
      });
    });

    it("does not trim non-string fields in form data", () => {
      const formData = { name: " John Doe ", agreed: true };
      expect(Utils.TrimFormDataFields(formData)).toEqual({
        name: "John Doe",
        agreed: true,
      });
    });
  });

  describe("EmailRegex", () => {
    it("matches valid email addresses", () => {
      expect(EmailRegex.test("john.doe@example.com")).toBe(true);
    });

    it("does not match invalid email addresses", () => {
      expect(EmailRegex.test("john.doe@example")).toBe(false);
    });
  });

  describe("MobileRegex", () => {
    it("matches valid mobile numbers", () => {
      expect(MobileRegex.test("+447123456789")).toBe(true);
    });

    it("does not match invalid mobile numbers", () => {
      expect(MobileRegex.test("123456789")).toBe(false);
    });
  });

  describe("LandlineRegex", () => {
    it("matches valid landline numbers", () => {
      expect(LandlineRegex.test("+44123456789")).toBe(true);
    });

    it("does not match invalid landline numbers", () => {
      expect(LandlineRegex.test("123456789")).toBe(false);
    });
  });
});
