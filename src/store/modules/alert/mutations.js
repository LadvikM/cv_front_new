export default {
    setAlert(state, payload) {
        state.show = payload.show;
        state.alertMessage = payload.alertMessage;
        state.isSuccess = payload.isSuccess;
    },
}