app.factory('services_localstorage', function() {
    let service = {setSession: setSession, clearSession: clearSession, setJumpPage: setJumpPage};
    return service;

    function setSession(jwt) {
        localStorage.setItem('token', jwt);
    }

    function clearSession() {
        localStorage.removeItem('token');
    }

    function setJumpPage() {
        let jumpPage = localStorage.jumpPage;
        localStorage.removeItem('jumpPage');
        return jumpPage;
    }
});