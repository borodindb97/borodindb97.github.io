window.onload = function () {
    console.log('hello');
    let mainPage = new MainPage();
    mainPage.getUserId();
    // mainPage.getPages();
    mainPage.render();
}