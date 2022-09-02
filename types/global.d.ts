export {};

declare global {
  type User = { 
    best_legend: number
    best_legend_games: number
    best_legend_wins: number
    brawlhalla_id: number
    games: number
    name: string
    peak_rating: number
    rank: number
    rating: number
    region: string
    tier: string
    wins: number
    };

    type Legend = {
    legend_id: number
    legend_name_key: string
    bio_name: string
    bio_aka: string
    weapon_one: string
    weapon_two: string
    strength: number
    dexterity: number
    defense: number
    speed:number
}

enum Weapon {
  Hammer, Sword, Pistol, RocketLance, Spear, Katar, Axe, Box, Scythe, Orb, Greatsword, Fists
}
}