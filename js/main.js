$(window).load(function () {
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('body').addClass('ios');
   } else {
      $('body').addClass('web');
   };
   $('body').removeClass('loaded');

   let windWidth = $(window).width();

   $(".header__toggle").on('click', function () {
      $(".header__toggle").toggleClass('active');
      $(".header__mob").toggleClass('active');
   });

   $(".anchor").on("click", function (event) {
      event.preventDefault();
      var id = $(this).attr('href')
         , top = $(id).offset().top;
      $('body,html').animate({
         scrollTop: top
      }, 1000);

      if (windWidth < 768) {
         $(".header__toggle").toggleClass('active');
         $(".header__mob").toggleClass('active');
      }
   });

   if ($(".phone")) {
      $(".phone").mask("+38 (999) 999-99-99");
      $(".phone").focus(function () {
         $(this).val('+38 (');
      });
   }

   let errorFileldsNumb = 0;
   let errorFile = 1;
   let errorFileLink = 1;
   let errorFiles;

   $(".contact__send").on('click', function (e) {
      errorFileldsNumb = 0;
      e.preventDefault();
      $(".required").each(function () {
         let currInp = $(this);
         if (currInp.val().length == 0) {
            currInp.closest('.contact__input').addClass("error");
            errorFileldsNumb += 1;
         }
      });

      if (errorFile === 1) {
         $(".contact__file").addClass('error');
      } else {
         $(".contact__file").removeClass('error');
      }

      if (errorFileLink === 1) {
         $(".contact__file2").addClass('error');
      } else {
         $(".contact__file2").removeClass('error');
      }

      if (errorFileLink === 0 || errorFile === 0) {
         errorFiles = 0;
      } else {
         errorFiles = 1;
      }

      if (errorFileldsNumb === 0 && errorFiles === 0) {
         $(this).closest('form').submit();
         $(this).attr("disabled", true);
      } else {
         $(this).attr("disabled", false);
      }
   });

   let uploadField = document.getElementById("file-1");

   uploadField.onchange = function () {

      let allSizes = 0;

      for (let i = 0; i < this.files.length; i++) {
         allSizes += this.files[i].size;
      }

      if (allSizes > 10485760) {
         alert("Файл занадто великий");
         this.value = "";
         errorFile = 1;
         $(".contact__file").addClass('error');
      } else {
         errorFile = 0;
         $(".contact__file").removeClass('error');
         $(".contact__file").addClass('nonempty');
         $(".contact__file label").text('Додано. Розмір - ' + ((allSizes / 1000000).toFixed(2)) + 'mb');
      }
   };

   $("#field-10").on('keyup', function () {
      if ($(this).closest('.contact__input').hasClass('error')) {
         $(this).closest('.contact__input').removeClass('error');
      }
      if ($(this).val().length > 2) {
         errorFileLink = 0;
      }
   });

   $('.required').on('keyup', function () {
      if ($(this).closest('.contact__input').hasClass('error')) {
         $(this).closest('.contact__input').removeClass('error');
      }
   });


});