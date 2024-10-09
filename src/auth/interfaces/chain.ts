import {Coin} from "./coin";

export interface Chain {
    name: string,
    address: string,
    hex_public_key: string
    coins: Coin[]

}