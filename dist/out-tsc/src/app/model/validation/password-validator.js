export const ConfirmPasswordValidator = (control) => {
    let password = control.get('Password');
    let confirmPassword = control.get('ConfirmPassword');
    return password.value === confirmPassword.value ? null : { "doesntMatch": true };
};
//# sourceMappingURL=password-validator.js.map