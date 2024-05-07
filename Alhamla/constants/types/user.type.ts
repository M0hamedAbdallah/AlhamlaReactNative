type user = {
    id?:string,
    Fname:string,
    Lname:string,
    email:string,
    password:string,
    phone?:string,
    passwordChangeAt?:Date,
    passwordResetCode?:string,
    passwordResetExpires?:Date,
    passwordResetVerified?:boolean,
    date_created?:Date,
    date_updated?:Date,
    image?:string,
    avilable_number_per_day?:number,
    active?:boolean,
    verify?:boolean,
    role?:string,
    point?:boolean
}

export default user