import mutations from '@/store/modules/authentication/mutations'
import getters from "@/store/modules/authentication/getters";
import actions from "@/store/modules/authentication/actions";

export default {
state() {
    return {
        userId: null,
        token: null,
        didAutoLogout: false,
    }
},
    mutations,
    actions,
    getters,
}