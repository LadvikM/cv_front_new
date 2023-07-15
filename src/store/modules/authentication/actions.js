import axios from "axios";

let timer;
export default {


    async authorization(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdSX4WKcnk8B8yOThVu14tOkmmHLdGZk8';
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdSX4WKcnk8B8yOThVu14tOkmmHLdGZk8'
        }
        return await axios.post(url, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        }).then(function (response) {
            localStorage.setItem('token', response.idToken);
            localStorage.setItem('userId', response.localId);
            const expiresIn = +response.expiresIn * 1000;

            const expirationTime = new Date().getTime() + expiresIn // New time when token expires in future, in milliseconds
            localStorage.setItem('tokenExpiration', expirationTime);

            timer = setTimeout(function () {
                context.dispatch('autoLogout')
            }, expiresIn);

            context.commit('setUser', {
                token: response.data.idToken,
                userId: response.data.localId,

            })
        }).catch(function (error) {

            throw new Error(error.message)


        });


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
            context.dispatch('autoLogout')
            }, expiresIn)

        if (token && userId) {
            context.commit("setUser", {
                token: token,
                userId: userId,

            })
        }
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer)
        context.commit('setUser', {
            userId: null,
            token: null,

        })

    },
    async login(context, payload) {
        return context.dispatch('authorization', {
            ...payload,
            mode: 'login',
        })
    },
    async signup(context, payload) {

        return context.dispatch('authorization', {
            ...payload,
            mode: 'signup',
        })
    },
    autoLogout(context) {
        context.dispatch('logout')
        context.commit('didAutoLogout');
    },

}
