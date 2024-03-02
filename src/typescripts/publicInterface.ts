export interface PreferenceDataInterface {
    poemTopic: string,
    autoTopic: boolean,
    changePoemTime: string,

    searchEngine: "bing" | "google",
    simpleMode: boolean,
    buttonShape: "circle" | "default" | "round" | undefined
}