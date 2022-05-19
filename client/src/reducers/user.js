
const userstate = {
    name: "user",
    login: false
}

const userreducer = (state = userstate, action) => {
    switch (action.type) {
        case "SUCCESS":
            return {
                ...state,
                login: true,
                name: action.payload.products.name
            }
        default: return {
            ...state,
            login: false,
            name: "user"
        }
    }
}

export default userreducer;