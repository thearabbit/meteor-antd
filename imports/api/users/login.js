import SimpleSchema from 'simpl-schema';

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
    },
});

export default LoginSchema;