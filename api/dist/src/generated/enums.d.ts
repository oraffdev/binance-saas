export declare const Timeframe: {
    readonly M15: "M15";
    readonly H1: "H1";
    readonly H4: "H4";
};
export type Timeframe = (typeof Timeframe)[keyof typeof Timeframe];
