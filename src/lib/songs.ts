export type EffectType = "snow" | "hearts" | "rain" | "stars" | "sparkles" | "butterflies" | "sweet_rain_butterflies" | "none";

export interface Song {
    id: string;
    url: string;
    title: string;
    effect: EffectType;
}

export const LOCAL_SONGS: Song[] = [
    {
        id: "l1",
        title: "Saiyaara Reprise",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599601/Saiyaara_Reprise_Female_Slowed_Reverb_Shreya_Ghoshal_SR_Lofi_hm61dp.mp3",
        effect: "snow"
    },
    {
        id: "l2",
        title: "Oh Oh Jane Jaana",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599606/Oh_Oh_Jane_Jaana_Slowed_Reverbed_ay5adk.mp3",
        effect: "stars"
    },
    {
        id: "l3",
        title: "Na Rasta Maloom",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599602/na_rasta_maloom_na_tere_naam_pata_maloom_na_rasta_maloom_na_rasta_maloom_lofi_1_pt1g0d.mp3",
        effect: "rain"
    },
    {
        id: "l4",
        title: "Sun Meri Shehzadi",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599602/Sun_meri_shehzadi_-_Slowed_Down_Reverb_Saaton_Janam_Mein_Tere_Night_Song_uhegyf.mp3",
        effect: "hearts"
    },
    {
        id: "l5",
        title: "Tujhe Sochta Hoon",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768599607/Tujhe_Sochta_Hoon_Slowed_Reverb_Rain_K.K_Wormono_lofi_wxjw1b.mp3",
        effect: "sparkles"
    },
    {
        id: "l6",
        title: "Sweet Rain Butterflies",
        url: "https://res.cloudinary.com/dd431rll2/video/upload/v1768753316/VID-20260117-WA0003_shnoqa.mp3",
        effect: "sweet_rain_butterflies"
    }
];
