interface location {
    stateId: number,
    name: string,
    latitude: number,
    longitude: number,
    creatorUserId?: number | null,
    createDate: Date,
    updateDate?: Date,
    isDeleted?: false

}

interface IState extends location {
    cities?: [] | null,
}

interface ICity extends location {
    cityId: number,
    state: string | null,
}


export type {IState,ICity}