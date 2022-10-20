import Yup from 'yup';
const formSchema = Yup.object().shape({
    email: Yup.string().email().min(6, "Email is too short").required("Email is required"),
    password: Yup.string().min(8, "Password is too short").required("Password is required"),
});

export default function login(req, res, next) {
    console.log(req.body);
    formSchema.validate(req.body)
        .then((valid) => {
            console.log("Validated");
            if (valid) {
                next();
            }
        })
        .catch((err) => {
            res.status(422).json({ message: err.message })
        })
}