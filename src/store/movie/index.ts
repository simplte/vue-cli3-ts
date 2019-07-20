import { Commit } from 'vuex';
import { getMovieDetail, getMovieComment } from '@/api/movie';

const actions = {
    async movieDetail(context: { commit: Commit }, id: string) {
        const res: any = await getMovieDetail(id)
            .then((response: any) => response)
            // tslint:disable-next-line:no-console
            .catch((e: string) => console.error(e));
        return res;
    },
    async movieComment(context: { commit: Commit }, id: string) {
        const res: any = await getMovieComment(id)
            .then((response: any) => response)
            // tslint:disable-next-line:no-console
            .catch((e: string) => console.error(e));
        return res;
    },
};

export default {
    actions,
};
