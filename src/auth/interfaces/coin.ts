export interface Coin {
    id: number;
    ticker: string;
    contract_address: string,
    decimals: number,
    is_native: boolean,
    cmc_id: number,
    logo: string
}