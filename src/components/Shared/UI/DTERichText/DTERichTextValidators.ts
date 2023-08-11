/* eslint-disable no-useless-escape */
import sanitizeHtml from "sanitize-html";
import htmlTags from "html-tags";

export default class DTERichTextValidators {
  static validateRequired = (data: string) => {
    return (
      sanitizeHtml(data, {
        allowedTags: [],
      }).replace(/[^a-zA-Z0-9!"£$%^&*():@~{}\[\]<>\? ]/g, "").length > 0
    );
  };

  static minCharacterLength = (data: string, minLength: number) => {
    return (
      sanitizeHtml(data, {
        allowedTags: [],
      }).replace(/[^a-zA-Z0-9!"£$%^&*():@~{}\[\]<>\? ]/g, "").length >=
      minLength
    );
  };

  static maxCharacterLength = (data: string, maxLength: number) => {
    return (
      sanitizeHtml(data, {
        allowedTags: [],
      }).replace(/[^a-zA-Z0-9!"£$%^&*():@~{}\[\]<>\? ]/g, "").length <=
      maxLength
    );
  };

  static characterLengthRange = (
    data: string,
    minLength: number,
    maxLength: number,
  ) => {
    const clean = sanitizeHtml(data, {
      allowedTags: [],
    }).replace(/[^a-zA-Z0-9!"£$%^&*():@~{}\[\]<>\? ]/g, "");
    return clean.length >= minLength && clean.length <= maxLength;
  };

  static isHtml = (data: string) => {
    const basic =
      /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
    const full = new RegExp(
      htmlTags.map((tag) => `<${tag}\\b[^>]*>`).join("|"),
      "i",
    );

    const checker = data.trim().slice(0, 1000);
    return basic.test(checker) || full.test(checker);
  };
}
