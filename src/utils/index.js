export const STRIPE_PUBLIC_KEY = "pk_test_51LcPW5AFfsQYgyNy7Ic4fr1fo81RfvdfrIMMZBLBvisnUpoQHMMPC2zK7iPLU1jlW273VnrurWjZvQFZskRpCTYr00bTDmMui9"


export const formatDateToDateTime = (date) => {
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    const strTime = hours + ":" + minutes

    const years = date.getFullYear()
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const days = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`

    const result = `${years}-${month}-${days}T${strTime}`
    return result
}

export const priceByKm = 0.22
export const priceByDays = 42.00

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