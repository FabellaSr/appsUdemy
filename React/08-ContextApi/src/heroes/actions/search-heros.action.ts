import { heroApi } from "../api/hero.api"
import type { searchHeroes } from "../types/search-heros.response"



export const searchHeroesActions = async () => {
    const { data } = await heroApi.get<searchHeroes>(`/search`);
    return data;
}