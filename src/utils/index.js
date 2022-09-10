export const STRIPE_PUBLIC_KEY = "pk_test_51LcPW5AFfsQYgyNy7Ic4fr1fo81RfvdfrIMMZBLBvisnUpoQHMMPC2zK7iPLU1jlW273VnrurWjZvQFZskRpCTYr00bTDmMui9"


export const styleForSelectMui = {
    color : "white",
    outline : 0,
    border: "1px solid darkgrey",
    colorScheme: "dark",
    "& .MuiSelect-icon" : {
        color : "white"
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#44C034',
    }
}
export const styleInputMui = {
    color : "white",
    colorScheme: "dark",
    "& input" : {
        paddingLeft : "10px"
    },
    ':after': { borderBottomColor: '#44C034' },
}

export const ENTRY_API_URL = "http://139.162.191.134:8080/"