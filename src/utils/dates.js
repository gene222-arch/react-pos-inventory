const today = new Date();

export const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export const prepareExtractCurDate = (date) => date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();