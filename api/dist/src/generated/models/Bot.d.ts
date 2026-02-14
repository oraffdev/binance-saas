import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BotModel = runtime.Types.Result.DefaultSelection<Prisma.$BotPayload>;
export type AggregateBot = {
    _count: BotCountAggregateOutputType | null;
    _avg: BotAvgAggregateOutputType | null;
    _sum: BotSumAggregateOutputType | null;
    _min: BotMinAggregateOutputType | null;
    _max: BotMaxAggregateOutputType | null;
};
export type BotAvgAggregateOutputType = {
    amount: number | null;
    tp: number | null;
    sl: number | null;
    atrMultiplier: number | null;
    tpSlRatio: number | null;
    tuneLookbackDays: number | null;
};
export type BotSumAggregateOutputType = {
    amount: number | null;
    tp: number | null;
    sl: number | null;
    atrMultiplier: number | null;
    tpSlRatio: number | null;
    tuneLookbackDays: number | null;
};
export type BotMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    symbol: string | null;
    timeframe: $Enums.Timeframe | null;
    amount: number | null;
    tp: number | null;
    sl: number | null;
    useDynamicSLTP: boolean | null;
    atrMultiplier: number | null;
    tpSlRatio: number | null;
    isActive: boolean | null;
    autoTune: boolean | null;
    lastTunedAt: Date | null;
    tuneLookbackDays: number | null;
    userId: string | null;
};
export type BotMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    symbol: string | null;
    timeframe: $Enums.Timeframe | null;
    amount: number | null;
    tp: number | null;
    sl: number | null;
    useDynamicSLTP: boolean | null;
    atrMultiplier: number | null;
    tpSlRatio: number | null;
    isActive: boolean | null;
    autoTune: boolean | null;
    lastTunedAt: Date | null;
    tuneLookbackDays: number | null;
    userId: string | null;
};
export type BotCountAggregateOutputType = {
    id: number;
    name: number;
    symbol: number;
    timeframe: number;
    amount: number;
    tp: number;
    sl: number;
    useDynamicSLTP: number;
    atrMultiplier: number;
    tpSlRatio: number;
    isActive: number;
    autoTune: number;
    lastTunedAt: number;
    tuneLookbackDays: number;
    userId: number;
    _all: number;
};
export type BotAvgAggregateInputType = {
    amount?: true;
    tp?: true;
    sl?: true;
    atrMultiplier?: true;
    tpSlRatio?: true;
    tuneLookbackDays?: true;
};
export type BotSumAggregateInputType = {
    amount?: true;
    tp?: true;
    sl?: true;
    atrMultiplier?: true;
    tpSlRatio?: true;
    tuneLookbackDays?: true;
};
export type BotMinAggregateInputType = {
    id?: true;
    name?: true;
    symbol?: true;
    timeframe?: true;
    amount?: true;
    tp?: true;
    sl?: true;
    useDynamicSLTP?: true;
    atrMultiplier?: true;
    tpSlRatio?: true;
    isActive?: true;
    autoTune?: true;
    lastTunedAt?: true;
    tuneLookbackDays?: true;
    userId?: true;
};
export type BotMaxAggregateInputType = {
    id?: true;
    name?: true;
    symbol?: true;
    timeframe?: true;
    amount?: true;
    tp?: true;
    sl?: true;
    useDynamicSLTP?: true;
    atrMultiplier?: true;
    tpSlRatio?: true;
    isActive?: true;
    autoTune?: true;
    lastTunedAt?: true;
    tuneLookbackDays?: true;
    userId?: true;
};
export type BotCountAggregateInputType = {
    id?: true;
    name?: true;
    symbol?: true;
    timeframe?: true;
    amount?: true;
    tp?: true;
    sl?: true;
    useDynamicSLTP?: true;
    atrMultiplier?: true;
    tpSlRatio?: true;
    isActive?: true;
    autoTune?: true;
    lastTunedAt?: true;
    tuneLookbackDays?: true;
    userId?: true;
    _all?: true;
};
export type BotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotWhereInput;
    orderBy?: Prisma.BotOrderByWithRelationInput | Prisma.BotOrderByWithRelationInput[];
    cursor?: Prisma.BotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BotCountAggregateInputType;
    _avg?: BotAvgAggregateInputType;
    _sum?: BotSumAggregateInputType;
    _min?: BotMinAggregateInputType;
    _max?: BotMaxAggregateInputType;
};
export type GetBotAggregateType<T extends BotAggregateArgs> = {
    [P in keyof T & keyof AggregateBot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBot[P]> : Prisma.GetScalarType<T[P], AggregateBot[P]>;
};
export type BotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotWhereInput;
    orderBy?: Prisma.BotOrderByWithAggregationInput | Prisma.BotOrderByWithAggregationInput[];
    by: Prisma.BotScalarFieldEnum[] | Prisma.BotScalarFieldEnum;
    having?: Prisma.BotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BotCountAggregateInputType | true;
    _avg?: BotAvgAggregateInputType;
    _sum?: BotSumAggregateInputType;
    _min?: BotMinAggregateInputType;
    _max?: BotMaxAggregateInputType;
};
export type BotGroupByOutputType = {
    id: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount: number;
    tp: number;
    sl: number;
    useDynamicSLTP: boolean;
    atrMultiplier: number | null;
    tpSlRatio: number | null;
    isActive: boolean;
    autoTune: boolean;
    lastTunedAt: Date | null;
    tuneLookbackDays: number;
    userId: string;
    _count: BotCountAggregateOutputType | null;
    _avg: BotAvgAggregateOutputType | null;
    _sum: BotSumAggregateOutputType | null;
    _min: BotMinAggregateOutputType | null;
    _max: BotMaxAggregateOutputType | null;
};
type GetBotGroupByPayload<T extends BotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BotGroupByOutputType[P]>;
}>>;
export type BotWhereInput = {
    AND?: Prisma.BotWhereInput | Prisma.BotWhereInput[];
    OR?: Prisma.BotWhereInput[];
    NOT?: Prisma.BotWhereInput | Prisma.BotWhereInput[];
    id?: Prisma.StringFilter<"Bot"> | string;
    name?: Prisma.StringFilter<"Bot"> | string;
    symbol?: Prisma.StringFilter<"Bot"> | string;
    timeframe?: Prisma.EnumTimeframeFilter<"Bot"> | $Enums.Timeframe;
    amount?: Prisma.FloatFilter<"Bot"> | number;
    tp?: Prisma.FloatFilter<"Bot"> | number;
    sl?: Prisma.FloatFilter<"Bot"> | number;
    useDynamicSLTP?: Prisma.BoolFilter<"Bot"> | boolean;
    atrMultiplier?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    tpSlRatio?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    isActive?: Prisma.BoolFilter<"Bot"> | boolean;
    autoTune?: Prisma.BoolFilter<"Bot"> | boolean;
    lastTunedAt?: Prisma.DateTimeNullableFilter<"Bot"> | Date | string | null;
    tuneLookbackDays?: Prisma.IntFilter<"Bot"> | number;
    userId?: Prisma.StringFilter<"Bot"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    trades?: Prisma.TradeListRelationFilter;
};
export type BotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    timeframe?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    useDynamicSLTP?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    autoTune?: Prisma.SortOrder;
    lastTunedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    trades?: Prisma.TradeOrderByRelationAggregateInput;
};
export type BotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BotWhereInput | Prisma.BotWhereInput[];
    OR?: Prisma.BotWhereInput[];
    NOT?: Prisma.BotWhereInput | Prisma.BotWhereInput[];
    name?: Prisma.StringFilter<"Bot"> | string;
    symbol?: Prisma.StringFilter<"Bot"> | string;
    timeframe?: Prisma.EnumTimeframeFilter<"Bot"> | $Enums.Timeframe;
    amount?: Prisma.FloatFilter<"Bot"> | number;
    tp?: Prisma.FloatFilter<"Bot"> | number;
    sl?: Prisma.FloatFilter<"Bot"> | number;
    useDynamicSLTP?: Prisma.BoolFilter<"Bot"> | boolean;
    atrMultiplier?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    tpSlRatio?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    isActive?: Prisma.BoolFilter<"Bot"> | boolean;
    autoTune?: Prisma.BoolFilter<"Bot"> | boolean;
    lastTunedAt?: Prisma.DateTimeNullableFilter<"Bot"> | Date | string | null;
    tuneLookbackDays?: Prisma.IntFilter<"Bot"> | number;
    userId?: Prisma.StringFilter<"Bot"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    trades?: Prisma.TradeListRelationFilter;
}, "id">;
export type BotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    timeframe?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    useDynamicSLTP?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    autoTune?: Prisma.SortOrder;
    lastTunedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.BotCountOrderByAggregateInput;
    _avg?: Prisma.BotAvgOrderByAggregateInput;
    _max?: Prisma.BotMaxOrderByAggregateInput;
    _min?: Prisma.BotMinOrderByAggregateInput;
    _sum?: Prisma.BotSumOrderByAggregateInput;
};
export type BotScalarWhereWithAggregatesInput = {
    AND?: Prisma.BotScalarWhereWithAggregatesInput | Prisma.BotScalarWhereWithAggregatesInput[];
    OR?: Prisma.BotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BotScalarWhereWithAggregatesInput | Prisma.BotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Bot"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Bot"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Bot"> | string;
    timeframe?: Prisma.EnumTimeframeWithAggregatesFilter<"Bot"> | $Enums.Timeframe;
    amount?: Prisma.FloatWithAggregatesFilter<"Bot"> | number;
    tp?: Prisma.FloatWithAggregatesFilter<"Bot"> | number;
    sl?: Prisma.FloatWithAggregatesFilter<"Bot"> | number;
    useDynamicSLTP?: Prisma.BoolWithAggregatesFilter<"Bot"> | boolean;
    atrMultiplier?: Prisma.FloatNullableWithAggregatesFilter<"Bot"> | number | null;
    tpSlRatio?: Prisma.FloatNullableWithAggregatesFilter<"Bot"> | number | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Bot"> | boolean;
    autoTune?: Prisma.BoolWithAggregatesFilter<"Bot"> | boolean;
    lastTunedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Bot"> | Date | string | null;
    tuneLookbackDays?: Prisma.IntWithAggregatesFilter<"Bot"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Bot"> | string;
};
export type BotCreateInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    user: Prisma.UserCreateNestedOneWithoutBotsInput;
    trades?: Prisma.TradeCreateNestedManyWithoutBotInput;
};
export type BotUncheckedCreateInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    userId: string;
    trades?: Prisma.TradeUncheckedCreateNestedManyWithoutBotInput;
};
export type BotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutBotsNestedInput;
    trades?: Prisma.TradeUpdateManyWithoutBotNestedInput;
};
export type BotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    trades?: Prisma.TradeUncheckedUpdateManyWithoutBotNestedInput;
};
export type BotCreateManyInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    userId: string;
};
export type BotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BotListRelationFilter = {
    every?: Prisma.BotWhereInput;
    some?: Prisma.BotWhereInput;
    none?: Prisma.BotWhereInput;
};
export type BotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    timeframe?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    useDynamicSLTP?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    autoTune?: Prisma.SortOrder;
    lastTunedAt?: Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type BotAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
};
export type BotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    timeframe?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    useDynamicSLTP?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    autoTune?: Prisma.SortOrder;
    lastTunedAt?: Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type BotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    timeframe?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    useDynamicSLTP?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    autoTune?: Prisma.SortOrder;
    lastTunedAt?: Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type BotSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    tp?: Prisma.SortOrder;
    sl?: Prisma.SortOrder;
    atrMultiplier?: Prisma.SortOrder;
    tpSlRatio?: Prisma.SortOrder;
    tuneLookbackDays?: Prisma.SortOrder;
};
export type BotScalarRelationFilter = {
    is?: Prisma.BotWhereInput;
    isNot?: Prisma.BotWhereInput;
};
export type BotCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput> | Prisma.BotCreateWithoutUserInput[] | Prisma.BotUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutUserInput | Prisma.BotCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BotCreateManyUserInputEnvelope;
    connect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
};
export type BotUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput> | Prisma.BotCreateWithoutUserInput[] | Prisma.BotUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutUserInput | Prisma.BotCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BotCreateManyUserInputEnvelope;
    connect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
};
export type BotUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput> | Prisma.BotCreateWithoutUserInput[] | Prisma.BotUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutUserInput | Prisma.BotCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BotUpsertWithWhereUniqueWithoutUserInput | Prisma.BotUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BotCreateManyUserInputEnvelope;
    set?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    disconnect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    delete?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    connect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    update?: Prisma.BotUpdateWithWhereUniqueWithoutUserInput | Prisma.BotUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BotUpdateManyWithWhereWithoutUserInput | Prisma.BotUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BotScalarWhereInput | Prisma.BotScalarWhereInput[];
};
export type BotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput> | Prisma.BotCreateWithoutUserInput[] | Prisma.BotUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutUserInput | Prisma.BotCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BotUpsertWithWhereUniqueWithoutUserInput | Prisma.BotUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BotCreateManyUserInputEnvelope;
    set?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    disconnect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    delete?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    connect?: Prisma.BotWhereUniqueInput | Prisma.BotWhereUniqueInput[];
    update?: Prisma.BotUpdateWithWhereUniqueWithoutUserInput | Prisma.BotUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BotUpdateManyWithWhereWithoutUserInput | Prisma.BotUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BotScalarWhereInput | Prisma.BotScalarWhereInput[];
};
export type EnumTimeframeFieldUpdateOperationsInput = {
    set?: $Enums.Timeframe;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BotCreateNestedOneWithoutTradesInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutTradesInput, Prisma.BotUncheckedCreateWithoutTradesInput>;
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutTradesInput;
    connect?: Prisma.BotWhereUniqueInput;
};
export type BotUpdateOneRequiredWithoutTradesNestedInput = {
    create?: Prisma.XOR<Prisma.BotCreateWithoutTradesInput, Prisma.BotUncheckedCreateWithoutTradesInput>;
    connectOrCreate?: Prisma.BotCreateOrConnectWithoutTradesInput;
    upsert?: Prisma.BotUpsertWithoutTradesInput;
    connect?: Prisma.BotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BotUpdateToOneWithWhereWithoutTradesInput, Prisma.BotUpdateWithoutTradesInput>, Prisma.BotUncheckedUpdateWithoutTradesInput>;
};
export type BotCreateWithoutUserInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    trades?: Prisma.TradeCreateNestedManyWithoutBotInput;
};
export type BotUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    trades?: Prisma.TradeUncheckedCreateNestedManyWithoutBotInput;
};
export type BotCreateOrConnectWithoutUserInput = {
    where: Prisma.BotWhereUniqueInput;
    create: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput>;
};
export type BotCreateManyUserInputEnvelope = {
    data: Prisma.BotCreateManyUserInput | Prisma.BotCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BotUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BotWhereUniqueInput;
    update: Prisma.XOR<Prisma.BotUpdateWithoutUserInput, Prisma.BotUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BotCreateWithoutUserInput, Prisma.BotUncheckedCreateWithoutUserInput>;
};
export type BotUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BotWhereUniqueInput;
    data: Prisma.XOR<Prisma.BotUpdateWithoutUserInput, Prisma.BotUncheckedUpdateWithoutUserInput>;
};
export type BotUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BotScalarWhereInput;
    data: Prisma.XOR<Prisma.BotUpdateManyMutationInput, Prisma.BotUncheckedUpdateManyWithoutUserInput>;
};
export type BotScalarWhereInput = {
    AND?: Prisma.BotScalarWhereInput | Prisma.BotScalarWhereInput[];
    OR?: Prisma.BotScalarWhereInput[];
    NOT?: Prisma.BotScalarWhereInput | Prisma.BotScalarWhereInput[];
    id?: Prisma.StringFilter<"Bot"> | string;
    name?: Prisma.StringFilter<"Bot"> | string;
    symbol?: Prisma.StringFilter<"Bot"> | string;
    timeframe?: Prisma.EnumTimeframeFilter<"Bot"> | $Enums.Timeframe;
    amount?: Prisma.FloatFilter<"Bot"> | number;
    tp?: Prisma.FloatFilter<"Bot"> | number;
    sl?: Prisma.FloatFilter<"Bot"> | number;
    useDynamicSLTP?: Prisma.BoolFilter<"Bot"> | boolean;
    atrMultiplier?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    tpSlRatio?: Prisma.FloatNullableFilter<"Bot"> | number | null;
    isActive?: Prisma.BoolFilter<"Bot"> | boolean;
    autoTune?: Prisma.BoolFilter<"Bot"> | boolean;
    lastTunedAt?: Prisma.DateTimeNullableFilter<"Bot"> | Date | string | null;
    tuneLookbackDays?: Prisma.IntFilter<"Bot"> | number;
    userId?: Prisma.StringFilter<"Bot"> | string;
};
export type BotCreateWithoutTradesInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    user: Prisma.UserCreateNestedOneWithoutBotsInput;
};
export type BotUncheckedCreateWithoutTradesInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
    userId: string;
};
export type BotCreateOrConnectWithoutTradesInput = {
    where: Prisma.BotWhereUniqueInput;
    create: Prisma.XOR<Prisma.BotCreateWithoutTradesInput, Prisma.BotUncheckedCreateWithoutTradesInput>;
};
export type BotUpsertWithoutTradesInput = {
    update: Prisma.XOR<Prisma.BotUpdateWithoutTradesInput, Prisma.BotUncheckedUpdateWithoutTradesInput>;
    create: Prisma.XOR<Prisma.BotCreateWithoutTradesInput, Prisma.BotUncheckedCreateWithoutTradesInput>;
    where?: Prisma.BotWhereInput;
};
export type BotUpdateToOneWithWhereWithoutTradesInput = {
    where?: Prisma.BotWhereInput;
    data: Prisma.XOR<Prisma.BotUpdateWithoutTradesInput, Prisma.BotUncheckedUpdateWithoutTradesInput>;
};
export type BotUpdateWithoutTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutBotsNestedInput;
};
export type BotUncheckedUpdateWithoutTradesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type BotCreateManyUserInput = {
    id?: string;
    name: string;
    symbol: string;
    timeframe: $Enums.Timeframe;
    amount?: number;
    tp?: number;
    sl?: number;
    useDynamicSLTP?: boolean;
    atrMultiplier?: number | null;
    tpSlRatio?: number | null;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: Date | string | null;
    tuneLookbackDays?: number;
};
export type BotUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    trades?: Prisma.TradeUpdateManyWithoutBotNestedInput;
};
export type BotUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
    trades?: Prisma.TradeUncheckedUpdateManyWithoutBotNestedInput;
};
export type BotUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    timeframe?: Prisma.EnumTimeframeFieldUpdateOperationsInput | $Enums.Timeframe;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    tp?: Prisma.FloatFieldUpdateOperationsInput | number;
    sl?: Prisma.FloatFieldUpdateOperationsInput | number;
    useDynamicSLTP?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    atrMultiplier?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    tpSlRatio?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    autoTune?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastTunedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tuneLookbackDays?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BotCountOutputType = {
    trades: number;
};
export type BotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    trades?: boolean | BotCountOutputTypeCountTradesArgs;
};
export type BotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotCountOutputTypeSelect<ExtArgs> | null;
};
export type BotCountOutputTypeCountTradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TradeWhereInput;
};
export type BotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    symbol?: boolean;
    timeframe?: boolean;
    amount?: boolean;
    tp?: boolean;
    sl?: boolean;
    useDynamicSLTP?: boolean;
    atrMultiplier?: boolean;
    tpSlRatio?: boolean;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: boolean;
    tuneLookbackDays?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    trades?: boolean | Prisma.Bot$tradesArgs<ExtArgs>;
    _count?: boolean | Prisma.BotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bot"]>;
