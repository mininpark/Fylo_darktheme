$(function(){
    var $searchBtn = $('.nav__main .search_btn'), 
        $searchForm = $('header form');

        $searchBtn.click(function(){
            $searchForm.toggleClass('active');
        });

}); //document ready funtion call back
