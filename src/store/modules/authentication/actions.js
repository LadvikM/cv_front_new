import axios from "axios";


export default {
    login() {

    },
    async signup(context, payload) {
        const signup = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdSX4WKcnk8B8yOThVu14tOkmmHLdGZk8', {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        }).then(function (response) {
            context.commit('setUser', {
               token: response.idToken,
               userId: response.localId,
               tokenExpiration: response.expiresIn
           })
        }).catch(function (error) {

            throw new Error(error.message)


        });
    return signup;
        },

}
