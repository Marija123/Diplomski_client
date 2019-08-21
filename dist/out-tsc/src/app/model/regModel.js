export class RegModel {
    constructor(id, email, name, surname, address, birthday, password, confirmPassword, role, passagerType, ac) {
        this.Id = id;
        this.Email = email;
        this.Name = name;
        this.Address = address;
        this.Surname = surname;
        this.Birthday = birthday;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
        this.Role = role;
        this.Activated = ac;
        // if(passagerType != null && passagerType != ""){
        //     this.PassengerType = passagerType;
        // }
        this.PassengerType = passagerType;
    }
}
//# sourceMappingURL=regModel.js.map