export type BotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    symbol?: boolean;
    timeframe?: boolean;
    amount?: boolean;
    tp?: boolean;
    sl?: boolean;
    useDynamicSLTP?: boolean;
    atrMultiplier?: boolean;
    tpSlRatio?: boolean;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: boolean;
    tuneLookbackDays?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bot"]>;
export type BotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    symbol?: boolean;
    timeframe?: boolean;
    amount?: boolean;
    tp?: boolean;
    sl?: boolean;
    useDynamicSLTP?: boolean;
    atrMultiplier?: boolean;
    tpSlRatio?: boolean;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: boolean;
    tuneLookbackDays?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bot"]>;
export type BotSelectScalar = {
    id?: boolean;
    name?: boolean;
    symbol?: boolean;
    timeframe?: boolean;
    amount?: boolean;
    tp?: boolean;
    sl?: boolean;
    useDynamicSLTP?: boolean;
    atrMultiplier?: boolean;
    tpSlRatio?: boolean;
    isActive?: boolean;
    autoTune?: boolean;
    lastTunedAt?: boolean;
    tuneLookbackDays?: boolean;
    userId?: boolean;
};
export type BotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "symbol" | "timeframe" | "amount" | "tp" | "sl" | "useDynamicSLTP" | "atrMultiplier" | "tpSlRatio" | "isActive" | "autoTune" | "lastTunedAt" | "tuneLookbackDays" | "userId", ExtArgs["result"]["bot"]>;
export type BotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    trades?: boolean | Prisma.Bot$tradesArgs<ExtArgs>;
    _count?: boolean | Prisma.BotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bot";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        trades: Prisma.$TradePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        symbol: string;
        timeframe: $Enums.Timeframe;
        amount: number;
        tp: number;
        sl: number;
        useDynamicSLTP: boolean;
        atrMultiplier: number | null;
        tpSlRatio: number | null;
        isActive: boolean;
        autoTune: boolean;
        lastTunedAt: Date | null;
        tuneLookbackDays: number;
        userId: string;
    }, ExtArgs["result"]["bot"]>;
    composites: {};
};
export type BotGetPayload<S extends boolean | null | undefined | BotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BotPayload, S>;
export type BotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BotCountAggregateInputType | true;
};
export interface BotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bot'];
        meta: {
            name: 'Bot';
        };
    };
    findUnique<T extends BotFindUniqueArgs>(args: Prisma.SelectSubset<T, BotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BotFindFirstArgs>(args?: Prisma.SelectSubset<T, BotFindFirstArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BotFindManyArgs>(args?: Prisma.SelectSubset<T, BotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BotCreateArgs>(args: Prisma.SelectSubset<T, BotCreateArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BotCreateManyArgs>(args?: Prisma.SelectSubset<T, BotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BotDeleteArgs>(args: Prisma.SelectSubset<T, BotDeleteArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BotUpdateArgs>(args: Prisma.SelectSubset<T, BotUpdateArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BotDeleteManyArgs>(args?: Prisma.SelectSubset<T, BotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BotUpdateManyArgs>(args: Prisma.SelectSubset<T, BotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BotUpsertArgs>(args: Prisma.SelectSubset<T, BotUpsertArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BotCountArgs>(args?: Prisma.Subset<T, BotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BotCountAggregateOutputType> : number>;
    aggregate<T extends BotAggregateArgs>(args: Prisma.Subset<T, BotAggregateArgs>): Prisma.PrismaPromise<GetBotAggregateType<T>>;
    groupBy<T extends BotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BotGroupByArgs['orderBy'];
    } : {
        orderBy?: BotGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BotFieldRefs;
}
export interface Prisma__BotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    trades<T extends Prisma.Bot$tradesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bot$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BotFieldRefs {
    readonly id: Prisma.FieldRef<"Bot", 'String'>;
    readonly name: Prisma.FieldRef<"Bot", 'String'>;
    readonly symbol: Prisma.FieldRef<"Bot", 'String'>;
    readonly timeframe: Prisma.FieldRef<"Bot", 'Timeframe'>;
    readonly amount: Prisma.FieldRef<"Bot", 'Float'>;
    readonly tp: Prisma.FieldRef<"Bot", 'Float'>;
    readonly sl: Prisma.FieldRef<"Bot", 'Float'>;
    readonly useDynamicSLTP: Prisma.FieldRef<"Bot", 'Boolean'>;
    readonly atrMultiplier: Prisma.FieldRef<"Bot", 'Float'>;
    readonly tpSlRatio: Prisma.FieldRef<"Bot", 'Float'>;
    readonly isActive: Prisma.FieldRef<"Bot", 'Boolean'>;
    readonly autoTune: Prisma.FieldRef<"Bot", 'Boolean'>;
    readonly lastTunedAt: Prisma.FieldRef<"Bot", 'DateTime'>;
    readonly tuneLookbackDays: Prisma.FieldRef<"Bot", 'Int'>;
    readonly userId: Prisma.FieldRef<"Bot", 'String'>;
}
export type BotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where: Prisma.BotWhereUniqueInput;
};
export type BotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where: Prisma.BotWhereUniqueInput;
};
export type BotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where?: Prisma.BotWhereInput;
    orderBy?: Prisma.BotOrderByWithRelationInput | Prisma.BotOrderByWithRelationInput[];
    cursor?: Prisma.BotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotScalarFieldEnum | Prisma.BotScalarFieldEnum[];
};
export type BotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where?: Prisma.BotWhereInput;
    orderBy?: Prisma.BotOrderByWithRelationInput | Prisma.BotOrderByWithRelationInput[];
    cursor?: Prisma.BotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotScalarFieldEnum | Prisma.BotScalarFieldEnum[];
};
export type BotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where?: Prisma.BotWhereInput;
    orderBy?: Prisma.BotOrderByWithRelationInput | Prisma.BotOrderByWithRelationInput[];
    cursor?: Prisma.BotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BotScalarFieldEnum | Prisma.BotScalarFieldEnum[];
};
export type BotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotCreateInput, Prisma.BotUncheckedCreateInput>;
};
export type BotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BotCreateManyInput | Prisma.BotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    data: Prisma.BotCreateManyInput | Prisma.BotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotUpdateInput, Prisma.BotUncheckedUpdateInput>;
    where: Prisma.BotWhereUniqueInput;
};
export type BotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BotUpdateManyMutationInput, Prisma.BotUncheckedUpdateManyInput>;
    where?: Prisma.BotWhereInput;
    limit?: number;
};
export type BotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BotUpdateManyMutationInput, Prisma.BotUncheckedUpdateManyInput>;
    where?: Prisma.BotWhereInput;
    limit?: number;
    include?: Prisma.BotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where: Prisma.BotWhereUniqueInput;
    create: Prisma.XOR<Prisma.BotCreateInput, Prisma.BotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BotUpdateInput, Prisma.BotUncheckedUpdateInput>;
};
export type BotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
    where: Prisma.BotWhereUniqueInput;
};
export type BotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BotWhereInput;
    limit?: number;
};
export type Bot$tradesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    where?: Prisma.TradeWhereInput;
    orderBy?: Prisma.TradeOrderByWithRelationInput | Prisma.TradeOrderByWithRelationInput[];
    cursor?: Prisma.TradeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TradeScalarFieldEnum | Prisma.TradeScalarFieldEnum[];
};
export type BotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BotSelect<ExtArgs> | null;
    omit?: Prisma.BotOmit<ExtArgs> | null;
    include?: Prisma.BotInclude<ExtArgs> | null;
};
export {};
