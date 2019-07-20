import{Commit} from 'vuex';
import{getStratDetail} from '@/api/movie';
const actions = {
    async stratDetail(context:{commit:Commit}, id:string) {
        const res: any = await getStratDetail(id)
            .then((response: any) => response)
            // tslint:disable-next-line:no-console
            .catch((e: string) => console.error(e));
        return res;
    }
}
export default{
    actions
}