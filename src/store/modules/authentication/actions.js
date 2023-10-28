let timer;
import axios from "axios";

export default {
    auth(context, payload) {
        const key = "AIzaSyAdSX4WKcnk8B8yOThVu14tOkmmHLdGZk8"
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key
        if (payload.mode === 'login') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key
        }
        axios.post(url, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        }).then(response => {

            const expiresIn = +response.data.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            timer = setTimeout(function () {
                context.dispatch('didAutoLogout')
            }, expiresIn)

            context.commit('setUser', {
                token: response.data.idToken,
                userId: response.data.localId,


            })
        }).catch(error => {
            // TODO Add error handling
            console.log(error)
        })
    },
    autoLogin(context) {
       const token = localStorage.getItem('token');
       const userId = localStorage.getItem('userId');
       const tokenExpiration = localStorage.getItem('tokenExpiration');

       const expiresIn = +tokenExpiration - new Date().getTime();

       if (expiresIn < 0) {
           return;
       }
       timer = setTimeout(function () {
           context.dispatch('didAutoLogout')
       }, expiresIn)

       if (token && userId) {
           context.commit('setUser', {
               token: token,
               userId: userId,

           })
       }
    },
    signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },
    didAutoLogout(context) {
        context.dispatch('logout');
        context.commit('didAutoLogout')
    }


}
