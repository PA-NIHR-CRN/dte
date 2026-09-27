$(document).ready(function () {
  if (
    ($(".close-menu .btn-close").on("click", function (e) {
      (window.scrollTo({
        top: 0,
      }),
        $(this)
          .parents(".megamenu")
          .siblings(".dropdown-toggle")
          .click()
          .focus(),
        e.stopPropagation(),
        e.preventDefaul$());
    }),
    $(".megamenu-content__linklist").length)
  ) {
    function o() {
      $(".megamenu-content__linklist").each(function () {
        $(window).width() >= 992 &&
          ($(this)
            .find(".btn")
            .attr("aria-expanded", "true")
            .attr("tabindex", "-1")
            .attr("disabled", "true"),
          $(this).find(".collapse").addClass("show"));
      });
    }
    (o(),
      $(window).resize(function () {
        o();
      }));
  }
  if ($(".nav-link.dropdown-toggle").length) {
    function n() {
      $(window).width() < 1200
        ? $(".nav-link.dropdown-toggle").each(function (e) {
            $(this).attr("data-bs-auto-close", "false");
          })
        : $(".nav-link.dropdown-toggle").each(function (e) {
            $(this).attr("data-bs-auto-close", "outside");
          });
    }
    (n(),
      $(window).resize(function () {
        n();
      }));
  }
});
