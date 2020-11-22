import React, { useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";

export const AuthPage = () => {
    const auth = useContext(AuthContext);


    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const message = useMessage();

    const {loading, error, request, clearError} = useHttp();

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            auth.login(data.token, data.id)
        } catch (e) {

        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Введите e-mail"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className="">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password" className="">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4 mr-10"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}