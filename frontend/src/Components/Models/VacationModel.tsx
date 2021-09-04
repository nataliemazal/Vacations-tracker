class VacationModel {
    vacation_id: number
    description: string
    destination: string
    start_date: string
    end_date: string
    price: number
    image: string
    image_file: FileList
    followers: number
    isUserFollow?: boolean


    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("start_date", vacation.start_date);
        myFormData.append("end_date", vacation.end_date);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image_file", vacation.image_file?.item(0));

        return myFormData;
    }

}

export default VacationModel