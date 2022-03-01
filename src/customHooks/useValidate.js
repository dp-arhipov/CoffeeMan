import React, {useState} from 'react';

const useValidate = (errorMessages) => {

    const regs = {
        phone: /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
    }
    const [errors, setErrors] = useState({
        phone:''
    });



    const validate = (item, type) => {
        switch (type) {
            case 'phone': {
                if (item.match(regs.phone)) {
                    setErrors({...errors, phone: ''})
                    return true
                } else {
                    setErrors({...errors, phone: errorMessages.phone})
                    return false
                }
            }
        }
    }

    return {
        validate,
        errors
    }
};

export default useValidate;