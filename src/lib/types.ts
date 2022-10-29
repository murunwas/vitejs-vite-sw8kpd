export interface DeviceTelemetry {
    typeId: number
    seqId: number
    timeStamp: string
    devId: string
    nettEnergy: number
    realPower: number
    rmsVoltage: number
    rmsCurrent: number
    temp: number
    relayStatus: number
    alarm: number
    placeholder: number
    rssi: number
    polePosition: number
    powerFactor: number
    apparentPower: number
    consumption: number
    orgId: number
    orgName: string
    devDescription: string
    deviceType: string
    deviceTypeDesc: string
    eventDesc: string
    eventId: number
    eventTimeStamp: string
    modelId: any
    firmware: any
    operationalAge: any
    powerUpCnt: any
    relayASwCnt: any
    relayBSwCnt: any
    lastRelayStatus: any
    cost: number
    name: string
    __typename: string
  }
  