import dayjs from "dayjs";

dayjs.locale("pt-br");

export function parseDateTime(dateStr, timeStr = null) {
    timeStr = timeStr ?? "00:00:00";
    return new Date(`${dateStr}T${timeStr}`);
}

export function formatWeekday(date) {
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return weekdays[dayjs(date).day()] ?? '';
}

export function formatDate(date, format = "BR") {
    if(!date) {
        return '';
    }
    if(format === "US") {
        return dayjs(date).format("YYYY-MM-DD");
    }
    return dayjs(date).format("DD/MM/YYYY");
}

export function formatMoney(value) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export function getFilterNextEvents(){
    const now = new Date();
    return {
        finalizado: false,
        $or: [
            { data_limite_confirmacao: { $gt: now } },
            {
                data_limite_confirmacao: { $eq: now },
                hora_limite_confirmacao: { $gt: now.toTimeString().slice(0,5) }
            }
        ]
    };
}