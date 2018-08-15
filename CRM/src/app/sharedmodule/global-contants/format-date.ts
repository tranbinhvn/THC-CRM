export class CustomFormatDate {

    // stringDate has format "yyyy-MM-dd" to string "dd/MM/yyyy HH:mm:sss"
    public static convertToStringDateDB(stringDate: string): string {
        if (!stringDate) {
            return "";
        }
        let items = stringDate.trim().split("-");
        return items[2] + "/" + items[1] + "/" + items[0] + " 00:00:00";
    }

     // _string has format "dd/MM/yyyy" to stringDate "yyyy-MM-dd"
    public static convertToStringDatePicker(_string: string): string {
        if (!_string) {
            return "";
        }
        let items = _string.trim().split(" ")[0].split("/");
        return items[2] + "-" + items[1] + "-" + items[0];
    }
}