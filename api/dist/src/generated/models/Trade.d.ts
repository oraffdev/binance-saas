import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TradeModel = runtime.Types.Result.DefaultSelection<Prisma.$TradePayload>;
export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null;
    _avg: TradeAvgAggregateOutputType | null;
    _sum: TradeSumAggregateOutputType | null;
    _min: TradeMinAggregateOutputType | null;
    _max: TradeMaxAggregateOutputType | null;
};
export type TradeAvgAggregateOutputType = {
    amount: number | null;
    entryPrice: number | null;
    exitPrice: number | null;
    pnl: number | null;
};
export type TradeSumAggregateOutputType = {
    amount: number | null;
    entryPrice: number | null;
    exitPrice: number | null;
    pnl: number | null;
};
export type TradeMinAggregateOutputType = {
    id: string | null;
    botId: string | null;
    symbol: string | null;
    status: string | null;
    side: string | null;
    amount: number | null;
    entryPrice: number | null;
    exitPrice: number | null;
    pnl: number | null;
    exitReason: string | null;
    createdAt: Date | null;
    closedAt: Date | null;
};
export type TradeMaxAggregateOutputType = {
    id: string | null;
    botId: string | null;
    symbol: string | null;
    status: string | null;
    side: string | null;
    amount: number | null;
    entryPrice: number | null;
    exitPrice: number | null;
    pnl: number | null;
    exitReason: string | null;
    createdAt: Date | null;
    closedAt: Date | null;
};
export type TradeCountAggregateOutputType = {
    id: number;
    botId: number;
    symbol: number;
    status: number;
    side: number;
    amount: number;
    entryPrice: number;
    exitPrice: number;
    pnl: number;
    exitReason: number;
    createdAt: number;
    closedAt: number;
    _all: number;
};
export type TradeAvgAggregateInputType = {
    amount?: true;
    entryPrice?: true;
    exitPrice?: true;
    pnl?: true;
};
export type TradeSumAggregateInputType = {
    amount?: true;
    entryPrice?: true;
    exitPrice?: true;
    pnl?: true;
};
export type TradeMinAggregateInputType = {
    id?: true;
    botId?: true;
    symbol?: true;
    status?: true;
    side?: true;
    amount?: true;
    entryPrice?: true;
    exitPrice?: true;
    pnl?: true;
    exitReason?: true;
    createdAt?: true;
    closedAt?: true;
};
export type TradeMaxAggregateInputType = {
    id?: true;
    botId?: true;
    symbol?: true;
    status?: true;
    side?: true;
    amount?: true;
    entryPrice?: true;
    exitPrice?: true;
    pnl?: true;
    exitReason?: true;
    createdAt?: true;
    closedAt?: true;
};
export type TradeCountAggregateInputType = {
    id?: true;
    botId?: true;
    symbol?: true;
    status?: true;
    side?: true;
    amount?: true;
    entryPrice?: true;
    exitPrice?: true;
    pnl?: true;
    exitReason?: true;
    createdAt?: true;
    closedAt?: true;
    _all?: true;
};
export type TradeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TradeWhereInput;
    orderBy?: Prisma.TradeOrderByWithRelationInput | Prisma.TradeOrderByWithRelationInput[];
    cursor?: Prisma.TradeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TradeCountAggregateInputType;
    _avg?: TradeAvgAggregateInputType;
    _sum?: TradeSumAggregateInputType;
    _min?: TradeMinAggregateInputType;
    _max?: TradeMaxAggregateInputType;
};
export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
    [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrade[P]> : Prisma.GetScalarType<T[P], AggregateTrade[P]>;
};
export type TradeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TradeWhereInput;
    orderBy?: Prisma.TradeOrderByWithAggregationInput | Prisma.TradeOrderByWithAggregationInput[];
    by: Prisma.TradeScalarFieldEnum[] | Prisma.TradeScalarFieldEnum;
    having?: Prisma.TradeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TradeCountAggregateInputType | true;
    _avg?: TradeAvgAggregateInputType;
    _sum?: TradeSumAggregateInputType;
    _min?: TradeMinAggregateInputType;
    _max?: TradeMaxAggregateInputType;
};
export type TradeGroupByOutputType = {
    id: string;
    botId: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice: number | null;
    pnl: number | null;
    exitReason: string | null;
    createdAt: Date;
    closedAt: Date | null;
    _count: TradeCountAggregateOutputType | null;
    _avg: TradeAvgAggregateOutputType | null;
    _sum: TradeSumAggregateOutputType | null;
    _min: TradeMinAggregateOutputType | null;
    _max: TradeMaxAggregateOutputType | null;
};
type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TradeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TradeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TradeGroupByOutputType[P]>;
}>>;
export type TradeWhereInput = {
    AND?: Prisma.TradeWhereInput | Prisma.TradeWhereInput[];
    OR?: Prisma.TradeWhereInput[];
    NOT?: Prisma.TradeWhereInput | Prisma.TradeWhereInput[];
    id?: Prisma.StringFilter<"Trade"> | string;
    botId?: Prisma.StringFilter<"Trade"> | string;
    symbol?: Prisma.StringFilter<"Trade"> | string;
    status?: Prisma.StringFilter<"Trade"> | string;
    side?: Prisma.StringFilter<"Trade"> | string;
    amount?: Prisma.FloatFilter<"Trade"> | number;
    entryPrice?: Prisma.FloatFilter<"Trade"> | number;
    exitPrice?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    pnl?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    exitReason?: Prisma.StringNullableFilter<"Trade"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Trade"> | Date | string;
    closedAt?: Prisma.DateTimeNullableFilter<"Trade"> | Date | string | null;
    bot?: Prisma.XOR<Prisma.BotScalarRelationFilter, Prisma.BotWhereInput>;
};
export type TradeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    botId?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    pnl?: Prisma.SortOrderInput | Prisma.SortOrder;
    exitReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    bot?: Prisma.BotOrderByWithRelationInput;
};
export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TradeWhereInput | Prisma.TradeWhereInput[];
    OR?: Prisma.TradeWhereInput[];
    NOT?: Prisma.TradeWhereInput | Prisma.TradeWhereInput[];
    botId?: Prisma.StringFilter<"Trade"> | string;
    symbol?: Prisma.StringFilter<"Trade"> | string;
    status?: Prisma.StringFilter<"Trade"> | string;
    side?: Prisma.StringFilter<"Trade"> | string;
    amount?: Prisma.FloatFilter<"Trade"> | number;
    entryPrice?: Prisma.FloatFilter<"Trade"> | number;
    exitPrice?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    pnl?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    exitReason?: Prisma.StringNullableFilter<"Trade"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Trade"> | Date | string;
    closedAt?: Prisma.DateTimeNullableFilter<"Trade"> | Date | string | null;
    bot?: Prisma.XOR<Prisma.BotScalarRelationFilter, Prisma.BotWhereInput>;
}, "id">;
export type TradeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    botId?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    pnl?: Prisma.SortOrderInput | Prisma.SortOrder;
    exitReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TradeCountOrderByAggregateInput;
    _avg?: Prisma.TradeAvgOrderByAggregateInput;
    _max?: Prisma.TradeMaxOrderByAggregateInput;
    _min?: Prisma.TradeMinOrderByAggregateInput;
    _sum?: Prisma.TradeSumOrderByAggregateInput;
};
export type TradeScalarWhereWithAggregatesInput = {
    AND?: Prisma.TradeScalarWhereWithAggregatesInput | Prisma.TradeScalarWhereWithAggregatesInput[];
    OR?: Prisma.TradeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TradeScalarWhereWithAggregatesInput | Prisma.TradeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Trade"> | string;
    botId?: Prisma.StringWithAggregatesFilter<"Trade"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Trade"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Trade"> | string;
    side?: Prisma.StringWithAggregatesFilter<"Trade"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"Trade"> | number;
    entryPrice?: Prisma.FloatWithAggregatesFilter<"Trade"> | number;
    exitPrice?: Prisma.FloatNullableWithAggregatesFilter<"Trade"> | number | null;
    pnl?: Prisma.FloatNullableWithAggregatesFilter<"Trade"> | number | null;
    exitReason?: Prisma.StringNullableWithAggregatesFilter<"Trade"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Trade"> | Date | string;
    closedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Trade"> | Date | string | null;
};
export type TradeCreateInput = {
    id?: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
    bot: Prisma.BotCreateNestedOneWithoutTradesInput;
};
export type TradeUncheckedCreateInput = {
    id?: string;
    botId: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
};
export type TradeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    bot?: Prisma.BotUpdateOneRequiredWithoutTradesNestedInput;
};
export type TradeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    botId?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeCreateManyInput = {
    id?: string;
    botId: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
};
export type TradeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    botId?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeListRelationFilter = {
    every?: Prisma.TradeWhereInput;
    some?: Prisma.TradeWhereInput;
    none?: Prisma.TradeWhereInput;
};
export type TradeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TradeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    botId?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrder;
    pnl?: Prisma.SortOrder;
    exitReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
};
export type TradeAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrder;
    pnl?: Prisma.SortOrder;
};
export type TradeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    botId?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrder;
    pnl?: Prisma.SortOrder;
    exitReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
};
export type TradeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    botId?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrder;
    pnl?: Prisma.SortOrder;
    exitReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
};
export type TradeSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    entryPrice?: Prisma.SortOrder;
    exitPrice?: Prisma.SortOrder;
    pnl?: Prisma.SortOrder;
};
export type TradeCreateNestedManyWithoutBotInput = {
    create?: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput> | Prisma.TradeCreateWithoutBotInput[] | Prisma.TradeUncheckedCreateWithoutBotInput[];
    connectOrCreate?: Prisma.TradeCreateOrConnectWithoutBotInput | Prisma.TradeCreateOrConnectWithoutBotInput[];
    createMany?: Prisma.TradeCreateManyBotInputEnvelope;
    connect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
};
export type TradeUncheckedCreateNestedManyWithoutBotInput = {
    create?: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput> | Prisma.TradeCreateWithoutBotInput[] | Prisma.TradeUncheckedCreateWithoutBotInput[];
    connectOrCreate?: Prisma.TradeCreateOrConnectWithoutBotInput | Prisma.TradeCreateOrConnectWithoutBotInput[];
    createMany?: Prisma.TradeCreateManyBotInputEnvelope;
    connect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
};
export type TradeUpdateManyWithoutBotNestedInput = {
    create?: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput> | Prisma.TradeCreateWithoutBotInput[] | Prisma.TradeUncheckedCreateWithoutBotInput[];
    connectOrCreate?: Prisma.TradeCreateOrConnectWithoutBotInput | Prisma.TradeCreateOrConnectWithoutBotInput[];
    upsert?: Prisma.TradeUpsertWithWhereUniqueWithoutBotInput | Prisma.TradeUpsertWithWhereUniqueWithoutBotInput[];
    createMany?: Prisma.TradeCreateManyBotInputEnvelope;
    set?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    disconnect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    delete?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    connect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    update?: Prisma.TradeUpdateWithWhereUniqueWithoutBotInput | Prisma.TradeUpdateWithWhereUniqueWithoutBotInput[];
    updateMany?: Prisma.TradeUpdateManyWithWhereWithoutBotInput | Prisma.TradeUpdateManyWithWhereWithoutBotInput[];
    deleteMany?: Prisma.TradeScalarWhereInput | Prisma.TradeScalarWhereInput[];
};
export type TradeUncheckedUpdateManyWithoutBotNestedInput = {
    create?: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput> | Prisma.TradeCreateWithoutBotInput[] | Prisma.TradeUncheckedCreateWithoutBotInput[];
    connectOrCreate?: Prisma.TradeCreateOrConnectWithoutBotInput | Prisma.TradeCreateOrConnectWithoutBotInput[];
    upsert?: Prisma.TradeUpsertWithWhereUniqueWithoutBotInput | Prisma.TradeUpsertWithWhereUniqueWithoutBotInput[];
    createMany?: Prisma.TradeCreateManyBotInputEnvelope;
    set?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    disconnect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    delete?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    connect?: Prisma.TradeWhereUniqueInput | Prisma.TradeWhereUniqueInput[];
    update?: Prisma.TradeUpdateWithWhereUniqueWithoutBotInput | Prisma.TradeUpdateWithWhereUniqueWithoutBotInput[];
    updateMany?: Prisma.TradeUpdateManyWithWhereWithoutBotInput | Prisma.TradeUpdateManyWithWhereWithoutBotInput[];
    deleteMany?: Prisma.TradeScalarWhereInput | Prisma.TradeScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type TradeCreateWithoutBotInput = {
    id?: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
};
export type TradeUncheckedCreateWithoutBotInput = {
    id?: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
};
export type TradeCreateOrConnectWithoutBotInput = {
    where: Prisma.TradeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput>;
};
export type TradeCreateManyBotInputEnvelope = {
    data: Prisma.TradeCreateManyBotInput | Prisma.TradeCreateManyBotInput[];
    skipDuplicates?: boolean;
};
export type TradeUpsertWithWhereUniqueWithoutBotInput = {
    where: Prisma.TradeWhereUniqueInput;
    update: Prisma.XOR<Prisma.TradeUpdateWithoutBotInput, Prisma.TradeUncheckedUpdateWithoutBotInput>;
    create: Prisma.XOR<Prisma.TradeCreateWithoutBotInput, Prisma.TradeUncheckedCreateWithoutBotInput>;
};
export type TradeUpdateWithWhereUniqueWithoutBotInput = {
    where: Prisma.TradeWhereUniqueInput;
    data: Prisma.XOR<Prisma.TradeUpdateWithoutBotInput, Prisma.TradeUncheckedUpdateWithoutBotInput>;
};
export type TradeUpdateManyWithWhereWithoutBotInput = {
    where: Prisma.TradeScalarWhereInput;
    data: Prisma.XOR<Prisma.TradeUpdateManyMutationInput, Prisma.TradeUncheckedUpdateManyWithoutBotInput>;
};
export type TradeScalarWhereInput = {
    AND?: Prisma.TradeScalarWhereInput | Prisma.TradeScalarWhereInput[];
    OR?: Prisma.TradeScalarWhereInput[];
    NOT?: Prisma.TradeScalarWhereInput | Prisma.TradeScalarWhereInput[];
    id?: Prisma.StringFilter<"Trade"> | string;
    botId?: Prisma.StringFilter<"Trade"> | string;
    symbol?: Prisma.StringFilter<"Trade"> | string;
    status?: Prisma.StringFilter<"Trade"> | string;
    side?: Prisma.StringFilter<"Trade"> | string;
    amount?: Prisma.FloatFilter<"Trade"> | number;
    entryPrice?: Prisma.FloatFilter<"Trade"> | number;
    exitPrice?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    pnl?: Prisma.FloatNullableFilter<"Trade"> | number | null;
    exitReason?: Prisma.StringNullableFilter<"Trade"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Trade"> | Date | string;
    closedAt?: Prisma.DateTimeNullableFilter<"Trade"> | Date | string | null;
};
export type TradeCreateManyBotInput = {
    id?: string;
    symbol: string;
    status: string;
    side: string;
    amount: number;
    entryPrice: number;
    exitPrice?: number | null;
    pnl?: number | null;
    exitReason?: string | null;
    createdAt?: Date | string;
    closedAt?: Date | string | null;
};
export type TradeUpdateWithoutBotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeUncheckedUpdateWithoutBotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeUncheckedUpdateManyWithoutBotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    entryPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    exitPrice?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    pnl?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    exitReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TradeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    botId?: boolean;
    symbol?: boolean;
    status?: boolean;
    side?: boolean;
    amount?: boolean;
    entryPrice?: boolean;
    exitPrice?: boolean;
    pnl?: boolean;
    exitReason?: boolean;
    createdAt?: boolean;
    closedAt?: boolean;
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trade"]>;
export type TradeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    botId?: boolean;
    symbol?: boolean;
    status?: boolean;
    side?: boolean;
    amount?: boolean;
    entryPrice?: boolean;
    exitPrice?: boolean;
    pnl?: boolean;
    exitReason?: boolean;
    createdAt?: boolean;
    closedAt?: boolean;
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trade"]>;
export type TradeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    botId?: boolean;
    symbol?: boolean;
    status?: boolean;
    side?: boolean;
    amount?: boolean;
    entryPrice?: boolean;
    exitPrice?: boolean;
    pnl?: boolean;
    exitReason?: boolean;
    createdAt?: boolean;
    closedAt?: boolean;
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trade"]>;
export type TradeSelectScalar = {
    id?: boolean;
    botId?: boolean;
    symbol?: boolean;
    status?: boolean;
    side?: boolean;
    amount?: boolean;
    entryPrice?: boolean;
    exitPrice?: boolean;
    pnl?: boolean;
    exitReason?: boolean;
    createdAt?: boolean;
    closedAt?: boolean;
};
export type TradeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "botId" | "symbol" | "status" | "side" | "amount" | "entryPrice" | "exitPrice" | "pnl" | "exitReason" | "createdAt" | "closedAt", ExtArgs["result"]["trade"]>;
export type TradeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
};
export type TradeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
};
export type TradeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bot?: boolean | Prisma.BotDefaultArgs<ExtArgs>;
};
export type $TradePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Trade";
    objects: {
        bot: Prisma.$BotPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        botId: string;
        symbol: string;
        status: string;
        side: string;
        amount: number;
        entryPrice: number;
        exitPrice: number | null;
        pnl: number | null;
        exitReason: string | null;
        createdAt: Date;
        closedAt: Date | null;
    }, ExtArgs["result"]["trade"]>;
    composites: {};
};
export type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TradePayload, S>;
export type TradeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TradeCountAggregateInputType | true;
};
export interface TradeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Trade'];
        meta: {
            name: 'Trade';
        };
    };
    findUnique<T extends TradeFindUniqueArgs>(args: Prisma.SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TradeFindFirstArgs>(args?: Prisma.SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TradeFindManyArgs>(args?: Prisma.SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TradeCreateArgs>(args: Prisma.SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TradeCreateManyArgs>(args?: Prisma.SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TradeDeleteArgs>(args: Prisma.SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TradeUpdateArgs>(args: Prisma.SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TradeDeleteManyArgs>(args?: Prisma.SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TradeUpdateManyArgs>(args: Prisma.SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TradeUpsertArgs>(args: Prisma.SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma.Prisma__TradeClient<runtime.Types.Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TradeCountArgs>(args?: Prisma.Subset<T, TradeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TradeCountAggregateOutputType> : number>;
    aggregate<T extends TradeAggregateArgs>(args: Prisma.Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>;
    groupBy<T extends TradeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TradeGroupByArgs['orderBy'];
    } : {
        orderBy?: TradeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TradeFieldRefs;
}
export interface Prisma__TradeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bot<T extends Prisma.BotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BotDefaultArgs<ExtArgs>>): Prisma.Prisma__BotClient<runtime.Types.Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TradeFieldRefs {
    readonly id: Prisma.FieldRef<"Trade", 'String'>;
    readonly botId: Prisma.FieldRef<"Trade", 'String'>;
    readonly symbol: Prisma.FieldRef<"Trade", 'String'>;
    readonly status: Prisma.FieldRef<"Trade", 'String'>;
    readonly side: Prisma.FieldRef<"Trade", 'String'>;
    readonly amount: Prisma.FieldRef<"Trade", 'Float'>;
    readonly entryPrice: Prisma.FieldRef<"Trade", 'Float'>;
    readonly exitPrice: Prisma.FieldRef<"Trade", 'Float'>;
    readonly pnl: Prisma.FieldRef<"Trade", 'Float'>;
    readonly exitReason: Prisma.FieldRef<"Trade", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Trade", 'DateTime'>;
    readonly closedAt: Prisma.FieldRef<"Trade", 'DateTime'>;
}
export type TradeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    where: Prisma.TradeWhereUniqueInput;
};
export type TradeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    where: Prisma.TradeWhereUniqueInput;
};
export type TradeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TradeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TradeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TradeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TradeCreateInput, Prisma.TradeUncheckedCreateInput>;
};
export type TradeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TradeCreateManyInput | Prisma.TradeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TradeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    data: Prisma.TradeCreateManyInput | Prisma.TradeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TradeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TradeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TradeUpdateInput, Prisma.TradeUncheckedUpdateInput>;
    where: Prisma.TradeWhereUniqueInput;
};
export type TradeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TradeUpdateManyMutationInput, Prisma.TradeUncheckedUpdateManyInput>;
    where?: Prisma.TradeWhereInput;
    limit?: number;
};
export type TradeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TradeUpdateManyMutationInput, Prisma.TradeUncheckedUpdateManyInput>;
    where?: Prisma.TradeWhereInput;
    limit?: number;
    include?: Prisma.TradeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TradeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    where: Prisma.TradeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TradeCreateInput, Prisma.TradeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TradeUpdateInput, Prisma.TradeUncheckedUpdateInput>;
};
export type TradeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
    where: Prisma.TradeWhereUniqueInput;
};
export type TradeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TradeWhereInput;
    limit?: number;
};
export type TradeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TradeSelect<ExtArgs> | null;
    omit?: Prisma.TradeOmit<ExtArgs> | null;
    include?: Prisma.TradeInclude<ExtArgs> | null;
};
export {};
