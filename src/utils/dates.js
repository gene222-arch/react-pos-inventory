const today = new Date();

export const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export const currentDateWithFormat = (format) => 
{

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    switch (format) {
        case 'ymd':
            return today.getFullYear()+' '+(today.getMonth()+1)+', '+today.getDate();
            break;
        case 'mdy':
            return `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`
            break;
        default:
            break;
    }
}


export const prepareExtractCurDate = (date) => date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();