import useVuelidate from '@vuelidate/core'
import {required, email, helpers, minLength} from '@vuelidate/validators'
const requiredMessage = helpers.withMessage(
    'Поле обязательно для заполнения',
    required
)
export const rules = {
    name: {
        required: requiredMessage,
        minLength: helpers.withMessage(
            ({$params}) => `Имя не должно быть короче ${$params.min}`,
            minLength(1)
        ),
        pattern: helpers.withMessage(
            'Имя не должно содержать пробелы или символы',
            (value: string) => /^[A-Za-zА-Яа-я]+$/.test(value)
        )
    },
    phone: {
        required: requiredMessage
    },
    email: {
        required: requiredMessage,
        email: helpers.withMessage(() => 'Проверьте корректность написания email', email),
        pattern: helpers.withMessage('Email не должен содержать пробелы', (value: string) => /^\S+@\S+\.\S+$/.test(value))
    }
}
