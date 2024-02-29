function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};
    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorText = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        //Lặp qua các rule và kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorText.textContent = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
            checkDataRegister = false;
            if (options.formGroupSelector === '.bank-card-number') {
                checkInforCard = false;
                checkInforCustomer = false;
            }
        } else {
            errorText.textContent = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            checkDataRegister = true;
            if (options.formGroupSelector === '.bank-card-number') {
                checkInforCard = true;
                checkInforCustomer = true;
            }
        }
        return !errorMessage;
    }
    //Hàm lấy form validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                //Trường hợp submit với javscript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                // if(input.matches(':checked')) {
                                //     values[input.name] = input.value;
                                // }
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        // console.log(values[input.name]+ "Tên:" + input.name + "Giá trị: " + input.value);
                        return values;
                    }, {})
                    options.onSubmit(formValues);
                }
                //Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }
        options.rules.forEach((rule) => {
            //Lưu lại các rules cho mỗi input;
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach((inputElement) => {
                if (inputElement) {
                    //Xử lý trường hợp blur khỏi input
                    inputElement.onblur = () => {
                        validate(inputElement, rule)
                    }
                    //Xử lý trưởng mỗi khi người dùng nhập vào input
                    inputElement.oninput = () => {
                        getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector).textContent = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
                }
            })
        })
    }
}
//Định nghĩa các rules
//Nguyên tắc các rules:
//1. Khi có lỗi => Trả message lỗi
//2. Khi hợp lệ => Ko trả ra gì cs(undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            //trim() loại bỏ khoảng cách
            return value ? undefined : message;
        }
    };
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    };
}
Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var passw = /^[A-Za-z]\w{7,14}$/;
            return value.match(passw) ? undefined : message || 'Mật khẩu từ 7 đến 16 ký tự, chỉ chứa ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là chữ cái';
        }
    }
}
Validator.isPasswordConfirmation = function (selector, getOldValue) {
    return {
        selector: selector,
        test: function (value) {
            return value === getOldValue() ? undefined : 'Mật khẩu không khợp với mật khẩu bạn đã nhập';
        }
    }
}