class VacationModel {
    constructor(vacation) {
        this.vacation_id = vacation.vacation_id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price = vacation.price;
        this.image = vacation.image;
        this.image_file = vacation.image_file
    }
}

module.exports = VacationModel;

