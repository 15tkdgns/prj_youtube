import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode = "login" }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const success = login(username, password);
      if (!success) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } else {
      const success = register(username, password);
      if (success) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        setError("이미 사용 중인 아이디입니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="text"
        placeholder="아이디"
        className="border px-4 py-2 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="border px-4 py-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-lg shadow hover:shadow-md"
      >
        {mode === "login" ? "로그인하기" : "회원가입"}
      </button>
    </form>
  );
}