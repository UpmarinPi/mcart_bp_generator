export const ConvertModes =  {
    Default: "Default",
    Second: "Second",
} as const;

type ConvertMode = typeof ConvertModes[keyof typeof ConvertModes];

export function StringToConvertMode(value: string): ConvertMode | undefined {
    return (Object.values(ConvertModes) as string[]).includes(value)
        ? (value as ConvertMode)
        : undefined;
}

export enum EDimensionalMode {
    Flat,   // 高さを持たない
    Shape,  // 高さを持つ。明暗を用いて色数を増やしている
}