import mutations from '@/store/modules/alert/mutations'
import getters from "@/store/modules/alert/getters";
import actions from "@/store/modules/alert/actions";

export default {
    state() {
        return {
            show: false,
            alertMessage: null,
            isSuccess: null,

        }
    },
    mutations,
    actions,
    getters,
}