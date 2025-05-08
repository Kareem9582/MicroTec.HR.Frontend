export const partnersOwlCarousel = () => {
    

  $(".partners-carousel").owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoPlay: true,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: [
      "<img src='/img/owl-icons/right-icon.svg'>",
      "<img src='/img/owl-icons/left-icon.svg'>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        nav: false,
        items: 2,
      },
      1000: {
        items: 4,
        nav: true,
      },
    },
  });
  $(".partners-carousel-rtl").owlCarousel({
    loop: true,
    rtl:true,
    margin: 24,
    nav: true,
    dots: false,
    autoPlay: true,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: [
      "<img src='/img/owl-icons/right-icon.svg'>",
      "<img src='/img/owl-icons/left-icon.svg'>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        nav: false,
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
   $(".owl-prev img").hover(
    function () {
      $(this).attr("src", "/img/owl-icons/right-long-icon.svg");
    },
    function () {
      $(this).attr("src", "/img/owl-icons/right-icon.svg");
    }
  );

  $(".owl-next img").hover(
    function () {
      $(this).attr("src", "/img/owl-icons/left-long-icon.svg");
    },
    function () {
      $(this).attr("src", "/img/owl-icons/left-icon.svg");
    }
  );
};
