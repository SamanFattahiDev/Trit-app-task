export enum needEquipmentStatus {
    WaitingForSupervisorToApprove = 1,
    SupervisorRejectedEquipmentPrice = 2,
    SupervisorApprovedEquipmentAndRejectedPrice = 3,
    SupervisorApprovedEquipmentAndPrice = 4,
    NoEquipmentSet = 5,
}

export enum requestNeedChangeServiceType {
    WaitForSupervisorToChangeRequestServiceType = 1,
    SupervisorRejectedToChangeRequestServiceType = 2,
    SupervisorApprovedToChangeRequestServiceType = 3,
    NoRequestSet = 4,
}

export enum supervisorRequestStatus{
    WaitingForSupervisorRequests = 1,
    ClosedRequests = 2,
}