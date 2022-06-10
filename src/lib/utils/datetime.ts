export function formatDate(date: Date | string, format = 'mm/dd/yyyy'): string{
    const dataDate = new Date(date);
    const dd = String(dataDate.getDate()).padStart(2, '0');
    const mm = String(dataDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = dataDate.getFullYear().toString();
    let result = format;
    result = result.replace('mm',mm);
    result = result.replace('dd',dd);
    result = result.replace('yyyy',yyyy);
    return result; 
}