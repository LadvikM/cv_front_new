let autoCloseTimer;
export default {

    setAlert(context, payload) {
        context.commit('setAlert', {
            ...payload,
            show: true,
        })
        context.dispatch('autoClose')
    },

    autoClose(context) {
        autoCloseTimer = setTimeout(() => {
            context.dispatch('closeAlert')
        }, 5000)
    },

    closeAlert(context) {
        clearTimeout(autoCloseTimer)
        context.commit('setAlert', {
            show: false,
            alertMessage: null,
            isSuccess: null,
        })
    },
}