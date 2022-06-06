app.factory('services_social_login', ['services', 'services_localstorage', 'toastr', function(services, services_localstorage, toastr) {
    let service = { initialize: initialize, google: google, github: github, social_login: social_login };
    return service;

    function initialize() {
        var firebaseConfig = {
            apiKey: "AIzaSyBjZ5EXtpoNFI9M63_x-1-5mqkV-NFM3hs",
            authDomain: "prueba-b29d6.firebaseapp.com",
            databaseURL: "https://website-306519.firebaseio.com",
            projectId: "",
            storageBucket: "prueba-b29d6.appspot.com",
            messagingSenderId: "948797586586"
        };
        firebase.initializeApp(firebaseConfig);
    }

    function google() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
            .then(function(result) {
                social_login({ id: result.user.uid, username: result.user.displayName, email: result.user.email, avatar: result.user.photoURL });
            })
            .catch(function(error) {
                console.log('Se ha encontrado un error:', error);
            });
    }

    function github() {
        let provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
            .then(function(result) {
                social_login({ id: result.user.uid, username: result.user.displayName, email: result.user.email, avatar: result.user.photoURL });
            })
            .catch(function(error) {
                console.log('Se ha encontrado un error:', error);
            });
    }

    function social_login(profile) {
        services.post('login', 'social_login', { profile: profile })
            .then(function(response) {
                if (response != "fail") {
                    toastr.success("Log In");
                    services_localstorage.setSession(response);
                } else {
                    toastr.error("This account doesn't exist.");
                }
                location.href = "#/home";
                window.location.reload();
            }, function(error) {
                console.log(error);
            });
    } // end_socialLogIn
}]);