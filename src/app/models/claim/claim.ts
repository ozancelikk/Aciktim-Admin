export interface Claim {
    id:string;
    name:string;
    description:string;
    authorizationRate:string;
}

export interface UserClaim {
    userName:string;
    operationClaimName:string;
    operationClaimId:string;
    id:string;
}