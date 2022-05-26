
const userstate = {
    name: "user",
    login: false,
    email :"",
    pincode: "",
    phone : "",
    address : ""
}

const userreducer = (state = userstate, action) => {
    switch (action.type) {
        case "SUCCESS":
            return {
                ...state,
                login: true,
                name: action.payload.products.name,
                email : action.payload.products.email,
                pincode : action.payload.products.pincode,
                address : action.payload.products.address,
                phone : action.payload.products.phone
            }
        default: return {
            ...state,
            login: false,
            name: "user",
            email :"",
            pincode :"",
            address :"",
            phone :"",
        }
    }
}

export default userreducer;