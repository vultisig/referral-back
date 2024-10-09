import {Chain} from "./chain";

export interface VASUser {
    uid: string,
    name: string,
    alias: string,
    public_key_ecdsa: string,
    public_key_eddsa: string,
    total_points: number,
    join_airdrop: boolean,
    rank: boolean
    chains: Chain[],

}