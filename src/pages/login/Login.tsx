import React, { JSX, useState } from "react";

type FormState = {
    email: string;
    password: string;
    remember: boolean;
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 360,
        margin: "60px auto",
        padding: 24,
        border: "1px solid #e6e6e6",
        borderRadius: 8,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },
    title: { margin: "0 0 16px", fontSize: 20, textAlign: "center" },
    field: { marginBottom: 12, display: "flex", flexDirection: "column" },
    label: { marginBottom: 6, fontSize: 13 },
    input: {
        padding: "10px 12px",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid #ccc",
        outline: "none",
    },
    error: { color: "#c0392b", fontSize: 12, marginTop: 6 },
    actions: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
    btn: {
        padding: "10px 14px",
        background: "#1677ff",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
    btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
    small: { fontSize: 13 },
    row: { display: "flex", alignItems: "center", gap: 8 },
};

function validate(values: FormState) {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!values.email) {
        errors.email = "请输入邮箱";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "邮箱格式不正确";
    }
    if (!values.password) {
        errors.password = "请输入密码";
    } else if (values.password.length < 6) {
        errors.password = "密码至少6位";
    }
    return errors;
}

export default function Login(): JSX.Element {
    const [values, setValues] = useState<FormState>({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    

    const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = k === "remember" ? (e.target as HTMLInputElement).checked : e.target.value;
        setValues((s) => ({ ...s, [k]: v }));
        setErrors((s) => ({ ...s, [k]: undefined }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v = validate(values);
        if (Object.keys(v).length) {
            setErrors(v);
            return;
        }
        setLoading(true);
        try {
            // 模拟 API 登录请求
            await new Promise((res) => setTimeout(res, 900));
            // 假设返回 token
            const fakeToken = "fake-token-123";
            if (values.remember) {
                localStorage.setItem("auth_token", fakeToken);
            } else {
                sessionStorage.setItem("auth_token", fakeToken);
            }
            // 登录成功处理（替换为路由跳转或上下文更新）
            alert("登录成功");
        } catch (err) {
            setErrors({ password: "登录失败，请重试" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>登录</h2>
            <form onSubmit={onSubmit} noValidate>
                <div style={styles.field}>
                    <label style={styles.label} htmlFor="email">
                        邮箱
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={onChange("email")}
                        style={styles.input}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <div id="email-error" role="alert" style={styles.error}>
                            {errors.email}
                        </div>
                    )}
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="password">
                        密码
                    </label>
                    <div style={{ display: "flex", gap: 8 }}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={onChange("password")}
                            style={{ ...styles.input, flex: 1 }}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? "隐藏密码" : "显示密码"}
                            style={{ ...styles.btn, padding: "8px 10px", background: "#555" }}
                        >
                            {showPassword ? "隐藏" : "显示"}
                        </button>
                    </div>
                    {errors.password && (
                        <div id="password-error" role="alert" style={styles.error}>
                            {errors.password}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label style={styles.row}>
                        <input type="checkbox" checked={values.remember} onChange={onChange("remember")} />{" "}
                        <span style={styles.small}>记住我</span>
                    </label>
                    <a style={{ fontSize: 13 }} href="#">
                        忘记密码?
                    </a>
                </div>

                <div style={styles.actions}>
                    <button type="submit" style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }} disabled={loading}>
                        {loading ? "登录中..." : "登录"}
                    </button>
                    <div style={styles.small}>还没有账号？<a href="#">注册</a></div>
                </div>
            </form>
        </div>
    );
}