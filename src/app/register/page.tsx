"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "@/components/Logo";
import Link from "next/link";

import { registro } from "@/utils/backend_functions/registro";
import { useApp } from "@/contexts/contextApi";
import { useRouter } from "next/navigation";
import { useWidth } from "@/utils/functions";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// window width and height using next dimensions

const Register: React.FC = () => {
  const { setUser, setPhotoModal, photoModalUrl } = useApp();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const isMobile = useWidth() < 768;

  const onSubmit = async (data: FormData) => {
    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    )
      return;
    if (watch("password") !== watch("confirmPassword")) return;
    if (
      !watch("name") ||
      !watch("email") ||
      !watch("password") ||
      !watch("confirmPassword")
    )
      return;

    setLoading(true);
    try {
      const user = await registro(data);
      if (user) {
        if (user.email === "fernandotrindade@gmail.com") {
          user.role = "admin";
        }

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          localStorage.setItem("userType", user.role);
        }
        if (isMobile) {
          router.push("/");
        } else setStep(1);
      } else throw new Error("Erro ao cadastrar usuário");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Regex para verificar se a senha contém pelo menos um número e um caractere especial
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

  // Função para validar se as senhas coincidem
  const validatePassword = (value: string) => {
    return value === watch("password") || "As senhas não coincidem";
  };

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-page-wrapper">
      <Logo />
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <>
              <h2>Cadastre-se</h2>
              <div className="input-error-wrapper">
                <input
                  placeholder="Nome completo"
                  className="register-form-input"
                  type="text"
                  disabled={loading}
                  {...register("name", {
                    required: "Nome completo é obrigatório",
                  })}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="input-error-wrapper">
                <input
                  placeholder="Email"
                  className="register-form-input"
                  type="email"
                  disabled={loading}
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <span className="input-password-wrapper input-error-wrapper">
                <input
                  placeholder="Senha"
                  className="register-form-input"
                  type={showPassword ? "text" : "password"} // Alternando o tipo de input baseado no estado
                  disabled={loading}
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter pelo menos 6 caracteres",
                    },
                    pattern: {
                      value: passwordRegex,
                      message:
                        "A senha deve conter pelo menos um número e um caractere especial",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="show-password-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                  </svg>
                </button>
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </span>

              <span className="input-password-wrapper input-error-wrapper">
                <input
                  placeholder="Confirmar senha"
                  className="register-form-input"
                  type={showPassword ? "text" : "password"} // Alternando o tipo de input baseado no estado
                  disabled={loading}
                  {...register("confirmPassword", {
                    required: "Confirmação de senha é obrigatória",
                    validate: validatePassword,
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="show-password-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                  </svg>
                </button>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </span>

              <input
                className="register-form-button register-form-input"
                type="submit"
                disabled={loading}
                value={loading ? "Carregando..." : "Cadastrar e configurar"}
              />
            </>
          )}
          {step === 1 && (
            <div
              className="
            flex
            flex-col
            justify-center
            items-center
            gap-5"
            >
              <h2>
                {photoModalUrl
                  ? "Obrigado pelo seu cadastro"
                  : "Configure seu FaceID"}
              </h2>
              <p>
                {photoModalUrl
                  ? "Seu cadastro foi realizado com sucesso. Clique no botão abaixo para voltar para a página inicial."
                  : 'Para configurar seu FaceID, clique no botão abaixo e posicione seu rosto dentro do círculo. Após isso, clique em "Cadastrar".'}
              </p>
              {photoModalUrl ? (
                <>
                  <button
                    className="bg-blue-500
                text-white
                rounded-md
                px-3
                py-2
                hover:bg-blue-600
                transition
                duration-200
                ease-in-out
                "
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Finalizar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="
                bg-blue-500
                text-white
                rounded-md
                px-3
                py-2
                hover:bg-blue-600
                transition
                duration-200
                ease-in-out
                "
                    onClick={() => {
                      setPhotoModal(true);
                    }}
                  >
                    Configurar FaceID
                  </button>
                  <button
                    className="
                bg-gray-500
                text-white
                rounded-md
                px-3
                py-2
                hover:bg-gray-600
                transition
                duration-200
                ease-in-out
                "
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Não quero configurar agora
                  </button>
                </>
              )}
            </div>
          )}
        </form>

        <span>
          Já tem cadastro? <Link href="/login">Conecte-se</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
